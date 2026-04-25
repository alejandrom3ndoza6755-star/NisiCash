# 🚀 Cómo Desplegar el Backend en Vercel

## Paso 1: Crear cuenta en Vercel (GRATIS)

1. Ve a: https://vercel.com/signup
2. Regístrate con tu cuenta de GitHub
3. Autoriza a Vercel para acceder a tus repositorios

## Paso 2: Subir los archivos a GitHub

Los archivos ya están listos en tu proyecto:
- `api/cpx-postback.js` - Endpoint para recibir postbacks
- `vercel.json` - Configuración de Vercel
- `package.json` - Dependencias del proyecto

Sube estos archivos a tu repositorio:

```bash
git add api/ vercel.json package.json INSTRUCCIONES_VERCEL.md
git commit -m "Add Vercel backend for CPX Research postback"
git push origin main
```

## Paso 3: Importar proyecto en Vercel

1. Ve a: https://vercel.com/new
2. Haz clic en **"Import Git Repository"**
3. Selecciona tu repositorio: `alejandrom3ndoza6755-star/NisiCash`
4. Haz clic en **"Import"**
5. Vercel detectará automáticamente la configuración
6. Haz clic en **"Deploy"**

## Paso 4: Obtener tu URL de Postback

Una vez desplegado, Vercel te dará una URL como:
```
https://nisi-cash-XXXXX.vercel.app
```

Tu URL de postback para CPX Research será:
```
https://nisi-cash-XXXXX.vercel.app/api/cpx-postback?status={status}&trans_id={trans_id}&user_id={user_id}&sub_id={subid}&sub_id_2={subid_2}&amount_local={amount_local}&amount_usd={amount_usd}&offer_id={offer_ID}&hash={secure_hash}&ip_click={ip_click}
```

## Paso 5: Configurar en CPX Research

1. Ve al panel de CPX Research
2. Pega la URL completa en el campo "URL de postback"
3. Guarda la configuración
4. CPX Research verificará que la URL responda correctamente

## 🔍 Verificar que funciona

Puedes probar tu endpoint manualmente visitando:
```
https://tu-proyecto.vercel.app/api/cpx-postback?status=1&trans_id=TEST123&user_id=USER001&amount_usd=1.50
```

Deberías ver una respuesta JSON como:
```json
{
  "success": true,
  "message": "Postback processed successfully",
  "trans_id": "TEST123",
  "user_id": "USER001",
  "status": "1"
}
```

## 📊 Ver los logs

Para ver los postbacks que llegan:
1. Ve a tu proyecto en Vercel
2. Haz clic en la pestaña **"Logs"**
3. Verás cada postback que CPX Research envíe

## 🔐 Próximos pasos (Opcional pero recomendado)

### Agregar validación de secure_hash

Edita `api/cpx-postback.js` y agrega validación del hash para mayor seguridad:

```javascript
import crypto from 'crypto';

function validateSecureHash(receivedHash, transId, userId, secretKey) {
  const expectedHash = crypto
    .createHash('sha256')
    .update(`${transId}${userId}${secretKey}`)
    .digest('hex');
  return receivedHash === expectedHash;
}
```

### Conectar con una base de datos

Para guardar las transacciones, puedes usar:
- **Vercel KV** (Redis gratis)
- **MongoDB Atlas** (gratis hasta 512MB)
- **Supabase** (PostgreSQL gratis)

## ⚠️ Importante

- El plan gratuito de Vercel incluye:
  - 100 GB de ancho de banda/mes
  - Funciones serverless ilimitadas
  - SSL automático
  - Suficiente para miles de postbacks al mes

## 🆘 Problemas comunes

**Error: "Tu URL de postback es incorrecta"**
- Verifica que la URL esté completa con todos los parámetros
- Asegúrate de que el endpoint responda con status 200
- Prueba la URL manualmente en tu navegador

**No llegan postbacks**
- Verifica los logs en Vercel
- Asegúrate de que CPX Research tenga la URL correcta
- Verifica que tu endpoint esté desplegado y activo

## 📞 Soporte

Si tienes problemas, revisa:
- Documentación de Vercel: https://vercel.com/docs
- Documentación de CPX Research: https://cpx-research.com/docs
