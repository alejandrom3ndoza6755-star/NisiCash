import { Redis } from '@upstash/redis';

const kv = Redis.fromEnv();

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { user_id, platform } = req.body || {};

  if (!user_id || !platform) {
    return res.status(400).json({ error: 'Missing required fields: user_id, platform' });
  }

  const validPlatforms = ['whatsapp', 'facebook', 'twitter', 'telegram', 'copy'];
  if (!validPlatforms.includes(platform)) {
    return res.status(400).json({ error: 'Invalid platform' });
  }

  try {
    // Get or create user's referral data
    let referralData = await kv.get(`referral:${user_id}`);
    
    if (!referralData) {
      referralData = {
        user_id,
        total_shares: 0,
        shares_by_platform: {},
        raffle_entries: 0,
        last_share: null,
        created_at: new Date().toISOString()
      };
    }

    // Update share count
    referralData.total_shares = (referralData.total_shares || 0) + 1;
    referralData.shares_by_platform[platform] = (referralData.shares_by_platform[platform] || 0) + 1;
    referralData.raffle_entries = referralData.total_shares; // 1 share = 1 entry
    referralData.last_share = new Date().toISOString();

    // Save updated data
    await kv.set(`referral:${user_id}`, referralData);

    // Increment total participants counter
    const participantsKey = 'raffle:total_participants';
    const currentParticipants = await kv.get(participantsKey);
    if (!currentParticipants) {
      await kv.set(participantsKey, 1);
    } else {
      // Check if this user is new to the raffle
      const isNewParticipant = referralData.total_shares === 1;
      if (isNewParticipant) {
        await kv.incr(participantsKey);
      }
    }

    return res.status(200).json({
      success: true,
      total_shares: referralData.total_shares,
      raffle_entries: referralData.raffle_entries,
      platform
    });
  } catch (error) {
    console.error('record-share error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
