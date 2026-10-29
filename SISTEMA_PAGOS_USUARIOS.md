# 💰 Sistema de Pagos y Gestión de Usuarios - NisiCash

## 📊 Cómo Funciona el Sistema Actual

### 1. **Tracking de Usuarios**

Cuando un usuario completa una encuesta en CPX Research, Pollfish o WannAds:

```javascript
Usuario completa encuesta de $1.00
       ↓
Offerwall envía postback a tu API
       ↓
API verifica datos y guarda en Vercel KV
       ↓
Dashboard del usuario se actualiza automáticamente
```

### 2. **Conversión de Puntos a Dólares**

**CPX Research, Pollfish, Wannads ya envían el monto en USD directamente.**

Por ejemplo:
- Usuario completa encuesta de 100 puntos = $1.00
- Usuario completa encuesta de 50 puntos = $0.50

**El dashboard muestra el monto EXACTO que el offerwall reportó.**

---

## 👥 Ver Usuarios y sus Datos

### Panel de Administración

He creado `admin.html` - tu panel de administración.

**Para acceder:**
```
https://nisi-cash.vercel.app/admin.html
```

**Qué puedes ver:**
- ✅ Lista de todos los usuarios
- ✅ Encuestas completadas por cada usuario
- ✅ Dinero ganado (verificado)
- ✅ Dinero pendiente de verificación
- ✅ Compartidos en redes sociales
- ✅ Última actividad
- ✅ Estadísticas globales

### API de Admin

**Endpoint:** `GET /api/admin-get-users`

**Headers requeridos:**
```
Authorization: Bearer nisicash_admin_2026
```

**Respuesta:**
```json
{
  "success": true,
  "users": [
    {
      "user_id": "user_abc123",
      "surveys_completed": 5,
      "total_earned": 7.50,
      "pending_earned": 2.00,
      "last_seen": "2026-04-30T10:00:00Z",
      "history": [...]
    }
  ],
  "stats": {
    "totalUsers": 150,
    "totalSurveys": 800,
    "totalEarned": 1250.00,
    "totalPending": 180.00
  }
}
```

### Usar el Panel Admin

1. **Abre:** https://nisi-cash.vercel.app/admin.html
2. **Ver usuarios:** Pestaña "Usuarios"
3. **Ver solicitudes de pago:** Pestaña "Solicitudes de Pago"
4. **Ver referidos:** Pestaña "Sistema de Referidos"

---

## 💸 Sistema de Pagos/Retiros

### Estado Actual

**Mínimos de retiro actualizados:**
- 💵 PayPal: **$15 USD**
- 🎁 Amazon Gift Cards: **$15 USD**
- 🎮 Gift Cards (Google Play, Steam, etc.): **$15 USD**
- 🏦 Transferencia Bancaria: **$50-$100 USD**

### Cómo Funcionará el Sistema de Retiros

#### Paso 1: Usuario Solicita Retiro

Cuando un usuario alcance $15+, verá un botón en su dashboard:

```
┌─────────────────────────────────┐
│  💰 Ganancias: $17.50           │
│  ✅ ¡Puedes retirar!             │
│                                 │
│  [ Solicitar Retiro ]           │
└─────────────────────────────────┘
```

#### Paso 2: Usuario Elige Método

```
Método de Pago:
○ PayPal (alejandro@email.com)
○ Amazon Gift Card (a mi email)
○ Google Play Gift Card
```

#### Paso 3: Tu Recibes Notificación

Te llegará un email o verás en el panel de admin:

```
🔔 Nueva Solicitud de Retiro

Usuario: user_abc123
Monto: $17.50
Método: PayPal
Email: user@example.com
Fecha: 30 Abr 2026
```

#### Paso 4: Tú Procesas el Pago

**Opciones para pagar:**

##### Opción A: PayPal Manual
1. Ir a paypal.com
2. Enviar dinero a: user@example.com
3. Monto: $17.50
4. Nota: "NisiCash - Pago de encuestas"
5. En tu panel: Marcar como "Pagado"

##### Opción B: PayPal API (Automatizado)
```javascript
// En el futuro, puedes automatizar con PayPal Payouts API
// Esto requiere cuenta PayPal Business
```

##### Opción C: Amazon Gift Card
1. Comprar gift card de $15 en Amazon
2. Enviar código por email al usuario
3. Marcar como "Pagado"

#### Paso 5: Usuario Confirma

El usuario recibe:
- ✅ Email de confirmación
- ✅ Notificación en el sitio
- ✅ Su balance se reinicia

---

