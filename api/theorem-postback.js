// API endpoint para recibir postbacks de Theorem Reach
// Desplegado en Vercel como función serverless

import crypto from 'crypto';

export default async function handler(req, res) {
  // Solo aceptar solicitudes GET (Theorem Reach usa GET)
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extraer parámetros de Theorem Reach
    const {
      reward,
      currency,
      user_id,
      tx_id,
      hash,
      reversion,
      debug,
      transaction_id,
      screenout,
      profiler,
      offer,
      offer_name,
      ip,
      offer_id,
      placement_id,
      partner_id,
      router,
      total_payout
    } = req.query;

    // Log de la transacción
    console.log('Theorem Reach Postback recibido:', {
      reward,
      currency,
      user_id,
      tx_id,
      reversion: reversion === 'true',
      debug: debug === 'true',
      timestamp: new Date().toISOString()
    });

    // Si es debug, ignorar (solo para pruebas)
    if (debug === 'true') {
      console.log('⚠️ Debug mode - Ignorando transacción de prueba');
      return res.status(200).send('OK - Debug mode');
    }

    // Validar parámetros requeridos
    if (!reward || !user_id || !tx_id || !hash) {
      return res.status(400).json({ 
        error: 'Missing required parameters',
        received: req.query 
      });
    }

    // TODO: Validar el hash para seguridad
    // const isValid = validateTheoremHash(hash, req.url);
    // if (!isValid) {
    //   return res.status(403).json({ error: 'Invalid hash' });
    // }

    // Procesar según el tipo de transacción
    if (reversion === 'true') {
      // Transacción revertida (fraude detectado)
      console.log(`❌ Reversión: tx_id ${tx_id} para usuario ${user_id}: -$${currency}`);
      // TODO: Revertir puntos/dinero del usuario en tu base de datos
    } else {
      // Transacción completada
      console.log(`✅ Recompensa: tx_id ${tx_id} para usuario ${user_id}: $${currency} (${reward} puntos)`);
      
      // Información adicional
      if (screenout === '1') {
        console.log('   ℹ️ Usuario fue excluido (screenout) - recompensa parcial');
      }
      if (profiler === '1') {
        console.log('   ℹ️ Usuario completó el perfilador');
      }
      if (offer === 'true') {
        console.log(`   ℹ️ Oferta completada: ${offer_name || 'N/A'}`);
      }
      
      // TODO: Acreditar puntos/dinero al usuario en tu base de datos
    }

    // Responder con éxito (Theorem Reach espera un 200 OK)
    return res.status(200).send('OK');

  } catch (error) {
    console.error('Error procesando postback de Theorem Reach:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}

// Función para validar el hash HMAC SHA-1 de Theorem Reach
function validateTheoremHash(receivedHash, fullUrl, secretKey) {
  try {
    // Extraer la URL base sin el parámetro hash
    const urlWithoutHash = fullUrl.split('&hash=')[0];
    
    // Crear HMAC SHA-1
    const hmac = crypto.createHmac('sha1', secretKey);
    hmac.update(urlWithoutHash);
    
    // Obtener hash en base64
    const signature = hmac.digest('base64');
    
    // Codificar según especificación de Theorem Reach
    const encodedHash = signature
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    
    return encodedHash === receivedHash;
  } catch (error) {
    console.error('Error validando hash:', error);
    return false;
  }
}
