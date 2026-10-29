# Implementation Plan: User Progress Tracking with Vercel KV

## Project Context (grounded in actual files read)

- **Frontend**: static HTML/JS/CSS deployed to GitHub Pages; Vercel only serves the `/api/*` routes as serverless functions and everything else via a proxy rewrite (see `vercel.json`).
- **Existing API pattern**: `api/cpx-postback.js` and `api/wannads-postback.js` both use ES module `export default async function handler(req, res)` — new files must match exactly.
- **i18n system**: `script.js` holds a `translations` object with `en` and `es` keys. `setLanguage()` applies them to `[data-i18n]` elements at runtime via `el.textContent = translations[lang][key]`. New dashboard strings must be added to both language objects.
- **User ID**: `getUserId()` reads/writes `cpx_user_id` from `localStorage` — this is the ID that will be used as the KV key.
- **DOMContentLoaded block** (line ~789 of script.js): calls `initLanguage()`, `initCPXResearch()`, `initWannads()`, `initializeTracking()`, `initFAQ()`, and others. `initProgressDashboard()` must be appended here.
- **HTML insertion point**: `<div class="container" id="encuestas">` closes with `</div>` just before `<div class="how-it-works" id="como-funciona">`. The new `<section id="progress-dashboard">` goes between those two elements.
- **CSS variables available** (from `:root`): `--white`, `--light-bg`, `--shadow-lg`, `--shadow-md`, `--text-primary`, `--text-secondary`, `--text-light`, `--primary-color`, `--secondary-color`, `--accent-color`, `--danger-color`, `--border-color`, `--transition-base`. No new CSS classes needed.
- **No `package-lock.json`** exists — `package.json` has no dependencies at all currently.
- **`vercel.json`** builds all `api/**/*.js` with `@vercel/node`; no changes needed there.

## Gotchas

1. **`@vercel/kv` ES module import**: use `import { kv } from '@vercel/kv';` at the top of each new API file — same style as the existing `import crypto from 'crypto'` in `cpx-postback.js`.
2. **Internal fetch URL in postbacks**: `process.env.VERCEL_URL` is set automatically on Vercel but is the _deployment_ URL, not the custom domain. Safer to construct from `req.headers.host`: `const base = \`https://\${req.headers.host}\`;`. Wrap the whole `record-survey` call in `try/catch` — the outer handler must still return `200 OK` even if KV is down.
3. **Idempotency in `record-survey`**: before appending to `history`, check if `tx_id` already exists in `history`. If found, return `200` without writing. This prevents double-credit if CPX/Wannads retries the postback.
4. **History cap**: after pushing the new entry, if `history.length > 100` do `history = history.slice(-100)` (keep newest 100).
5. **`pending_earned` vs `total_earned`**: status `'completed'` increments `total_earned`; status `'pending'` increments `pending_earned`; status `'reversed'` decrements the appropriate field (check original status from history entry if needed — for simplicity, just decrement `total_earned` on reversed, matching the spec).
6. **CORS on `/api/user-stats`**: add `Access-Control-Allow-Origin: *` header manually in the handler (the global header in `vercel.json` already covers `/api/(.*)`, so this is already handled — but set it in code too for local `vercel dev` safety).
7. **Dashboard i18n**: the `[data-i18n]` elements use `el.textContent`, not `innerHTML`. Use `data-i18n` on text-only elements. Stat number `<span>`s use IDs (not `data-i18n`) and are updated by JS.
8. **`BASE_URL` constant**: define at the top of `script.js` as `const BASE_URL = 'https://nisi-cash.vercel.app';` — always use the absolute URL so the fetch works from the GitHub Pages origin (cross-origin to Vercel).
9. **`vercel dev` runs locally on port 3000**: when testing locally, `req.headers.host` will be `localhost:3000`, so the internal fetch inside postbacks would call `https://localhost:3000/api/record-survey` — that's fine for local testing but won't use HTTPS. Use `http://` for localhost. Handle this with: `const protocol = req.headers.host.includes('localhost') ? 'http' : 'https';`.
10. **ES module interop**: all `api/*.js` files already use `export default` (no `module.exports`). Keep that pattern.

