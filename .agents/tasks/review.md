# Vercel KV user tracking for NisiCash survey completions

Two new serverless endpoints (`record-survey.js`, `user-stats.js`) back a progress dashboard that shows users their completed surveys, verified earnings, and pending balance. Postback handlers for CPX Research and Wannads were updated to forward completed/pending/reversed events into this KV store. The frontend gains a three-stat card section between `#encuestas` and `.how-it-works`, polled every 30 seconds. The state-transition logic in `record-survey` handles pending→completed and completed→reversed correctly, with idempotency on duplicate `tx_id`+status pairs.

Watch for: (1) **confirmed** — `INTERNAL_RECORD_TOKEN` auth check is skipped entirely when the env var is absent or empty, leaving the write endpoint unauthenticated in production if the operator forgets to set the secret; (2) **confirmed** — `user-stats.js` creates and persists a new user record on every first fetch (including polling from the browser), meaning any visitor auto-creates a KV entry — this silently consumes capacity at ~4 KB per unique visitor whether or not they ever complete a survey; (3) **confirmed** — `VERCEL_BASE_URL` is hardcoded to `https://nisi-cash.vercel.app`, so the dashboard is broken on any other deployment (preview URLs, staging, local `vercel dev`).

**Verdict**: NEEDS_CHANGES

---

## High-level view

The `record-survey` endpoint is the correctness core of the feature, and its state-machine logic for pending→completed and completed→reversed transitions is sound. Idempotency is correctly scoped to (tx_id, status) pairs, and the history cap trims from the head so the 100 most recent entries are always preserved.

The `INTERNAL_RECORD_TOKEN` gate is the write endpoint's only protection against arbitrary earnings inflation. The guard is `if (INTERNAL_TOKEN && ...)`, which means when the variable is unset or empty the check is skipped unconditionally. The SETUP doc says to always set this in production, but the code's fallback is fail-open. Any browser or external script that knows the URL can POST fabricated completions.

`user-stats.js` auto-creates and persists a KV record for every new `user_id` it receives. Since the browser polls this endpoint every 30 seconds using a localStorage-generated ID, every distinct visitor (including bots or people clearing localStorage) permanently consumes ~4 KB. There is no reconciliation with actual survey completions. At the 256 MB cap the project estimates ~60,000 slots, but those fill with zero-activity profiles just as fast as with active earners.

The hardcoded `VERCEL_BASE_URL = 'https://nisi-cash.vercel.app'` in `script.js` means the dashboard fetch always hits the production deployment regardless of where the frontend is served. Preview deployments and local `vercel dev` will show stale or wrong data, and developers will spend time chasing phantom dashboard failures.

The HTML section order is correct (after `#encuestas`, before `.how-it-works`), all three stat IDs exist, the error fallback resets stats to `-` without throwing, and all 11 i18n keys (`dashboardTitle`, `dashboardSurveys`, `dashboardEarned`, `dashboardPending`, `dashboardRecent`, `dashboardLoading`, `dashboardError`, `dashboardNoTx`, `txStatusCompleted`, `txStatusPending`, `txStatusReversed`) are present in both `en` and `es`.

---

<details>
<summary>Issues (4)</summary>

1. **Fail-open token check** — `if (INTERNAL_TOKEN && ...)` skips auth entirely when `INTERNAL_RECORD_TOKEN` is not set. Change to an explicit check that rejects when the var is absent: `if (!INTERNAL_TOKEN || req.headers['x-internal-token'] !== INTERNAL_TOKEN)`. Without this, any caller can write arbitrary earnings to any user ID in production if the env var is accidentally omitted.

2. **Auto-create on first read inflates KV** — `user-stats.js` calls `kv.set` to persist a blank profile for every new visitor, not just users who complete surveys. Remove the write from the GET handler; create the record only inside `record-survey.js` when the first postback arrives. Otherwise every bot crawl and every localStorage wipe permanently occupies ~4 KB of the 256 MB quota.

3. **Hardcoded production URL** — `VERCEL_BASE_URL = 'https://nisi-cash.vercel.app'` in `script.js` breaks the dashboard on every non-production deployment. Derive it at runtime: `const VERCEL_BASE_URL = window.location.origin` or inject it via a build-time env var so preview and staging environments work correctly.

