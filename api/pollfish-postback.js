// API endpoint para recibir postbacks de Pollfish
// Desplegado en Vercel como función serverless

export default async function handler(req, res) {
  // Pollfish usa GET para postbacks
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extraer parámetros de Pollfish
    const {
      cpa,           // Cantidad ganada en USD
      tx_id,         // ID único de transacción
      user_id,       // ID del usuario
      timestamp,     // Timestamp de la transacción
      signature,     // Firma de seguridad
      reason,        // Razón (completed, rejected, etc.)
      term_reason,   // Razón de terminación si aplica
      debug          // Modo debug
    } = req.query;

    // Log de la transacción
    console.log('Pollfish Postback recibido:', {
      cpa,
      tx_id,
      user_id,
      reason,
      timestamp: new Date().toISOString()
    });

    // Si es debug, ignorar
    if (debug === 'true') {
      console.log('⚠️ Debug mode - Ignorando transacción de prueba');
      return res.status(200).send('OK - Debug mode');
    }

    // Validar parámetros requeridos
    if (!tx_id || !user_id || !cpa) {
      return res.status(400).json({ 
        error: 'Missing required parameters',
        received: req.query 
      });
    }

    // TODO: Validar signature para seguridad
    // const isValid = validatePollfishSignature(signature, tx_id, user_id, cpa);
    // if (!isValid) {
    //   return res.status(403).json({ error: 'Invalid signature' });
    // }

    // Procesar según la razón
    switch(reason) {
      case 'completed':
        console.log(`✅ Encuesta completada: tx_id ${tx_id} para usuario ${user_id}: $${cpa}`);
        // TODO: Acreditar puntos/dinero al usuario en tu base de datos
        break;
        
      case 'rejected':
      case 'terminated':
        console.log(`❌ Encuesta rechazada/terminada: tx_id ${tx_id} para usuario ${user_id}`);
        console.log(`   Razón: ${term_reason || 'No especificada'}`);
        // TODO: No acreditar o revertir si ya se acreditó
        break;
        
      default:
        console.log(`⚠️ Razón desconocida: ${reason}`);
    }

    // Responder con éxito (Pollfish espera un 200 OK)
    return res.status(200).send('OK');

  } catch (error) {
    console.error('Error procesando postback de Pollfish:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}

// Función para validar la firma de Pollfish (implementar según su documentación)
function validatePollfishSignature(signature, txId, userId, cpa, secretKey) {
  // TODO: Implementar validación según documentación de Pollfish
  // Típicamente es un hash SHA256 o MD5 de los parámetros + secret key
  return true; // Por ahora aceptar todas
}
