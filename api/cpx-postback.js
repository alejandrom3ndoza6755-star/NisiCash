// API endpoint para recibir postbacks de CPX Research
// Desplegado en Vercel como función serverless

import crypto from 'crypto';

// La misma clave que usas en el frontend (CPX_CONFIG.secureHashKey)
// En producción, muévela a una variable de entorno de Vercel:
//   vercel env add CPX_SECURE_HASH_KEY
// y accede con: process.env.CPX_SECURE_HASH_KEY
const CPX_SECURE_HASH_KEY = process.env.CPX_SECURE_HASH_KEY || 'CNyYOocHuRrNRRqsUueyBCOQ9ZtzaHFN';

/**
 * Valida el secure_hash enviado por CPX Research en el postback.
 * Formato: MD5(trans_id + "-" + secure_hash_key)
 */
function validateSecureHash(receivedHash, transId) {
  if (!receivedHash || !transId) return false;
  const expectedHash = crypto
    .createHash('md5')
    .update(`${transId}-${CPX_SECURE_HASH_KEY}`)
    .digest('hex');
  return receivedHash === expectedHash;
}

export default async function handler(req, res) {
  // Solo aceptar solicitudes GET (CPX Research usa GET)
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extraer parámetros de CPX Research
    const {
      status,
      trans_id,
      user_id,
      subid,
      subid_2,
      amount_local,
      amount_usd,
      offer_ID,
      secure_hash,
      ip_click
    } = req.query;

    // Validar que los parámetros requeridos estén presentes
    if (!trans_id || !user_id || !status) {
      console.warn('⚠️ Postback recibido con parámetros faltantes:', req.query);
      return res.status(400).json({ 
        error: 'Missing required parameters',
        received: Object.keys(req.query) 
      });
    }

    // Validar secure_hash para prevenir postbacks fraudulentos
    if (!validateSecureHash(secure_hash, trans_id)) {
      console.error('❌ secure_hash inválido para trans_id:', trans_id);
      return res.status(403).json({ error: 'Invalid secure hash' });
    }

    // Log de la transacción (en producción, guardar en base de datos)
    console.log('✅ CPX Research Postback válido recibido:', {
      status,
      trans_id,
      user_id,
      amount_usd,
      offer_ID,
      timestamp: new Date().toISOString()
    });

    // Procesar según el estado
    switch (status) {
      case '1': // Transacción completada
        console.log(`✅ Transacción ${trans_id} completada para usuario ${user_id}: $${amount_usd}`);
        try {
          const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `https://${req.headers.host}`;
          await fetch(`${baseUrl}/api/record-survey`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-internal-token': process.env.INTERNAL_RECORD_TOKEN || '' },
            body: JSON.stringify({ user_id, platform: 'cpx', amount: amount_usd, tx_id: trans_id, status: 'completed' })
          });
        } catch (kvErr) {
          console.error('KV record failed (cpx completed):', kvErr.message);
        }
        break;

      case '2': // Transacción revertida (fraude detectado por CPX)
        console.log(`❌ Transacción ${trans_id} revertida para usuario ${user_id}`);
        try {
          const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `https://${req.headers.host}`;
          await fetch(`${baseUrl}/api/record-survey`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-internal-token': process.env.INTERNAL_RECORD_TOKEN || '' },
            body: JSON.stringify({ user_id, platform: 'cpx', amount: amount_usd, tx_id: trans_id, status: 'reversed' })
          });
        } catch (kvErr) {
          console.error('KV record failed (cpx reversed):', kvErr.message);
        }
        break;

      case '3': // Transacción pendiente (CPX status code for pending)
        console.log(`⏳ Transacción ${trans_id} pendiente para usuario ${user_id}`);
        try {
          const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `https://${req.headers.host}`;
          await fetch(`${baseUrl}/api/record-survey`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-internal-token': process.env.INTERNAL_RECORD_TOKEN || '' },
            body: JSON.stringify({ user_id, platform: 'cpx', amount: amount_usd, tx_id: trans_id, status: 'pending' })
          });
        } catch (kvErr) {
          console.error('KV record failed (cpx pending):', kvErr.message);
        }
        break;

      default:
        console.warn(`⚠️ Estado desconocido recibido: ${status} para trans_id: ${trans_id}`);
    }

    // CPX Research espera un 200 OK con el texto "1" o un JSON de éxito
    return res.status(200).json({ 
      success: true,
      message: 'Postback processed successfully',
      trans_id,
      user_id,
      status
    });

  } catch (error) {
    console.error('Error procesando postback de CPX Research:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