4. **pending→completed uses prevAmount, discards payout adjustment** — (possible) when a completion postback carries a higher amount than the original pending postback, the user is credited the lower pending figure. Confirm whether CPX/Wannads ever adjust payout at completion; if so, the credit logic should use `amt` instead of `prevAmount`.

</details>

---

<details>
<summary>Details</summary>

### Fail-open auth gate on record-survey

The write endpoint reads `INTERNAL_RECORD_TOKEN` at module load time into `const INTERNAL_TOKEN`. The guard is:

```js
if (INTERNAL_TOKEN && req.headers['x-internal-token'] !== INTERNAL_TOKEN) {
  return res.status(401).json({ error: 'Unauthorized' });
}
```

When `INTERNAL_RECORD_TOKEN` is not set in Vercel's environment, `INTERNAL_TOKEN` is `undefined`, the condition short-circuits on the falsy left side, and the check is skipped. Any `POST` to `/api/record-survey` with any or no token goes through. The SETUP doc acknowledges this and says to always set the secret, but the safe default for an earnings-write endpoint is fail-closed, not fail-open. The fix is a one-line inversion:

```js
if (!INTERNAL_TOKEN || req.headers['x-internal-token'] !== INTERNAL_TOKEN) {
```

This rejects requests when the env var is absent, forcing the operator to set it before the endpoint accepts any traffic.

### KV record created on first GET

`user-stats.js` does this:

```js
if (!user) {
  user = { user_id, surveys_completed: 0, ... };
  await kv.set(`user:${user_id}`, user);   // write on read
}
```

The dashboard polls this endpoint every 30 seconds via the browser. Each time a visitor opens the page for the first time—or clears localStorage, generating a new `USER_<timestamp>_<random>` ID—a permanent 4 KB entry is written. This is pure waste: a user with no survey completions contributes nothing actionable to the store. The record should be created in `record-survey.js` only when the first postback arrives. `user-stats.js` can return the empty default as a JSON response without persisting it:

```js
if (!user) {
  return res.status(200).json({
    user_id, surveys_completed: 0, total_earned: 0,
    pending_earned: 0, history: []
  });
}
```

### Hardcoded production URL in frontend

`script.js` line 796:

```js
const VERCEL_BASE_URL = 'https://nisi-cash.vercel.app';
```

Every `loadDashboardData` call hits the production KV regardless of which deployment is serving the frontend. Preview builds, branch deployments, and `vercel dev` all silently read from—and count polling traffic against—production. The simplest fix is `window.location.origin`, which requires zero configuration and works correctly on every deployment.

### State-transition amount discrepancy on pending→completed

The pending→completed path credits `total_earned` using `prevAmount` (the figure from the original `pending` postback) rather than the `amt` from the completion postback. This prevents balance drift when CPX or Wannads sends different amounts in the two calls — but it also silently discards the difference. If a platform adjusts the payout upward at completion time (e.g., a bonus), the user is credited the original lower amount. Whether this matches the intended payout semantics depends on how each platform uses the two amounts; worth confirming against the Wannads and CPX documentation before launch.

</details>

---

<details>
<summary>File map</summary>

| File | What changed |
|---|---|
| `api/record-survey.js` | New endpoint — receives internal postback forwarding, manages KV state transitions |
| `api/user-stats.js` | New endpoint — GET handler for dashboard polling |
| `api/cpx-postback.js` | Added inner try/catch blocks forwarding events to record-survey |
| `api/wannads-postback.js` | Added inner try/catch blocks forwarding events to record-survey |
| `index.html` | Added `#progress-dashboard` section between `#encuestas` and `.how-it-works` |
| `script.js` | Added 11 i18n keys, `renderTransactions`, `loadDashboardData`, `initProgressDashboard` |
| `package.json` | Added `@vercel/kv: ^1.0.0` dependency |
| `SETUP_VERCEL_KV.md` | New setup guide for KV provisioning and INTERNAL_RECORD_TOKEN |

</details>
