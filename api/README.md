# 🔌 API de Postback para Offerwalls

## Endpoints disponibles

### 1. CPX Research: `/api/cpx-postback`

Recibe notificaciones de CPX Research cuando un usuario completa una encuesta.

**URL para CPX Research:**
```
https://nisi-cash.vercel.app/api/cpx-postback?status={status}&trans_id={trans_id}&user_id={user_id}&sub_id={subid}&sub_id_2={subid_2}&amount_local={amount_local}&amount_usd={amount_usd}&offer_id={offer_ID}&hash={secure_hash}&ip_click={ip_click}
```

### 2. Theorem Reach: `/api/theorem-postback`

Recibe notificaciones de Theorem Reach cuando un usuario completa una encuesta.

**URL para Theorem Reach:**
```
https://nisi-cash.vercel.app/api/theorem-postback?reward={reward}&currency={currency}&user_id={user_id}&tx_id={tx_id}&hash={hash}&reversion={reversion}&debug={debug}
```

## Parámetros de Theorem Reach

| Parámetro | Descripción | Ejemplo |
|-----------|-------------|---------|
| `reward` | Cantidad de puntos/moneda virtual | `100` |
| `currency` | Cantidad en USD | `1.50` |
| `user_id` | ID del usuario en tu sistema | `USER001` |
| `tx_id` | ID único de la transacción | `TR123456` |
| `hash` | Hash HMAC SHA-1 de seguridad | `abc123...` |
| `reversion` | true si es una reversión | `true/false` |
| `debug` | true si es una prueba | `true/false` |

## Ejemplo de prueba Theorem Reach

```bash
curl "https://nisi-cash.vercel.app/api/theorem-postback?reward=100&currency=1.50&user_id=USER001&tx_id=TEST123&hash=test&debug=true"
```

## Ver logs

Para ver los postbacks que llegan:
1. Ve a tu proyecto en Vercel
2. Haz clic en **"Logs"**
3. Verás cada solicitud que llegue a los endpoints

## Sitio web principal

https://alejandrom3ndoza6755-star.github.io/NisiCash/
