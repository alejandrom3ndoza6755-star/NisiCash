# 📋 Instrucciones para Configurar Pollfish y Wannads

## ✅ Cambios Implementados

He agregado la integración completa de **Pollfish** y **Wannads** a tu sitio web NisiCash. Ambas plataformas ofrecen **pagos en 7 días**, que es mucho más rápido que CPX Research (30+ días).

### Archivos Modificados:
- ✅ `index.html` - Agregadas 2 nuevas tarjetas de offerwall (Pollfish y Wannads)
- ✅ `script.js` - Agregadas funciones de inicialización para ambas plataformas
- ✅ `api/pollfish-postback.js` - Endpoint para recibir notificaciones de Pollfish
- ✅ `api/wannads-postback.js` - Endpoint para recibir notificaciones de Wannads
- ✅ Cambios subidos a GitHub y desplegados

---

## 🚀 Pasos para Activar Pollfish

### 1. Registro en Pollfish
1. Ve a: **https://www.pollfish.com/publisher**
2. Haz clic en "Sign Up" o "Get Started"
3. Completa el formulario de registro:
   - Nombre completo
   - Email: `alejandrom3ndoza6755@gmail.com`
   - Contraseña segura
   - Tipo de cuenta: **Publisher/Developer**

### 2. Crear Aplicación Web
1. Una vez dentro del dashboard, busca "Add New App" o "Create Application"
2. Selecciona **"Web"** como plataforma
3. Completa la información:
   - **Nombre de la app**: NisiCash
   - **URL del sitio**: `https://alejandrom3ndoza6755-star.github.io/NisiCash/`
   - **Descripción**: Plataforma de encuestas pagadas para usuarios de Latinoamérica
   - **Categoría**: Rewards/Survey Platform

### 3. Obtener Credenciales
Después de crear la aplicación, Pollfish te dará:
- **API Key** (algo como: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)
- **Publisher ID** (número único)

### 4. Configurar Postback URL
En el dashboard de Pollfish:
1. Ve a la sección de **"Postback Settings"** o **"Webhooks"**
2. Agrega esta URL de postback:
   ```
   https://nisi-cash.vercel.app/api/pollfish-postback?cpa={cpa}&tx_id={tx_id}&user_id={user_id}&timestamp={timestamp}&signature={signature}&reason={reason}
   ```
3. Guarda los cambios

### 5. Agregar Credenciales al Código
Abre el archivo `script.js` y busca esta sección (línea ~20):

```javascript
const POLLFISH_CONFIG = {
    apiKey: 'YOUR_POLLFISH_API_KEY', // ← Reemplaza con tu API Key
    publisherId: 'YOUR_PUBLISHER_ID' // ← Reemplaza con tu Publisher ID
};
```

Reemplaza con tus credenciales reales:
```javascript
const POLLFISH_CONFIG = {
    apiKey: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', // Tu API Key real
    publisherId: '12345' // Tu Publisher ID real
};
```

### 6. Subir Cambios
```bash
git add script.js
git commit -m "Configurar credenciales de Pollfish"
git push origin main
```

---

## 🌎 Pasos para Activar Wannads

### 1. Registro en Wannads
1. Ve a: **https://wannads.com/publishers**
2. Haz clic en "Sign Up" o "Register"
3. Completa el formulario:
   - Nombre completo
   - Email: `alejandrom3ndoza6755@gmail.com`
   - País: **El Salvador**
   - Tipo de cuenta: **Publisher**

### 2. Crear Aplicación/Sitio Web
1. En el dashboard, busca "Add Website" o "Create App"
2. Completa la información:
   - **Nombre**: NisiCash
   - **URL**: `https://alejandrom3ndoza6755-star.github.io/NisiCash/`
   - **Tipo**: Website
   - **Categoría**: Rewards/Surveys
   - **Descripción**: Plataforma de encuestas pagadas especializada en América Latina
   - **Tráfico mensual estimado**: 1,000-5,000 usuarios (puedes ajustar)

### 3. Obtener Credenciales
Wannads te proporcionará:
- **Publisher ID** (número único, ej: `12345`)
- **API Key** (cadena alfanumérica)

### 4. Configurar Postback URL
En el dashboard de Wannads:
1. Ve a **"Postback Settings"** o **"Integration"**
2. Agrega esta URL:
   ```
   https://nisi-cash.vercel.app/api/wannads-postback?user_id={user_id}&transaction_id={transaction_id}&amount={amount}&status={status}&offer_id={offer_id}&payout={payout}&hash={hash}
   ```
