# 🔢 Guía Rápida: Ajustar Números del Sitio

## 📊 Números Actuales (Configurados)

### Usuarios Activos (contador en vivo)
```
📍 Ubicación: script.js - función initLiveCounter()
📈 Rango actual: 500 - 600 usuarios
🔄 Actualización: Cada 5-15 segundos
```

### Participantes del Sorteo
```
📍 Ubicación: api/get-referral-stats.js
📈 Base seed: 1,500 participantes
➕ Se suma a participantes reales
```

### Leaderboard TOP 3 (seed data)
```
📍 Ubicación: api/get-top-sharers.js
📈 1er lugar: 127 compartidos
📈 2do lugar: 103 compartidos
📈 3er lugar: 89 compartidos
```

---

## 🛠️ Cómo Ajustar Cada Número

### 1️⃣ Cambiar Usuarios Activos

**Archivo:** `script.js`

Buscar la función `initLiveCounter()` y cambiar:

```javascript
// LÍNEA ~1063
const MIN_USERS = 500;  // Cambiar este número
const MAX_USERS = 600;  // Cambiar este número
```

**Ejemplos de ajustes según crecimiento:**

| Fase | Usuarios Reales | MIN_USERS | MAX_USERS |
|------|----------------|-----------|-----------|
| Lanzamiento | 0-10 | 500 | 600 |
| Pequeño | 50-100 | 400 | 550 |
| Mediano | 200-500 | 300 | 500 |
| Grande | 500+ | usa datos reales | usa datos reales |

**Fórmula sugerida:**
```
MIN = usuarios_reales * 0.8
MAX = usuarios_reales * 1.2
```

---

### 2️⃣ Cambiar Participantes del Sorteo

**Archivo:** `api/get-referral-stats.js`

Buscar y cambiar:

```javascript
// LÍNEA ~33
const SEED_PARTICIPANTS = 1500;  // Cambiar este número
```

**Ejemplos de ajustes:**

| Participantes Reales | SEED_PARTICIPANTS | Total Mostrado |
|---------------------|-------------------|----------------|
| 0-50 | 1500 | ~1,500 |
| 50-200 | 1000 | 1,050-1,200 |
| 200-500 | 500 | 700-1,000 |
| 500+ | 0 | Solo reales |

**Cuándo reducir:**
- Cuando tengas 100+ participantes reales, reduce a 1,000
- Cuando tengas 500+ participantes reales, reduce a 500
- Cuando tengas 1,000+ participantes reales, pon en 0 (solo reales)

---

### 3️⃣ Cambiar Leaderboard Seeds

**Archivo:** `api/get-top-sharers.js`

Buscar `SEED_DATA` y cambiar:

```javascript
// LÍNEA ~7-22
const SEED_DATA = [
  {
    user_id: 'demo-user-alpha-001',
    total_shares: 127,  // ← Cambiar
    display_name: 'A7B2C4D9',
    is_seed: true
  },
  {
    user_id: 'demo-user-beta-002',
    total_shares: 103,  // ← Cambiar
    display_name: 'E3F8G1H6',
    is_seed: true
  },
  {
    user_id: 'demo-user-gamma-003',
    total_shares: 89,   // ← Cambiar
    display_name: 'J9K4L2M7',
    is_seed: true
  }
];
```

**Cálculo sugerido para seeds:**
```
1er lugar = (SEED_PARTICIPANTS / 12) = 1500/12 = 125
2do lugar = (SEED_PARTICIPANTS / 15) = 1500/15 = 100
3er lugar = (SEED_PARTICIPANTS / 17) = 1500/17 = 88
```

**Ajustes según usuarios reales:**

| Escenario | Acción |
|-----------|--------|
| 0-2 usuarios reales | Mostrar los 3 seeds completos |
| 3+ usuarios reales | Seeds desaparecen automáticamente |
| Top real > seed | Seeds ajustados automáticamente |

---

## 📝 Proceso de Ajuste Paso a Paso

### Cuando tengas usuarios reales:

1. **Revisar métricas actuales:**
   ```
   - Panel admin: https://nisi-cash.vercel.app/admin.html
   - Token: nisicash_admin_2026
   - Verificar usuarios reales activos
   ```

2. **Decidir qué ajustar:**
   ```
   ¿Tienes 100+ usuarios reales?
   → Reducir SEED_PARTICIPANTS a 1,000
   
   ¿Tienes 50+ usuarios activos simultáneos?
   → Ajustar MIN_USERS/MAX_USERS a números reales
   
   ¿Tienes 3+ en leaderboard?
   → Seeds desaparecen solos (no hacer nada)
   ```