---

## Implementation Steps

- [ ] 1. **Add `@vercel/kv` to `package.json`**
  - Add `"@vercel/kv": "^1.0.0"` to a new `"dependencies"` field.
  - Files: `package.json`
  - Verify: `npm install` runs without errors and `node_modules/@vercel/kv` exists.

- [ ] 2. **Create `api/user-stats.js`** — GET endpoint that reads/creates a user profile in Vercel KV.
  - Import `kv` from `@vercel/kv`.
  - Accept `?user_id=XXX` query param. If missing, return 400.
  - Try `kv.get('user:' + user_id)`. If null, build a fresh profile object (surveys_completed: 0, total_earned: 0, pending_earned: 0, history: [], created_at/last_seen: ISO timestamp) and `kv.set(...)` it before returning.
  - If found, update `last_seen` and return the full object.
  - Set `res.setHeader('Access-Control-Allow-Origin', '*')` explicitly.
  - Use `export default async function handler(req, res)` pattern.
  - Files: `api/user-stats.js`
  - Verify: `vercel dev` running locally; `curl "http://localhost:3000/api/user-stats?user_id=USER_test_abc"` returns a JSON object with `surveys_completed: 0`.

- [ ] 3. **Create `api/record-survey.js`** — POST endpoint that appends a transaction and updates user totals.
  - Import `kv` from `@vercel/kv`.
  - Accept JSON body: `{ user_id, platform, amount, tx_id, status }`. Validate all fields present; return 400 otherwise.
  - Fetch existing user from KV (or create default if missing, reusing same default-profile logic as step 2).
  - Idempotency check: if `tx_id` already in `history`, return `200 { ok: true, skipped: true }`.
  - Build new entry: `{ date: new Date().toISOString(), platform, amount: parseFloat(amount), tx_id, status }`.
  - Push entry to `history`; cap at 100 via `history = history.slice(-100)`.
  - Update counters: `status === 'completed'` → `surveys_completed += 1`, `total_earned += parseFloat(amount)`; `status === 'pending'` → `pending_earned += parseFloat(amount)`; `status === 'reversed'` → `total_earned = Math.max(0, total_earned - parseFloat(amount))`.
  - Save back with `kv.set('user:' + user_id, updatedUser)`.
  - Return `200 { ok: true }`.
  - Files: `api/record-survey.js`
  - Verify: `vercel dev` running; POST with `curl -X POST http://localhost:3000/api/record-survey -H "Content-Type: application/json" -d '{"user_id":"USER_test_abc","platform":"cpx","amount":"1.50","tx_id":"TX001","status":"completed"}'` returns `{"ok":true}`; subsequent GET to `/api/user-stats?user_id=USER_test_abc` shows `surveys_completed: 1` and `total_earned: 1.5`.

- [ ] 4. **Update `api/cpx-postback.js`** — fire-and-forget call to `record-survey` after hash validation.
  - After the existing `validateSecureHash` block (which already handles the 403 on failure), inside the `case '1'` and `case '2'` blocks of the `switch(status)` statement, replace the `// TODO` comments with an internal fetch call.
  - Build `base`: `const protocol = req.headers.host?.includes('localhost') ? 'http' : 'https'; const base = \`\${protocol}://\${req.headers.host}\`;`
  - For `case '1'`: fire-and-forget `fetch(\`\${base}/api/record-survey\`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ user_id, platform: 'cpx', amount: amount_usd, tx_id: trans_id, status: 'completed' }) }).catch(e => console.error('KV record failed:', e));`
  - For `case '2'`: same call but `status: 'reversed'`.
  - Wrap each fetch call in its own `try { fetch(...).catch(...) } catch(e) { console.error(e); }` so the outer handler never throws from this.
  - The existing `return res.status(200).json({...})` at the end remains unchanged.
  - Files: `api/cpx-postback.js`
  - Verify: `vercel dev` running; simulate a GET to `/api/cpx-postback?status=1&trans_id=TX999&user_id=USER_test_abc&amount_usd=0.75&secure_hash=<valid_hash>` returns `200` and a subsequent `/api/user-stats?user_id=USER_test_abc` shows the new transaction in `history`.