3. Guarda los cambios

### 5. Agregar Credenciales al Código
Abre `script.js` y busca (línea ~30):

```javascript
const WANNADS_CONFIG = {
    publisherId: 'YOUR_WANNADS_PUBLISHER_ID', // ← Reemplaza aquí
    apiKey: 'YOUR_WANNADS_API_KEY' // ← Reemplaza aquí
};
```

Reemplaza con tus credenciales:
```javascript
const WANNADS_CONFIG = {
    publisherId: '12345', // Tu Publisher ID real
    apiKey: 'abc123def456ghi789' // Tu API Key real
};
```

### 6. Subir Cambios
```bash
git add script.js
git commit -m "Configurar credenciales de Wannads"
git push origin main
```

---

## 📊 Comparación de Plataformas

| Plataforma | Pago Mínimo | Tiempo de Pago | Mejor Para | Estado |
|------------|-------------|----------------|------------|--------|
| **CPX Research** | $25 USD | 30+ días | Global | ✅ Activo |
| **Theorem Reach** | $5 USD | 3-5 días | USA/Europa | ⏳ Rechazado |
| **Pollfish** | $30 USD | **7 días** | LATAM | 🔧 Pendiente configuración |
| **Wannads** | $20 USD | **7 días** | LATAM | 🔧 Pendiente configuración |
| **Monlix** | $5 USD | 3-5 días | Global | ⏳ Esperando aprobación |

---

## 💡 Ventajas de Pollfish y Wannads

### Pollfish:
- ✅ **Pagos en 7 días** (mucho más rápido que CPX)
- ✅ Excelente para usuarios de Latinoamérica
- ✅ Encuestas cortas (3-5 minutos)
- ✅ Buena tasa de conversión
- ✅ Pago por PayPal o transferencia bancaria

### Wannads:
- ✅ **Especializado en América Latina**
- ✅ Pagos en 7 días
- ✅ Pago mínimo más bajo ($20 vs $30 de Pollfish)
- ✅ Encuestas localizadas para El Salvador
- ✅ Soporte en español

---

## 🔍 Verificación

Una vez que configures las credenciales:

1. **Abre tu sitio**: https://alejandrom3ndoza6755-star.github.io/NisiCash/
2. **Desplázate hacia abajo** hasta ver las nuevas tarjetas de Pollfish y Wannads
3. **Si NO configuraste las credenciales**, verás un mensaje amarillo con instrucciones
4. **Si SÍ configuraste las credenciales**, verás los offerwalls cargando

---

## ⚠️ Notas Importantes

1. **Aprobación**: Ambas plataformas pueden requerir aprobación manual (1-3 días)
2. **Tráfico**: Necesitas tráfico real para que aprueben tu sitio
3. **Postback**: Los endpoints ya están listos en Vercel, solo configura las URLs
4. **Testing**: Usa una VPN para probar si aparecen encuestas (cambia ubicación a USA)

---

## 📧 Contacto de Soporte

Si tienes problemas durante el registro:

**Pollfish Support:**
- Email: support@pollfish.com
- Documentación: https://www.pollfish.com/docs

**Wannads Support:**
- Email: publishers@wannads.com
- Documentación: https://wannads.com/docs

---

## 🎯 Próximos Pasos

1. ✅ **Registrarte en Pollfish** (5-10 minutos)
2. ✅ **Registrarte en Wannads** (5-10 minutos)
3. ✅ **Obtener credenciales** de ambas plataformas
4. ✅ **Configurar postback URLs** en ambos dashboards
5. ✅ **Agregar credenciales** en `script.js`
6. ✅ **Subir cambios** a GitHub
7. ⏳ **Esperar aprobación** (1-3 días)
8. 🎉 **¡Empezar a ganar!**

---

## 💰 Estimación de Ingresos

Con 4 offerwalls activos (CPX, Pollfish, Wannads, Monlix):

- **10 usuarios/día completando 2 encuestas** = ~$20-40/día
- **50 usuarios/día completando 2 encuestas** = ~$100-200/día
- **100 usuarios/día completando 2 encuestas** = ~$200-400/día

**Ventaja de tener múltiples offerwalls:**
- Más opciones de encuestas para los usuarios
- Diversificación de ingresos
- Pagos más rápidos (7 días vs 30+ días)
- Mejor experiencia de usuario

---

¿Necesitas ayuda con el registro o tienes alguna pregunta? ¡Avísame!