3. **Hacer los cambios:**
   ```bash
   # Editar archivos:
   - script.js (usuarios activos)
   - api/get-referral-stats.js (participantes sorteo)
   - api/get-top-sharers.js (leaderboard seeds) - OPCIONAL
   ```

4. **Desplegar:**
   ```bash
   cd "c:\Users\Alejandro\Documents\NisiCash-main"
   git add .
   git commit -m "chore: Adjust numbers based on real user growth"
   git push origin HEAD:master
   git push origin HEAD:main
   ```

5. **Verificar en producción:**
   ```
   https://nisi-cash.vercel.app/
   - Esperar 2-3 minutos (Vercel deploy)
   - Hard refresh: Ctrl + Shift + R
   - Verificar nuevos números
   ```

---

## 🎯 Estrategia Recomendada

### Fase 1: Lanzamiento (HOY)
```
✅ Usuarios activos: 500-600
✅ Participantes sorteo: 1,500
✅ Leaderboard seeds: 127, 103, 89
```
**Duración:** Primeras 2-4 semanas

### Fase 2: Crecimiento Temprano
```
📊 Cuando tengas 50+ usuarios reales:
- Usuarios activos: 400-550
- Participantes sorteo: 1,000
- Seeds: mantener igual
```
**Duración:** Semanas 4-8

### Fase 3: Establecido
```
📊 Cuando tengas 200+ usuarios reales:
- Usuarios activos: 300-500
- Participantes sorteo: 500
- Seeds: probablemente ya no visibles
```
**Duración:** Meses 2-4

### Fase 4: Maduro
```
📊 Cuando tengas 500+ usuarios reales:
- Usuarios activos: datos reales * 1.2
- Participantes sorteo: 0 (solo reales)
- Seeds: 0 (solo usuarios reales)
```
**Duración:** Mes 4+

---

## ⚠️ Cosas a NO Hacer

❌ **NO ajustar números cada día**
- Hazlo solo cuando sea necesario (50, 100, 500 usuarios)
- Cambios frecuentes se notan y pierden credibilidad

❌ **NO poner números ridículamente altos**
- Si muestras 10,000 usuarios pero el sitio se ve vacío, es obvio
- Mantén consistencia entre todos los números

❌ **NO mentir sobre pagos**
- Seeds son para actividad visible, NO para testimonios falsos
- Nunca digas "Usuario X ganó Y" si X es seed

❌ **NO olvidar documentar cambios**
- Anota en el commit message por qué cambiaste los números
- Mantén este archivo actualizado

✅ **SÍ ser gradual y realista**
- Reduce seeds progresivamente
- Aumenta proporción de datos reales gradualmente
- Mantén consistencia entre métricas

---

## 📞 Checklist de Ajuste

Cuando vayas a cambiar números:

- [ ] Revisar usuarios reales en admin panel
- [ ] Decidir nuevos números (usa las tablas de arriba)
- [ ] Editar archivos correspondientes
- [ ] Hacer commit descriptivo
- [ ] Push a master y main
- [ ] Esperar deploy de Vercel (2-3 min)
- [ ] Verificar en producción
- [ ] Actualizar este documento si es necesario
- [ ] Monitorear métricas después del cambio

---

## 🔍 Comandos Útiles

### Ver usuarios reales actuales:
```bash
# Abrir en navegador:
https://nisi-cash.vercel.app/api/get-top-sharers

# Buscar en JSON:
"total_real_users": 10  ← Tus usuarios reales
```

### Ver participantes reales:
```bash
# Abrir en navegador:
https://nisi-cash.vercel.app/api/get-referral-stats?user_id=TU_USER_ID

# Buscar en JSON:
"real_participants": 10  ← Participantes reales
"total_participants": 1510  ← Total con seeds
```

### Deploy rápido:
```powershell
cd "c:\Users\Alejandro\Documents\NisiCash-main"
git add .
git commit -m "chore: Update numbers"
git push origin HEAD:master ; git push origin HEAD:main
```

---

## 📝 Historial de Cambios

| Fecha | Cambio | Razón | Usuario Reales |
|-------|--------|-------|----------------|
| 27/09/2026 | 500-600 activos, 1,500 participantes | Lanzamiento inicial | 0 |
| ___________ | _________________ | ___________________ | __________ |
| ___________ | _________________ | ___________________ | __________ |
| ___________ | _________________ | ___________________ | __________ |

---

**Última actualización:** 27 de septiembre de 2026  
**Status:** ✅ CONFIGURADO PARA LANZAMIENTO
