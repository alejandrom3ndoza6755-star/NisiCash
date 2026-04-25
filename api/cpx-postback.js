// API endpoint para recibir postbacks de CPX Research
// Desplegado en Vercel como función serverless

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

    // Log de la transacción (en producción, guardarías esto en una base de datos)
    console.log('CPX Research Postback recibido:', {
      status,
      trans_id,
      user_id,
      amount_usd,
      timestamp: new Date().toISOString()
    });

    // Validar que los parámetros requeridos estén presentes
    if (!trans_id || !user_id || !status) {
      return res.status(400).json({ 
        error: 'Missing required parameters',
        received: req.query 
      });
    }

    // TODO: Aquí deberías validar el secure_hash para seguridad
    // const isValid = validateSecureHash(secure_hash, trans_id, user_id);
    // if (!isValid) {
    //   return res.status(403).json({ error: 'Invalid secure hash' });
    // }

    // Procesar según el estado
    switch(status) {
      case '1': // Transacción pendiente/completada
        console.log(`✅ Transacción ${trans_id} completada para usuario ${user_id}: $${amount_usd}`);
        // TODO: Acreditar puntos/dinero al usuario en tu base de datos
        break;
        
      case '2': // Transacción revertida (fraude detectado)
        console.log(`❌ Transacción ${trans_id} revertida para usuario ${user_id}`);
        // TODO: Revertir puntos/dinero del usuario en tu base de datos
        break;
        
      default:
        console.log(`⚠️ Estado desconocido: ${status}`);
    }

    // Responder con éxito (CPX Research espera un 200 OK)
    return res.status(200).json({ 
      success: true,
      message: 'Postback processed successfully',
      trans_id,
      user_id,
      status
    });

  } catch (error) {
    console.error('Error procesando postback:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