- [ ] 5. **Update `api/wannads-postback.js`** — fire-and-forget call to `record-survey`.
  - After the existing parameter validation, inside `case 'completed'`, `case 'pending'`, and `case 'reversed'`/`case 'rejected'` blocks, replace `// TODO` comments with the same internal fetch pattern as step 4.
  - Build `base` the same way (`protocol` + `req.headers.host`).
  - `case 'completed'`: `status: 'completed'`, `amount: payout` (the publisher cut).
  - `case 'pending'`: `status: 'pending'`, `amount: payout`.
  - `case 'reversed'` / `case 'rejected'`: `status: 'reversed'`, `amount: payout`.
  - Note: `payout` may be undefined if Wannads doesn't send it — fall back to `amount` if `payout` is falsy: `const recordAmount = payout || amount || '0';`
  - Files: `api/wannads-postback.js`
  - Verify: `vercel dev` running; simulate a GET to `/api/wannads-postback?status=completed&transaction_id=WTX001&user_id=USER_test_abc&amount=2.00&payout=1.60` returns `200`; `/api/user-stats?user_id=USER_test_abc` shows a new `'platform':'wannads'` entry.

- [ ] 6. **Add i18n keys to `script.js` translations**
  - In the `translations.en` object, add after the last existing key (before the closing `}`):
    ```
    dashboardTitle: 'My Progress',
    dashboardSurveys: 'Surveys Completed',
    dashboardEarned: 'Verified Earnings',
    dashboardPending: 'Pending',
    dashboardRecent: 'Recent Transactions',
    dashboardLoading: 'Loading...',
    dashboardError: 'Could not load data. Try again later.',
    dashboardNoTx: 'No transactions yet.',
    txStatusCompleted: 'Completed',
    txStatusPending: 'Pending',
    txStatusReversed: 'Reversed',
    ```
  - In the `translations.es` object, add the same keys with Spanish values:
    ```
    dashboardTitle: 'Mi Progreso',
    dashboardSurveys: 'Encuestas Completadas',
    dashboardEarned: 'Ganancias Verificadas',
    dashboardPending: 'Pendiente',
    dashboardRecent: 'Transacciones Recientes',
    dashboardLoading: 'Cargando...',
    dashboardError: 'No se pudieron cargar los datos. Intenta más tarde.',
    dashboardNoTx: 'Sin transacciones aún.',
    txStatusCompleted: 'Completada',
    txStatusPending: 'Pendiente',
    txStatusReversed: 'Revertida',
    ```
  - Files: `script.js`
  - Verify: Open the browser console on the local page and run `t('dashboardTitle')` — confirm it returns `'My Progress'` in English and `'Mi Progreso'` after switching to Spanish via the dropdown.

