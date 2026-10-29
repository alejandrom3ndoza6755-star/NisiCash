import { Redis } from '@upstash/redis';

const kv = Redis.fromEnv();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { user_id } = req.query;
  if (!user_id) return res.status(400).json({ error: 'Missing user_id' });

  try {
    const user = await kv.get(`user:${user_id}`);
    if (!user) {
      // User has no activity yet — return default with points
      return res.status(200).json({
        user_id,
        surveys_completed: 0,
        total_earned_points: 0,
        total_earned_usd: 0,
        pending_earned_points: 0,
        pending_earned_usd: 0,
        last_seen: null,
        created_at: null,
        history: []
      });
    }
    // Return user data with points
    return res.status(200).json(user);
  } catch (error) {
    console.error('user-stats error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
