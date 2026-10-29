# Setup Upstash Redis para NisiCash

La base de datos ya fue creada: **upstash-kv-red-ocean** (Upstash ID: a3d819fd-ff32-48c5-9577-fedb4f7c14db)

## Paso 1: Conectar al proyecto en Vercel

1. Ve a [vercel.com](https://vercel.com) → tu proyecto NisiCash → pestaña **Storage**
2. Deberías ver `upstash-kv-red-ocean` listada. Si no aparece conectada al proyecto, haz clic en **Connect to Project** y selecciona `nisi-cash`.
3. Esto agrega automáticamente estas variables de entorno al deployment:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`
   - `KV_URL`
   - `REDIS_URL`

> `@upstash/redis` usa `KV_REST_API_URL` y `KV_REST_API_TOKEN` via `Redis.fromEnv()`. Vercel las inyecta automáticamente en tiempo de ejecución — no necesitas configurarlas manualmente.

## Paso 2: Jalar variables localmente

```bash
vercel link       # vincula el proyecto local con Vercel (solo la primera vez)
vercel env pull .env.development.local
```

Esto crea `.env.development.local` con los valores reales de las variables.

## Paso 3: Instalar dependencias

```bash
npm install
```

Instala `@upstash/redis` que es el cliente usado en las APIs.

## Paso 4: Configurar INTERNAL_RECORD_TOKEN (OBLIGATORIO en producción)

Este token protege `/api/record-survey` para que solo los postbacks del servidor puedan escribir ganancias. Sin él, cualquiera podría acreditar dinero a cualquier usuario.

1. Genera un secreto aleatorio:
   ```bash
   openssl rand -hex 32
   ```
2. Agrégalo en Vercel:
   ```bash
   vercel env add INTERNAL_RECORD_TOKEN
   ```
   Pega el valor cuando lo pida. Selecciona los 3 entornos: **Production**, **Preview**, **Development**.

3. Jala las variables nuevamente para tenerlo local:
   ```bash
   vercel env pull .env.development.local
   ```

## Paso 5: Probar localmente

```bash
vercel dev
```

Prueba el endpoint:
```
http://localhost:3000/api/user-stats?user_id=USER_test123
```

Deberías ver:
```json
{
  "user_id": "USER_test123",
  "surveys_completed": 0,
  "total_earned": 0,
  "pending_earned": 0,
  "last_seen": null,
  "created_at": null,
  "history": []
}
```

## Paso 6: Desplegar a producción

```bash
vercel --prod
```

---

## Estructura de datos

Cada usuario se guarda con la key `user:{user_id}`. Se mantienen las últimas **100 transacciones** por usuario en el array `history` (las más antiguas se eliminan al superar el límite).

```json
{
  "user_id": "USER_1234567890_abc123",
  "surveys_completed": 12,
  "total_earned": 8.75,
  "pending_earned": 1.50,
  "last_seen": "2026-10-26T14:30:00Z",
  "created_at": "2026-10-01T10:00:00Z",
  "history": [
    { "date": "2026-10-26T14:00:00Z", "platform": "cpx", "amount": 0.75, "tx_id": "TX123", "status": "completed" }
  ]
}
```

## Capacidad estimada (plan Free de Upstash)

- 256 MB de almacenamiento
- ~4 KB por usuario con 100 transacciones
- Capacidad: ~60,000 usuarios activos
- Requests: 10,000/día en plan Free (suficiente para comenzar)