- [ ] 7. **Add `BASE_URL` constant and `initProgressDashboard()` to `script.js`**
  - Add near the top of `script.js` (after the `translations` block, before `initLanguage`):
    ```js
    const BASE_URL = 'https://nisi-cash.vercel.app';
    ```
  - Add the full `initProgressDashboard()` function (place it before the `DOMContentLoaded` block):
    - Get `userId` via `getUserId()`.
    - Define inner async `loadDashboard()`:
      - Set `#transactions-list` to a loading spinner (`<div style="text-align:center;padding:1rem"><i class="fas fa-spinner fa-spin"></i> <span data-i18n="dashboardLoading">${t('dashboardLoading')}</span></div>`).
      - `fetch(\`\${BASE_URL}/api/user-stats?user_id=\${userId}\`)` — on success parse JSON.
      - Update `document.getElementById('stat-surveys').textContent = data.surveys_completed ?? 0`.
      - Update `document.getElementById('stat-earned').textContent = '$' + (data.total_earned ?? 0).toFixed(2)`.
      - Update `document.getElementById('stat-pending').textContent = '$' + (data.pending_earned ?? 0).toFixed(2)`.
      - Take last 5 from `data.history || []` (reversed so newest first): `const recent = [...(data.history || [])].reverse().slice(0, 5)`.
      - If `recent.length === 0`, set `#transactions-list` to `<p style="color:var(--text-secondary);text-align:center;padding:1rem">${t('dashboardNoTx')}</p>`.
      - Otherwise build an HTML table:
        ```html
        <table style="width:100%;border-collapse:collapse;font-size:0.9rem">
          <thead><tr style="background:var(--light-bg)">
            <th style="padding:0.5rem;text-align:left;color:var(--text-secondary)">Date</th>
            <th style="padding:0.5rem;text-align:left;color:var(--text-secondary)">Platform</th>
            <th style="padding:0.5rem;text-align:right;color:var(--text-secondary)">Amount</th>
            <th style="padding:0.5rem;text-align:center;color:var(--text-secondary)">Status</th>
          </tr></thead>
          <tbody><!-- rows --></tbody>
        </table>
        ```
      - Each row: date formatted with `new Date(tx.date).toLocaleDateString()`, platform badge (`<span style="background:var(--primary-color);color:#fff;border-radius:4px;padding:2px 6px;font-size:0.75rem">${tx.platform}</span>`), `$${tx.amount.toFixed(2)}`, status badge (color: `--secondary-color` for completed, `--accent-color` for pending, `--danger-color` for reversed).
      - On fetch error (catch block): set `#transactions-list` to `<p style="color:var(--danger-color);text-align:center;padding:1rem">${t('dashboardError')}</p>`.
    - Call `loadDashboard()` immediately.
    - Set polling: `setInterval(loadDashboard, 30000)`.
  - In the `DOMContentLoaded` block, add `initProgressDashboard();` after `initWannads();`.
  - Files: `script.js`
  - Verify: Load `index.html` via `vercel dev` (or directly from file), open DevTools Network tab — confirm a fetch to `/api/user-stats?user_id=USER_...` fires on load and every 30 seconds. Confirm the `#stat-surveys` element shows a number.

