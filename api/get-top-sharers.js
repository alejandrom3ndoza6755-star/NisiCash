// api/get-top-sharers.js
// API para obtener el TOP 3 de usuarios con más compartidos (leaderboard)

import { kv } from '@vercel/kv';

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

  try {
    // Obtener todos los usuarios con sus estadísticas de referidos
    const allKeys = await kv.keys('user:*:referrals');
    
    if (!allKeys || allKeys.length === 0) {
      return res.status(200).json({ topSharers: [] });
    }

    // Obtener los datos de cada usuario
    const usersData = [];
    
    for (const key of allKeys) {
      const referralData = await kv.get(key);
      
      if (referralData && referralData.total_shares > 0) {
        // Extraer user_id del key (formato: user:UUID:referrals)
        const userId = key.split(':')[1];
        
        usersData.push({
          user_id: userId,
          total_shares: referralData.total_shares || 0,
          whatsapp_shares: referralData.whatsapp_shares || 0,
          facebook_shares: referralData.facebook_shares || 0,
          twitter_shares: referralData.twitter_shares || 0,
          telegram_shares: referralData.telegram_shares || 0,
          copy_shares: referralData.copy_shares || 0,
          last_share_date: referralData.last_share_date || null
        });
      }
    }

    // Ordenar por total_shares descendente y tomar los top 3
    usersData.sort((a, b) => b.total_shares - a.total_shares);
    const top3 = usersData.slice(0, 3);

    return res.status(200).json({
      success: true,
      topSharers: top3,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error getting top sharers:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
