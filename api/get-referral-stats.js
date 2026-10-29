import { Redis } from '@upstash/redis';

const kv = Redis.fromEnv();

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: 'Missing user_id parameter' });
  }

  try {
    // Get user's referral data
    const referralData = await kv.get(`referral:${user_id}`);
    
    // Get total participants
    const totalParticipants = (await kv.get('raffle:total_participants')) || 0;

    // Get raffle end date (last day of current month)
    const now = new Date();
    const raffleEndDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const userStats = {
      total_shares: referralData?.total_shares || 0,
      raffle_entries: referralData?.raffle_entries || 0,
      shares_by_platform: referralData?.shares_by_platform || {},
      last_share: referralData?.last_share || null
    };

    const globalStats = {
      total_participants: totalParticipants,
      raffle_end_date: raffleEndDate.toISOString()
    };

    return res.status(200).json({
      success: true,
      user: userStats,
      global: globalStats
    });
  } catch (error) {
    console.error('get-referral-stats error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