- [ ] 8. **Add `<section id="progress-dashboard">` to `index.html`**
  - Locate the closing `</div>` of `<div class="container" id="encuestas">` (the line immediately before `<!-- How It Works -->`).
  - Insert the following block between that `</div>` and the `<!-- How It Works -->` comment:

    ```html
    <!-- Progress Dashboard -->
    <section id="progress-dashboard" style="background:var(--white);border-radius:16px;box-shadow:var(--shadow-lg);max-width:900px;margin:2rem auto;padding:2rem;">
      <h2 style="font-size:1.5rem;font-weight:700;color:var(--text-primary);margin-bottom:1.5rem;display:flex;align-items:center;gap:0.5rem;">
        <i class="fas fa-chart-bar" style="color:var(--primary-color);"></i>
        <span data-i18n="dashboardTitle">My Progress</span>
      </h2>

      <!-- Stat Cards -->
      <div style="display:flex;flex-wrap:wrap;gap:1rem;margin-bottom:2rem;">

        <div style="flex:1;min-width:160px;background:var(--light-bg);border-radius:12px;padding:1.25rem;text-align:center;">
          <i class="fas fa-poll" style="font-size:1.75rem;color:var(--primary-color);margin-bottom:0.5rem;display:block;"></i>
          <span id="stat-surveys" style="font-size:2rem;font-weight:800;color:var(--text-primary);display:block;">0</span>
          <span data-i18n="dashboardSurveys" style="font-size:0.85rem;color:var(--text-secondary);">Surveys Completed</span>
        </div>

        <div style="flex:1;min-width:160px;background:var(--light-bg);border-radius:12px;padding:1.25rem;text-align:center;">
          <i class="fas fa-check-circle" style="font-size:1.75rem;color:var(--secondary-color);margin-bottom:0.5rem;display:block;"></i>
          <span id="stat-earned" style="font-size:2rem;font-weight:800;color:var(--text-primary);display:block;">$0.00</span>
          <span data-i18n="dashboardEarned" style="font-size:0.85rem;color:var(--text-secondary);">Verified Earnings</span>
        </div>

        <div style="flex:1;min-width:160px;background:var(--light-bg);border-radius:12px;padding:1.25rem;text-align:center;">
          <i class="fas fa-clock" style="font-size:1.75rem;color:var(--accent-color);margin-bottom:0.5rem;display:block;"></i>
          <span id="stat-pending" style="font-size:2rem;font-weight:800;color:var(--text-primary);display:block;">$0.00</span>
          <span data-i18n="dashboardPending" style="font-size:0.85rem;color:var(--text-secondary);">Pending</span>
        </div>

      </div>

      <!-- Recent Transactions -->
      <h3 style="font-size:1.1rem;font-weight:600;color:var(--text-primary);margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem;">
        <i class="fas fa-history" style="color:var(--text-secondary);"></i>
        <span data-i18n="dashboardRecent">Recent Transactions</span>
      </h3>
      <div id="transactions-list" style="min-height:60px;"></div>
    </section>
    ```
  - Files: `index.html`
  - Verify: Open `index.html` in a browser (or via `vercel dev`). The dashboard section appears between the survey cards and the "How It Works" section. Confirm the `data-i18n` spans update correctly when switching language with the dropdown. Confirm the layout wraps gracefully on a 375px viewport (use DevTools device emulation).

- [ ] 9. **Create `SETUP_VERCEL_KV.md`**
  - Write step-by-step setup instructions covering: creating the KV store in Vercel dashboard (Storage → New Store → KV), linking it to the project, running `vercel env pull .env.local` to get env vars, the 4 auto-generated env vars (`KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`), testing locally with `vercel dev`, and a note that `@vercel/kv` reads these env vars automatically — no manual configuration needed in code.
  - Files: `SETUP_VERCEL_KV.md`
  - Verify: File exists and is readable. No code changes needed — this is documentation only.

---

## Dependency Order Summary

```
Step 1 (package.json)
  └─► Step 2 (user-stats.js) — needs @vercel/kv installed
  └─► Step 3 (record-survey.js) — needs @vercel/kv installed
        └─► Step 4 (cpx-postback.js) — calls record-survey
        └─► Step 5 (wannads-postback.js) — calls record-survey
Step 6 (script.js i18n keys) — needed by Step 7
Step 7 (script.js JS function) — depends on Step 6 keys, calls /api/user-stats (Step 2)
Step 8 (index.html dashboard HTML) — provides DOM elements Step 7 reads
Step 9 (SETUP_VERCEL_KV.md) — independent, can be done any time
```

Steps 6, 7, 8 can be done in one pass on the frontend files. Steps 2, 3, 4, 5 can be done in one pass on the API files after step 1.

## Full Verification (end-to-end)

After all steps are complete, run `vercel dev` in the project root and:

1. Open `http://localhost:3000` in the browser.
2. The progress dashboard section is visible below the survey cards.
3. The dashboard shows `0` surveys and `$0.00` earnings (no KV data yet locally — you'll need `vercel env pull .env.local` first with a real KV store linked).
4. Simulate a CPX postback: `curl "http://localhost:3000/api/cpx-postback?status=1&trans_id=TX999&user_id=<your_local_user_id>&amount_usd=1.50&secure_hash=<hash>"` — the dashboard refreshes within 30 seconds (or reload) and shows the updated stats.
5. Switch language to Spanish — all dashboard labels switch to Spanish.
6. Deploy to Vercel with `vercel --prod` — confirm the KV env vars are linked and the live site shows the dashboard.