## 🔐 Sistema de Retiros (Implementación Futura)

### API Necesaria: `request-withdrawal.js`

```javascript
// POST /api/request-withdrawal
{
  user_id: "user_abc123",
  amount: 17.50,
  method: "paypal",
  payment_info: "user@example.com"
}

// Respuesta
{
  success: true,
  withdrawal_id: "wd_xyz789",
  status: "pending",
  estimated_date: "2026-05-02"
}
```

### Tabla de Retiros en Vercel KV

```javascript
Key: withdrawal:wd_xyz789

Data: {
  withdrawal_id: "wd_xyz789",
  user_id: "user_abc123",
  amount: 17.50,
  method: "paypal",
  payment_info: "user@example.com",
  status: "pending", // pending, processing, paid, cancelled
  request_date: "2026-04-30T10:00:00Z",
  paid_date: null,
  transaction_id: null,
  notes: ""
}
```

---

## 📱 Dashboard del Usuario - Progreso Real

### Cómo Funciona Actualmente

1. **Usuario completa encuesta**
   - Ejemplo: Encuesta de 100 puntos = $1.00 USD

2. **Offerwall envía postback**
   ```
   POST /api/cpx-postback
   {
     status: "1", // completada
     user_id: "user_abc123",
     amount_usd: "1.00",
     trans_id: "tx_123456"
   }
   ```

3. **Tu API guarda en Vercel KV**
   ```javascript
   user:user_abc123 = {
     surveys_completed: 1,
     total_earned: 1.00,
     pending_earned: 0,
     history: [{
       date: "2026-04-30",
       platform: "CPX Research",
       amount: 1.00,
       status: "completed"
     }]
   }
   ```

4. **Dashboard se actualiza automáticamente**
   ```
   ┌──────────────────────────────┐
   │ 📋 Encuestas: 1              │
   │ 💰 Ganado: $1.00             │
   │ ⏳ Pendiente: $0.00          │
   └──────────────────────────────┘
   ```

### Estados de las Transacciones

- **✅ Completed (Completada):** Dinero ya verificado por el offerwall
- **⏳ Pending (Pendiente):** Esperando verificación
- **❌ Reversed (Revertida):** Cancelada (usuario hizo fraude, etc.)

---

## 🎯 Flujo Completo de Usuario

```
Día 1: Usuario se registra
       └─→ ID único generado: user_abc123

Día 1: Usuario completa 3 encuestas
       ├─→ Encuesta 1: $0.50 ✅ Completada
       ├─→ Encuesta 2: $1.00 ⏳ Pendiente
       └─→ Encuesta 3: $0.75 ✅ Completada
       
       Dashboard muestra:
       💰 Ganado: $1.25
       ⏳ Pendiente: $1.00

Día 2: Encuesta 2 se verifica
       └─→ Pasa de "Pendiente" a "Completada"
       
       Dashboard actualiza:
       💰 Ganado: $2.25
       ⏳ Pendiente: $0.00

Día 2: Usuario comparte en redes sociales
       └─→ 3 compartidos = 3 entradas al sorteo

...

Día 30: Usuario alcanza $15.50
        └─→ Botón "Solicitar Retiro" aparece

Usuario solicita retiro de $15.00
        └─→ Tú recibes notificación

Tú procesas pago vía PayPal
        └─→ Marcas como "Pagado"

Usuario recibe pago
        └─→ Balance: $0.50 (restante)
```

---

## 🛠️ Implementación del Sistema de Retiros

### Fase 1: Manual (ACTUAL - Recomendado para empezar)

**Pros:**
- ✅ Sin código adicional necesario
- ✅ Control total
- ✅ Sin riesgo de automatización

**Proceso:**
1. Usuario te envía email solicitando retiro
2. Verificas en admin.html que tenga $15+
3. Envías pago manual vía PayPal/Amazon
4. Actualizas su balance en Vercel KV

### Fase 2: Semi-automatizado (Próximo paso)

**Agregar:**
- Botón de "Solicitar Retiro" en el sitio
- API que guarda solicitudes
- Panel admin para aprobar/rechazar
- Email automático de confirmación

**Archivos necesarios:**
```
api/request-withdrawal.js
api/process-withdrawal.js
api/update-withdrawal-status.js
```

### Fase 3: Totalmente Automatizado (Futuro)

**Agregar:**
- Integración con PayPal Payouts API
- Envío automático de gift cards
- Verificación de identidad
- Sistema anti-fraude

---

## 📧 Comunicación con Usuarios

### Email Templates

