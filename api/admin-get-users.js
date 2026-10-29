import { Redis } from '@upstash/redis';

const kv = Redis.fromEnv();

// Clave secreta de admin (cambiar por una segura)
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'nisicash_admin_2026';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verificar autenticación simple
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Obtener todas las keys de usuarios
    const userKeys = await kv.keys('user:*');
    
    if (!userKeys || userKeys.length === 0) {
      return res.status(200).json({
        success: true,
        users: [],
        total: 0
      });
    }

    // Obtener datos de todos los usuarios
    const users = [];
    for (const key of userKeys) {
      const userData = await kv.get(key);
      if (userData) {
        users.push({
          ...userData,
          key: key
        });
      }
    }

    // Calcular estadísticas globales
    const stats = {
      totalUsers: users.length,
      totalSurveys: users.reduce((sum, u) => sum + (u.surveys_completed || 0), 0),
      totalEarned: users.reduce((sum, u) => sum + (u.total_earned || 0), 0),
      totalPending: users.reduce((sum, u) => sum + (u.pending_earned || 0), 0)
    };

    // Obtener datos de referidos
    const referralKeys = await kv.keys('referral:*');
    const referrals = [];
    for (const key of referralKeys) {
      const data = await kv.get(key);
      if (data) {
        referrals.push(data);
      }
    }

    const totalShares = referrals.reduce((sum, r) => sum + (r.total_shares || 0), 0);
    stats.totalShares = totalShares;

    return res.status(200).json({
      success: true,
      users: users.sort((a, b) => (b.total_earned || 0) - (a.total_earned || 0)),
      referrals,
      stats
    });
  } catch (error) {
    console.error('admin-get-users error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
