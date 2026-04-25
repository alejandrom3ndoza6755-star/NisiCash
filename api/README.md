# 🔌 API de Postback para CPX Research

## Endpoint disponible

### POST/GET `/api/cpx-postback`

Recibe notificaciones de CPX Research cuando un usuario completa una encuesta.

## URL para CPX Research

Usa esta URL en la configuración de CPX Research:

```
https://TU-PROYECTO.vercel.app/api/cpx-postback?status={status}&trans_id={trans_id}&user_id={user_id}&sub_id={subid}&sub_id_2={subid_2}&amount_local={amount_local}&amount_usd={amount_usd}&offer_id={offer_ID}&hash={secure_hash}&ip_click={ip_click}
```

**Reemplaza `TU-PROYECTO` con el nombre de tu proyecto en Vercel.**

## Parámetros

| Parámetro | Descripción | Ejemplo |
|-----------|-------------|---------|
| `status` | Estado de la transacción (1=completada, 2=revertida) | `1` |
| `trans_id` | ID único de la transacción | `CPX123456` |
| `user_id` | ID del usuario en tu sistema | `USER001` |
| `subid` | Sub ID 1 (opcional) | `campaign1` |
| `subid_2` | Sub ID 2 (opcional) | `source2` |
| `amount_local` | Cantidad en moneda local | `1.50` |
| `amount_usd` | Cantidad en USD | `1.50` |
| `offer_ID` | ID de la oferta completada | `OFFER789` |
| `secure_hash` | Hash de seguridad | `abc123...` |
| `ip_click` | IP del usuario | `192.168.1.1` |

## Ejemplo de prueba

Prueba tu endpoint manualmente:

```bash
curl "https://TU-PROYECTO.vercel.app/api/cpx-postback?status=1&trans_id=TEST123&user_id=USER001&amount_usd=1.50"
```

Respuesta esperada:

```json
{
  "success": true,
  "message": "Postback processed successfully",
  "trans_id": "TEST123",
  "user_id": "USER001",
  "status": "1"
}
```

## Ver logs

Para ver los postbacks que llegan:

1. Ve a tu proyecto en Vercel
2. Haz clic en **"Logs"** en el menú superior
3. Verás cada solicitud que llegue al endpoint

## Sitio web principal

El sitio web principal está alojado en GitHub Pages:
https://alejandrom3ndoza6755-star.github.io/NisiCash/
