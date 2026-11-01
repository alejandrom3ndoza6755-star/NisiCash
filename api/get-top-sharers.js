// api/get-top-sharers.js
// API para obtener el TOP 3 de usuarios con más compartidos (leaderboard)

import { kv } from '@vercel/kv';

// Datos "seed" ficticios para cuando no hay usuarios reales
// Ajustados para parecer consistentes con ~1,500 participantes
const SEED_DATA = [
  {
    user_id: 'demo-user-alpha-001',
    total_shares: 127,
    display_name: 'A7B2C4D9',
    is_seed: true
  },
  {
    user_id: 'demo-user-beta-002',
    total_shares: 103,
    display_name: 'E3F8G1H6',
    is_seed: true
  },
  {
    user_id: 'demo-user-gamma-003',
    total_shares: 89,
    display_name: 'J9K4L2M7',
    is_seed: true
  }
];

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
    // CORREGIDO: Buscar con el key correcto "referral:*"
    const allKeys = await kv.keys('referral:*');
    
    // Filtrar solo los keys de usuarios (no el contador total_participants)
    const userKeys = allKeys?.filter(key => !key.includes('raffle:')) || [];
    
    // Obtener los datos de cada usuario REAL
    const realUsersData = [];
    
    for (const key of userKeys) {
      const referralData = await kv.get(key);
      
      if (referralData && referralData.total_shares > 0) {
        realUsersData.push({
          user_id: referralData.user_id,
          total_shares: referralData.total_shares || 0,
          shares_by_platform: referralData.shares_by_platform || {},
          last_share: referralData.last_share || null,
          is_seed: false
        });
      }
    }

    // Ordenar usuarios reales por total_shares descendente
    realUsersData.sort((a, b) => b.total_shares - a.total_shares);

    let topSharers = [];

    // Si hay menos de 3 usuarios reales, completar con datos seed
    if (realUsersData.length < 3) {
      // Tomar los usuarios reales que hay
      topSharers = [...realUsersData];
      
      // Calcular cuántos seed necesitamos
      const seedNeeded = 3 - realUsersData.length;
      
      // Agregar seed data SOLO en las posiciones faltantes
      for (let i = 0; i < seedNeeded; i++) {
        // Asegurarse de que el seed tenga menos shares que el último usuario real
        let seedUser = { ...SEED_DATA[i] };
        
        if (realUsersData.length > 0) {
          const lowestRealShares = realUsersData[realUsersData.length - 1].total_shares;
          // El seed debe tener menos shares que el usuario real más bajo
          seedUser.total_shares = Math.max(1, lowestRealShares - (i + 1) * 3);
        }
        
        topSharers.push(seedUser);
      }
    } else {
      // Si hay 3 o más usuarios reales, mostrar solo usuarios reales
      topSharers = realUsersData.slice(0, 3);
    }

    return res.status(200).json({
      success: true,
      topSharers: topSharers,
      total_real_users: realUsersData.length,
      has_seed_data: topSharers.some(u => u.is_seed),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error getting top sharers:', error);
    
    // En caso de error, devolver datos seed para que no se vea vacío
    return res.status(200).json({ 
      success: true,
      topSharers: SEED_DATA,
      total_real_users: 0,
      has_seed_data: true,
      error_fallback: true,
      timestamp: new Date().toISOString()
    });
  }
}
