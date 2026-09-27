# ✅ Checklist de Verificación de Anuncios Adsterra

## 🔍 Cómo Verificar que los Anuncios Funcionan

### 1. Pop-under (Pop-up al hacer clic)
**Cómo probar:**
1. Abre tu sitio en el navegador
2. Haz clic en CUALQUIER parte de la página
3. Debería abrirse una nueva pestaña/ventana en segundo plano

**Ubicación en el código:** `<head>` → Script de pop-under

**Estado:** 
- [ ] Se abre una nueva pestaña al hacer clic
- [ ] No interfiere con la navegación normal

---

### 2. Social Bar (Barra flotante)
**Cómo probar:**
1. Abre tu sitio en el navegador
2. Busca una barra flotante (generalmente en la parte inferior)
3. La barra puede mostrar anuncios de redes sociales o promociones

**Ubicación en el código:** Inicio del `<body>`

**Estado:** 
- [ ] Se muestra la Social Bar
- [ ] Es visible pero no invasiva
- [ ] Se puede cerrar si el usuario lo desea
- [ ] Se adapta a pantallas móviles

**Nota:** La Social Bar puede tardar unos segundos en cargarse.

---

### 3. Native Banner (Banner integrado)
**Cómo probar:**
1. Abre tu sitio en el navegador
2. Desplázate hacia abajo después del banner principal (Hero)
3. Deberías ver una sección con "Advertisement" antes de las encuestas

**Ubicación visual:**
```
[HERO SECTION - "Gana Dinero Extra"]
           ↓
[ADVERTISEMENT] ← El Native Banner debería aparecer aquí
           ↓
[Encuestas CPX Research]
```

**Ubicación en el código:** Entre `</header>` y `<div class="container" id="encuestas">`

**Estado:** 
- [ ] Se muestra el contenedor del anuncio
- [ ] Tiene la etiqueta "Advertisement"
- [ ] Está bien integrado con el diseño
- [ ] Se ve bien en móviles

**Nota:** Los anuncios nativos pueden tardar 5-10 segundos en cargar completamente.

---

## 🛠️ Herramientas de Diagnóstico

### Verificar en la Consola del Navegador
1. Presiona **F12** para abrir DevTools
2. Ve a la pestaña **"Console"**
3. No deberías ver errores relacionados con Adsterra
4. Ve a la pestaña **"Network"**
5. Filtra por "profitableratecpmnetwork"
6. Deberías ver las peticiones a los scripts de Adsterra

### Scripts que Deberían Cargar
✅ `8f725f5132876a5433b0eb1f3cd2084f.js` (Pop-under)  
✅ `22adc81f5a456c1aad71c4af36addcfb.js` (Social Bar)  
✅ `70e3b206d589e357aad2edfb71af50f6/invoke.js` (Native Banner)

---

## 📱 Pruebas en Diferentes Dispositivos

### Desktop (Computadora)
- [ ] Pop-under funciona
- [ ] Social Bar se muestra
- [ ] Native Banner visible y bien posicionado

### Tablet (iPad, etc.)
- [ ] Todos los anuncios se adaptan al tamaño
- [ ] No hay overlapping con el contenido

### Mobile (Teléfono)
- [ ] Pop-under funciona al tocar la pantalla
- [ ] Social Bar se adapta al ancho
- [ ] Native Banner no rompe el diseño
- [ ] Etiqueta "Advertisement" visible

---

## ⏱️ Tiempos de Aprobación

### Primer Despliegue
- **24-48 horas:** Adsterra revisa tu sitio
- Durante este tiempo, los anuncios pueden no mostrarse o mostrar placeholders
- Una vez aprobado, los anuncios comenzarán a aparecer automáticamente

### Estados Posibles
1. **Pendiente:** Sitio en revisión
2. **Aprobado:** Anuncios activos
3. **Rechazado:** Revisa las políticas de Adsterra

---

## 🐛 Solución de Problemas

### Los anuncios NO se muestran

**Causas comunes:**
1. **Dominio no aprobado:** Espera 24-48 horas
2. **Ad Blocker activo:** Desactívalo temporalmente
3. **Scripts bloqueados:** Verifica la consola del navegador
4. **Cuenta suspendida:** Revisa tu email de Adsterra

**Soluciones:**
```javascript
// Verifica que los scripts se carguen
1. F12 → Network → Busca "profitableratecpmnetwork"
2. Si hay errores 404: Verifica los IDs de los códigos
3. Si hay errores CORS: Normal en localhost, prueba en el dominio real
```

### El Native Banner está vacío

**Es normal si:**
- Es tu primera vez desplegando
- Tu cuenta aún no está aprobada
- No hay anuncios disponibles en tu región (temporalmente)

**Espera 24-48 horas y vuelve a verificar.**

---

## 📊 Métricas a Monitorear

Una vez aprobado, revisa en tu panel de Adsterra:

### Diarias
- **Impresiones:** Cuántas veces se mostró cada anuncio
- **Clics:** Cuántos usuarios hicieron clic
- **CTR:** Tasa de clics (Clics/Impresiones × 100)

### Semanales
- **CPM:** Ingresos por 1000 impresiones
- **Ingresos totales:** Dinero ganado
- **Anuncios con mejor rendimiento:** Optimiza según datos

---

## 🎯 Optimización Post-Implementación

### Después de 7 días, analiza:
1. ¿Qué anuncio genera más ingresos?
2. ¿El Native Banner tiene buen CTR?
3. ¿Deberías agregar más Native Banners?

### Ubicaciones adicionales sugeridas:
```html
<!-- Antes de "Cómo Funciona" -->
<div class="how-it-works">
    [NATIVE BANNER]
    <h2>¿Cómo Funciona?</h2>
</div>

<!-- Entre Testimonios y FAQ -->
[NATIVE BANNER]

<!-- Antes del Footer -->
[NATIVE BANNER]
```

---

## ✅ Checklist Final

Antes de considerar la implementación completa:

- [ ] Scripts de Adsterra presentes en el HTML
- [ ] Estilos CSS agregados correctamente
- [ ] Sitio desplegado en Vercel/producción
- [ ] Esperado 24-48 horas para aprobación
- [ ] Probado en desktop, tablet y mobile
- [ ] Sin errores en la consola del navegador
- [ ] Anuncios no interfieren con el contenido
- [ ] Diseño responsive funcionando correctamente
- [ ] Panel de Adsterra configurado y monitoreado

---

## 📞 Recursos Útiles

**Dashboard Adsterra:**  
https://publishers.adsterra.com/

**Documentación Adsterra:**  
https://adsterra.com/publishers/

**Soporte:**  
publishers@adsterra.com

---

## 🎉 ¡Listo para Monetizar!

Si todos los checklist están marcados, tu sitio está correctamente configurado para generar ingresos con Adsterra.

**Recuerda:** Los primeros ingresos pueden tardar unos días en aparecer mientras Adsterra optimiza los anuncios para tu audiencia.

---

**Fecha de implementación:** $(date)  
**Versión:** 1.0  
**Estado:** ✅ Implementado correctamente
