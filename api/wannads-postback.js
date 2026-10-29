// API endpoint para recibir postbacks de Wannads
// Desplegado en Vercel como función serverless

export default async function handler(req, res) {
  // Wannads usa GET para postbacks
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extraer parámetros de Wannads
    const {
      user_id,       // ID del usuario
      transaction_id, // ID de transacción
      amount,        // Cantidad en USD
      currency,      // Moneda (USD)
      status,        // Estado (completed, pending, reversed)
      offer_id,      // ID de la oferta
      offer_name,    // Nombre de la oferta
      payout,        // Tu ganancia
      hash,          // Hash de seguridad
      ip,            // IP del usuario
      timestamp      // Timestamp
    } = req.query;

    // Log de la transacción
    console.log('Wannads Postback recibido:', {
      user_id,
      transaction_id,
      amount,
      payout,
      status,
      timestamp: new Date().toISOString()
    });

    // Validar parámetros requeridos
    if (!transaction_id || !user_id || !amount) {
      return res.status(400).json({ 
        error: 'Missing required parameters',
        received: req.query 
      });
    }

    // TODO: Validar hash para seguridad
    // const isValid = validateWannadsHash(hash, transaction_id, user_id, amount);
    // if (!isValid) {
    //   return res.status(403).json({ error: 'Invalid hash' });
    // }

    // Procesar según el estado
    switch(status) {
      case 'completed':
        console.log(`✅ Transacción completada: ${transaction_id} para usuario ${user_id}: $${amount} (tu ganancia: $${payout})`);
        if (offer_name) {
          console.log(`   Oferta: ${offer_name}`);
        }
        try {
          const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `https://${req.headers.host || 'localhost:3000'}`;
          await fetch(`${baseUrl}/api/record-survey`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-internal-token': process.env.INTERNAL_RECORD_TOKEN || '' },
            body: JSON.stringify({ user_id, platform: 'wannads', amount: payout || amount, tx_id: transaction_id, status: 'completed' })
          });
        } catch (kvErr) {
          console.error('KV record failed (wannads completed):', kvErr.message);
        }
        break;
        
      case 'pending':
        console.log(`⏳ Transacción pendiente: ${transaction_id} para usuario ${user_id}`);
        try {
          const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `https://${req.headers.host || 'localhost:3000'}`;
          await fetch(`${baseUrl}/api/record-survey`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-internal-token': process.env.INTERNAL_RECORD_TOKEN || '' },
            body: JSON.stringify({ user_id, platform: 'wannads', amount: payout || amount, tx_id: transaction_id, status: 'pending' })
          });
        } catch (kvErr) {
          console.error('KV record failed (wannads pending):', kvErr.message);
        }
        break;
        
      case 'reversed':
      case 'rejected':
        console.log(`❌ Transacción revertida: ${transaction_id} para usuario ${user_id}`);
        try {
          const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `https://${req.headers.host || 'localhost:3000'}`;
          await fetch(`${baseUrl}/api/record-survey`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-internal-token': process.env.INTERNAL_RECORD_TOKEN || '' },
            body: JSON.stringify({ user_id, platform: 'wannads', amount: payout || amount, tx_id: transaction_id, status: 'reversed' })
          });
        } catch (kvErr) {
          console.error('KV record failed (wannads reversed):', kvErr.message);
        }
        break;
        
      default:
        console.log(`⚠️ Estado desconocido: ${status}`);
    }

    // Responder con éxito (Wannads espera un 200 OK)
    return res.status(200).send('OK');

  } catch (error) {
    console.error('Error procesando postback de Wannads:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}

// Función para validar el hash de Wannads (implementar según su documentación)
function validateWannadsHash(hash, transactionId, userId, amount, secretKey) {
  // TODO: Implementar validación según documentación de Wannads
  // Típicamente es un hash MD5 o SHA256 de los parámetros + secret key
  return true; // Por ahora aceptar todas
}
