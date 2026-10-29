import { Redis } from '@upstash/redis';

const kv = Redis.fromEnv();

const INTERNAL_TOKEN = process.env.INTERNAL_RECORD_TOKEN;

export default async function handler(req, res) {
  // Block CORS preflight — this endpoint is server-to-server only
  if (req.method === 'OPTIONS') return res.status(405).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Shared-secret auth: reject requests that don't carry the internal token
  // Fail-CLOSED: if the env var is not set in production, block all requests
  // to prevent browsers from writing arbitrary earnings.
  // (During local `vercel dev`, set INTERNAL_RECORD_TOKEN in .env.local)
  if (!INTERNAL_TOKEN || req.headers['x-internal-token'] !== INTERNAL_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { user_id, platform, amount, tx_id, status } = req.body || {};
  if (!user_id || !tx_id || !platform || amount === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    let user = await kv.get(`user:${user_id}`);
    if (!user) {
      user = {
        user_id,
        surveys_completed: 0,
        total_earned: 0,
        pending_earned: 0,
        last_seen: new Date().toISOString(),
        created_at: new Date().toISOString(),
        history: []
      };
    }

    const amt = parseFloat(amount) || 0;

    // Find any existing history entry for this tx_id (regardless of status)
    const existingIndex = user.history.findIndex(h => h.tx_id === tx_id);
    const existingEntry = existingIndex !== -1 ? user.history[existingIndex] : null;

    // Exact-replay idempotency: same tx_id + same status already recorded → skip
    if (existingEntry && existingEntry.status === status) {
      return res.status(200).json({ success: true, duplicate: true });
    }

    if (existingEntry) {
      // State transition: update the existing entry in place rather than pushing a new one
      const prevStatus = existingEntry.status;
      const prevAmount = existingEntry.amount; // snapshot before mutation
      existingEntry.status = status;
      existingEntry.amount = amt;
      existingEntry.date = new Date().toISOString();

      if (status === 'completed') {
        // Use prevAmount for the total_earned credit when transitioning from pending
        // so that both sides of the pending↔completed move use the same figure,
        // preventing balance drift when the two postbacks carry different amounts.
        const creditAmount = (prevStatus === 'pending') ? prevAmount : amt;
        user.total_earned = Math.round(((user.total_earned || 0) + creditAmount) * 100) / 100;
        if (prevStatus === 'pending') {
          user.pending_earned = Math.max(0, Math.round(((user.pending_earned || 0) - prevAmount) * 100) / 100);
        }
        // Only increment surveys_completed if it wasn't already counted as completed
        if (prevStatus !== 'completed') {
          user.surveys_completed = (user.surveys_completed || 0) + 1;
        }
      } else if (status === 'reversed') {
        // Undo whatever the previous status contributed
        if (prevStatus === 'completed') {
          user.total_earned = Math.max(0, Math.round(((user.total_earned || 0) - prevAmount) * 100) / 100);
          user.surveys_completed = Math.max(0, (user.surveys_completed || 0) - 1);
        } else if (prevStatus === 'pending') {
          user.pending_earned = Math.max(0, Math.round(((user.pending_earned || 0) - prevAmount) * 100) / 100);
        }
      }
    } else {
      // New transaction: push a fresh entry
      const entry = {
        date: new Date().toISOString(),
        platform,
        amount: amt,
        tx_id,
        status
      };

      user.history.push(entry);
      // Keep only last 100
      if (user.history.length > 100) {
        user.history = user.history.slice(user.history.length - 100);
      }

      if (status === 'completed') {
        user.surveys_completed = (user.surveys_completed || 0) + 1;
        user.total_earned = Math.round(((user.total_earned || 0) + amt) * 100) / 100;
      } else if (status === 'pending') {
        user.pending_earned = Math.round(((user.pending_earned || 0) + amt) * 100) / 100;
      } else if (status === 'reversed') {
        // Arrived reversed with no prior history — subtract from total_earned defensively
        user.total_earned = Math.max(0, Math.round(((user.total_earned || 0) - amt) * 100) / 100);
      }
    }

    user.last_seen = new Date().toISOString();
    await kv.set(`user:${user_id}`, user);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('record-survey error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
