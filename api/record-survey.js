import { Redis } from '@upstash/redis';

const kv = Redis.fromEnv();

const INTERNAL_TOKEN = process.env.INTERNAL_RECORD_TOKEN;

// Sistema de conversión: 200 puntos = $1 USD para el usuario
// Ratio de comisión: 50% para el usuario, 50% para el sitio
const POINTS_PER_DOLLAR = 200;
const USER_COMMISSION = 0.50; // 50% para el usuario

export default async function handler(req, res) {
  // Block CORS preflight — this endpoint is server-to-server only
  if (req.method === 'OPTIONS') return res.status(405).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Shared-secret auth: reject requests that don't carry the internal token
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
        total_earned_points: 0,
        total_earned_usd: 0,
        pending_earned_points: 0,
        pending_earned_usd: 0,
        site_commission_usd: 0, // Lo que gana el sitio
        last_seen: new Date().toISOString(),
        created_at: new Date().toISOString(),
        history: []
      };
    }

    // Convertir el monto USD del offerwall a puntos y aplicar comisión
    const offerwallAmountUSD = parseFloat(amount) || 0;
    const userPointsEarned = Math.round(offerwallAmountUSD * POINTS_PER_DOLLAR * USER_COMMISSION);
    const userUSDEarned = Math.round((userPointsEarned / POINTS_PER_DOLLAR) * 100) / 100;
    const siteCommissionUSD = Math.round((offerwallAmountUSD - userUSDEarned) * 100) / 100;

    // Find any existing history entry for this tx_id
    const existingIndex = user.history.findIndex(h => h.tx_id === tx_id);
    const existingEntry = existingIndex !== -1 ? user.history[existingIndex] : null;

    // Exact-replay idempotency
    if (existingEntry && existingEntry.status === status) {
      return res.status(200).json({ success: true, duplicate: true });
    }

    if (existingEntry) {
      // State transition
      const prevStatus = existingEntry.status;
      const prevPoints = existingEntry.points_earned;
      const prevUserUSD = existingEntry.user_usd_earned;
      const prevCommission = existingEntry.site_commission_usd;
      
      existingEntry.status = status;
      existingEntry.points_earned = userPointsEarned;
      existingEntry.user_usd_earned = userUSDEarned;
      existingEntry.offerwall_amount_usd = offerwallAmountUSD;
      existingEntry.site_commission_usd = siteCommissionUSD;
      existingEntry.date = new Date().toISOString();

      if (status === 'completed') {
        const creditPoints = (prevStatus === 'pending') ? prevPoints : userPointsEarned;
        const creditUSD = (prevStatus === 'pending') ? prevUserUSD : userUSDEarned;
        const creditCommission = (prevStatus === 'pending') ? prevCommission : siteCommissionUSD;
        
        user.total_earned_points = (user.total_earned_points || 0) + creditPoints;
        user.total_earned_usd = Math.round(((user.total_earned_usd || 0) + creditUSD) * 100) / 100;
        user.site_commission_usd = Math.round(((user.site_commission_usd || 0) + creditCommission) * 100) / 100;
        
        if (prevStatus === 'pending') {
          user.pending_earned_points = Math.max(0, (user.pending_earned_points || 0) - prevPoints);
          user.pending_earned_usd = Math.max(0, Math.round(((user.pending_earned_usd || 0) - prevUserUSD) * 100) / 100);
        }
        
        if (prevStatus !== 'completed') {
          user.surveys_completed = (user.surveys_completed || 0) + 1;
        }
      } else if (status === 'reversed') {
        if (prevStatus === 'completed') {
          user.total_earned_points = Math.max(0, (user.total_earned_points || 0) - prevPoints);
          user.total_earned_usd = Math.max(0, Math.round(((user.total_earned_usd || 0) - prevUserUSD) * 100) / 100);
          user.site_commission_usd = Math.max(0, Math.round(((user.site_commission_usd || 0) - prevCommission) * 100) / 100);
          user.surveys_completed = Math.max(0, (user.surveys_completed || 0) - 1);
        } else if (prevStatus === 'pending') {
          user.pending_earned_points = Math.max(0, (user.pending_earned_points || 0) - prevPoints);
          user.pending_earned_usd = Math.max(0, Math.round(((user.pending_earned_usd || 0) - prevUserUSD) * 100) / 100);
        }
      }
    } else {
      // New transaction
      const entry = {
        date: new Date().toISOString(),
        platform,
        offerwall_amount_usd: offerwallAmountUSD,
        points_earned: userPointsEarned,
        user_usd_earned: userUSDEarned,
        site_commission_usd: siteCommissionUSD,
        tx_id,
        status
      };

      user.history.push(entry);
      if (user.history.length > 100) {
        user.history = user.history.slice(user.history.length - 100);
      }

      if (status === 'completed') {
        user.surveys_completed = (user.surveys_completed || 0) + 1;
        user.total_earned_points = (user.total_earned_points || 0) + userPointsEarned;
        user.total_earned_usd = Math.round(((user.total_earned_usd || 0) + userUSDEarned) * 100) / 100;
        user.site_commission_usd = Math.round(((user.site_commission_usd || 0) + siteCommissionUSD) * 100) / 100;
      } else if (status === 'pending') {
        user.pending_earned_points = (user.pending_earned_points || 0) + userPointsEarned;
        user.pending_earned_usd = Math.round(((user.pending_earned_usd || 0) + userUSDEarned) * 100) / 100;
      } else if (status === 'reversed') {
        user.total_earned_points = Math.max(0, (user.total_earned_points || 0) - userPointsEarned);
        user.total_earned_usd = Math.max(0, Math.round(((user.total_earned_usd || 0) - userUSDEarned) * 100) / 100);
        user.site_commission_usd = Math.max(0, Math.round(((user.site_commission_usd || 0) - siteCommissionUSD) * 100) / 100);
      }
    }

    user.last_seen = new Date().toISOString();
    await kv.set(`user:${user_id}`, user);

    return res.status(200).json({ 
      success: true,
      user_points_earned: userPointsEarned,
      user_usd_earned: userUSDEarned,
      site_commission: siteCommissionUSD
    });
  } catch (error) {
    console.error('record-survey error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