#### 1. Bienvenida
```
Asunto: ¡Bienvenido a NisiCash! 🎉

Hola,

¡Gracias por unirte a NisiCash!

Tu ID de usuario es: user_abc123

Empieza a ganar completando encuestas aquí:
https://nisi-cash.vercel.app/

Saludos,
El equipo de NisiCash
```

#### 2. Retiro Solicitado
```
Asunto: Solicitud de retiro recibida ✅

Hola,

Hemos recibido tu solicitud de retiro:
- Monto: $15.00
- Método: PayPal
- Tiempo estimado: 2-3 días hábiles

Te notificaremos cuando esté procesado.

Saludos,
El equipo de NisiCash
```

#### 3. Pago Enviado
```
Asunto: ¡Tu pago ha sido enviado! 💰

Hola,

Tu pago de $15.00 ha sido enviado a tu cuenta de PayPal.

Deberías recibirlo en las próximas 24 horas.

¡Gracias por ser parte de NisiCash!

Saludos,
El equipo de NisiCash
```

---

## 🔒 Seguridad y Prevención de Fraude

### Medidas Implementadas

1. **Validación de Postbacks**
   - Verifica hash de seguridad
   - Solo acepta de IPs autorizadas
   - Revisa duplicados por trans_id

2. **Tracking de Usuario**
   - Un user_id por navegador
   - Historial completo de transacciones
   - Detección de patrones sospechosos

3. **Límites de Retiro**
   - Mínimo: $15 USD
   - Frecuencia: 1 retiro por semana (opcional)
   - Verificación manual de montos grandes

### Banderas Rojas

🚩 Usuario con muchas encuestas en poco tiempo  
🚩 Usuario sin actividad pero con muchas ganancias  
🚩 Múltiples retiros desde el mismo PayPal  
🚩 Usuario que solo hace reversiones  

---

## 📊 Métricas a Monitorear

### KPIs Financieros

```
Ingresos:
- CPX Research: $X/mes
- Pollfish: $Y/mes
- WannAds: $Z/mes
- Adsterra: $W/mes
TOTAL: $(X+Y+Z+W)/mes

Egresos:
- Pagos a usuarios: $A/mes
- Sorteo: $100/mes
TOTAL: $(A+100)/mes

GANANCIA NETA: Ingresos - Egresos
```

### KPIs de Usuarios

- Usuarios activos/mes
- Encuestas completadas/usuario
- Tasa de retención (usuarios que vuelven)
- Tiempo promedio para alcanzar $15
- % de usuarios que solicitan retiro

---

## 🎯 Próximos Pasos

### Implementar Ya
- [x] Panel admin básico (`admin.html`)
- [x] API de admin (`admin-get-users.js`)
- [x] Mínimos de retiro actualizados a $15

### Implementar Pronto (Esta semana)
- [ ] Botón de "Solicitar Retiro" en dashboard
- [ ] API `request-withdrawal.js`
- [ ] Formulario de retiro con método de pago
- [ ] Email templates

### Implementar Después (Próximo mes)
- [ ] Sistema de aprobación de retiros
- [ ] Historial de retiros del usuario
- [ ] Notificaciones automáticas
- [ ] Exportar datos a CSV

---

## 💡 Recomendaciones

### Para Empezar (Pocos Usuarios)

**Opción Manual es suficiente:**
1. Usuario te envía email: "Quiero retirar $15"
2. Verificas en `admin.html` que tenga el saldo
3. Envías PayPal manual
4. Le confirmas por email

**Ventajas:**
- Sin código adicional
- Control total
- Rápido de implementar

### Cuando Crezcas (50+ usuarios)

**Implementa sistema semi-automático:**
- Botón de retiro en el sitio
- Panel para aprobar solicitudes
- Emails automáticos

**Ventajas:**
- Más profesional
- Menos trabajo manual
- Mejor experiencia de usuario

---

## 🔑 Credenciales y Acceso

### Panel Admin

**URL:** https://nisi-cash.vercel.app/admin.html  
**Token de Autorización:** `Bearer nisicash_admin_2026`

**⚠️ IMPORTANTE:** Cambia el token en `.env.development.local`:
```env
ADMIN_SECRET=tu_token_secreto_aqui_2026
```

### Vercel KV

Para acceder directamente a la base de datos:
1. Ve a Vercel Dashboard
2. Tu proyecto → Storage → KV
3. Busca: `user:*` para ver todos los usuarios
4. Busca: `referral:*` para ver referidos
5. Busca: `withdrawal:*` para ver retiros (futuro)

---

**Última actualización:** 30 de Abril, 2026  
**Versión:** 1.0

