# 📝 Guía de Configuración Paso a Paso

Esta guía te ayudará a configurar completamente tu sitio web de encuestas.

## 🎯 Checklist de Configuración

### ✅ Paso 1: Subir a GitHub y Activar Pages

1. **Crear repositorio en GitHub:**
   - Ve a [GitHub](https://github.com)
   - Click en "New repository"
   - Nombre: `encuestas-pagadas` (o el que prefieras)
   - Público o Privado (Pages funciona con ambos)
   - NO inicialices con README (ya tienes uno)

2. **Subir tu código:**
   ```bash
   git init
   git add .
   git commit -m "Sitio web de encuestas inicial"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
   git push -u origin main
   ```

3. **Activar GitHub Pages:**
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` → `/ (root)` → Save
   - Espera 2-3 minutos
   - Tu URL será: `https://TU-USUARIO.github.io/TU-REPO/`

---

## 🔗 Paso 2: Actualizar URLs en el Código

Una vez que tengas tu URL de GitHub Pages, actualiza:

### En `index.html` (línea ~10):

```html
<!-- ANTES -->
<meta property="og:url" content="https://tu-usuario.github.io/tu-repo">
<meta property="og:image" content="https://tu-usuario.github.io/tu-repo/og-image.jpg">

<!-- DESPUÉS (ejemplo) -->
<meta property="og:url" content="https://juanperez.github.io/encuestas-pagadas">
<meta property="og:image" content="https://juanperez.github.io/encuestas-pagadas/og-image.jpg">
```

---

## 📊 Paso 3: Configurar Google Analytics

### 3.1 Crear cuenta de Google Analytics

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Click en "Empezar a medir"
3. Nombre de la cuenta: "Encuestas Pagadas"
4. Nombre de la propiedad: "Sitio Web Encuestas"
5. Selecciona tu zona horaria y moneda
6. Categoría: "Negocios e industria"
7. Acepta los términos

### 3.2 Crear flujo de datos web

1. Plataforma: **Web**
2. URL del sitio web: `https://TU-USUARIO.github.io/TU-REPO/`
3. Nombre del flujo: "Sitio Principal"
4. Click en "Crear flujo"

### 3.3 Copiar ID de medición

1. Verás tu **ID de medición** (formato: `G-XXXXXXXXXX`)
2. Cópialo

### 3.4 Actualizar script.js

Abre `script.js` y en la línea 6:

```javascript
// ANTES
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// DESPUÉS (ejemplo)
const GA_MEASUREMENT_ID = 'G-ABC123XYZ9';
```

---

## 📘 Paso 4: Configurar Facebook Pixel (Opcional)

### 4.1 Crear Facebook Pixel

1. Ve a [Facebook Business](https://business.facebook.com/)
2. Menú → Eventos → Pixels
3. Click en "Crear un Pixel"
4. Nombre: "Pixel Encuestas"
5. Ingresa tu URL: `https://TU-USUARIO.github.io/TU-REPO/`

### 4.2 Copiar Pixel ID

1. En la configuración del Pixel, copia el **Pixel ID** (solo números)
2. Ejemplo: `123456789012345`

### 4.3 Actualizar script.js

Abre `script.js` y en la línea 9:

```javascript
// ANTES
const FB_PIXEL_ID = 'XXXXXXXXXX';

// DESPUÉS (ejemplo)
const FB_PIXEL_ID = '123456789012345';
```

---

## 🎯 Paso 5: Agregar Enlaces de Afiliado

### 5.1 Registrarse en plataformas de encuestas

Opciones recomendadas:

1. **ySense** - [https://www.ysense.com/](https://www.ysense.com/)
2. **Swagbucks** - [https://www.swagbucks.com/](https://www.swagbucks.com/)
3. **InboxDollars** - [https://www.inboxdollars.com/](https://www.inboxdollars.com/)
4. **Survey Junkie** - [https://www.surveyjunkie.com/](https://www.surveyjunkie.com/)

### 5.2 Obtener enlace de referido

1. Regístrate en la plataforma
2. Ve a "Referidos" o "Affiliate Program"
3. Copia tu enlace único de referido
4. Ejemplo: `https://www.ysense.com/?rb=123456789`

### 5.3 Actualizar index.html

Busca en `index.html` (línea ~95):

```html
<!-- ANTES -->
<a href="#" target="_blank" class="btn">

<!-- DESPUÉS (ejemplo) -->
<a href="https://www.ysense.com/?rb=123456789" target="_blank" class="btn">
```

---

## 🏆 Paso 6: Integrar Offerwalls

### Opción A: CPX Research

1. **Registrarse:**
   - Ve a [CPX Research](https://www.cpx-research.com/)
   - Regístrate como Publisher

2. **Crear aplicación:**
   - Dashboard → Add New App
   - Tipo: Website
   - URL: Tu URL de GitHub Pages
   - Categoría: Survey/Rewards

3. **Obtener código:**
   - Copia el código de integración (JavaScript)
   - Ejemplo:
   ```html
   <script src="https://offers.cpx-research.com/integration.js"></script>
   <div id="cpx-research-container"></div>
   <script>
     CPXResearch.init({
       app_id: 'TU_APP_ID',
       user_id: 'USER_ID_DINAMICO'
     });
   </script>
   ```

4. **Pegar en index.html:**
   - Busca `<div class="offerwall-area">` (línea ~110)
   - Reemplaza el contenido con el código de CPX

### Opción B: CPAlead

1. **Registrarse:**
   - Ve a [CPAlead](https://www.cpalead.com/)
   - Regístrate como Publisher

2. **Crear Content Locker:**
   - Dashboard → Create New Campaign
   - Tipo: Content Locker o Gateway
   - URL: Tu URL de GitHub Pages

3. **Obtener código:**
   - Copia el código HTML/JavaScript
   - Ejemplo:
   ```html
   <script src="https://www.cpalead.com/locker.php?id=12345"></script>
   ```

4. **Pegar en index.html:**
   - Busca `<div class="offerwall-area">`
   - Reemplaza el contenido con el código de CPAlead

### Opción C: Otros Offerwalls

- **Pollfish:** [https://www.pollfish.com/](https://www.pollfish.com/)
- **BitLabs:** [https://www.bitlabs.ai/](https://www.bitlabs.ai/)
- **Theorem Reach:** [https://theoremreach.com/](https://theoremreach.com/)

---

## 🖼️ Paso 7: Crear Imagen Open Graph (Opcional)

Para que tu sitio se vea bien al compartir en redes sociales:

1. **Crear imagen:**
   - Tamaño: 1200 x 630 píxeles
   - Incluye: Logo, título, llamado a la acción
   - Herramientas: Canva, Figma, Photoshop

2. **Nombrar archivo:**
   - Guarda como: `og-image.jpg` o `og-image.png`

3. **Subir a GitHub:**
   - Coloca el archivo en la raíz del proyecto
   - Commit y push

4. **Verificar:**
   - Usa [Facebook Debugger](https://developers.facebook.com/tools/debug/)
   - Ingresa tu URL y verifica que la imagen aparezca

---

## 🔍 Paso 8: SEO y Google Search Console

### 8.1 Registrar en Google Search Console

1. Ve a [Google Search Console](https://search.google.com/search-console/)
2. Agregar propiedad → Prefijo de URL
3. Ingresa: `https://TU-USUARIO.github.io/TU-REPO/`
4. Verificación: Usa el método de Google Analytics (si ya lo configuraste)

### 8.2 Enviar sitemap (opcional)

Crea un archivo `sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://TU-USUARIO.github.io/TU-REPO/</loc>
    <lastmod>2024-01-01</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

Sube a GitHub y envía en Search Console.

---

## 🚀 Paso 9: Probar Todo

### Checklist de pruebas:

- [ ] El sitio carga correctamente en GitHub Pages
- [ ] Todas las animaciones funcionan
- [ ] Los botones tienen enlaces reales (no `#`)
- [ ] Google Analytics está rastreando (verifica en tiempo real)
- [ ] Facebook Pixel está activo (usa Facebook Pixel Helper)
- [ ] El offerwall se muestra correctamente
- [ ] El sitio se ve bien en móvil
- [ ] Las notificaciones de actividad aparecen
- [ ] El FAQ se abre y cierra correctamente

### Herramientas de prueba:

- **Google Analytics Real-Time:** Verifica visitas en tiempo real
- **Facebook Pixel Helper:** Extensión de Chrome para verificar el pixel
- **Mobile-Friendly Test:** [https://search.google.com/test/mobile-friendly](https://search.google.com/test/mobile-friendly)
- **PageSpeed Insights:** [https://pagespeed.web.dev/](https://pagespeed.web.dev/)

---

## 📈 Paso 10: Promocionar tu Sitio

### Estrategias de promoción:

1. **Redes Sociales:**
   - Comparte en Facebook, Twitter, Instagram
   - Usa hashtags: #GanarDinero #EncuestasPagadas #DineroOnline

2. **Grupos y Foros:**
   - Reddit: r/beermoney, r/WorkOnline
   - Facebook Groups: Grupos de encuestas pagadas
   - Foros de tu país

3. **SEO:**
   - Crea contenido de blog (si agregas una sección)
   - Optimiza para palabras clave: "ganar dinero encuestas", "encuestas pagadas"

4. **Publicidad (opcional):**
   - Facebook Ads
   - Google Ads
   - TikTok Ads

---

## 🛠️ Mantenimiento Continuo

### Tareas semanales:

- [ ] Revisar estadísticas de Google Analytics
- [ ] Verificar que los enlaces de afiliado funcionen
- [ ] Actualizar testimonios con datos reales
- [ ] Responder comentarios/mensajes

### Tareas mensuales:

- [ ] Actualizar estadísticas en el sitio
- [ ] Agregar nuevas plataformas de encuestas
- [ ] Optimizar conversión basado en datos
- [ ] Crear contenido nuevo (blog, guías)

---

## ❓ Problemas Comunes

### El sitio no carga en GitHub Pages

**Solución:**
- Verifica que el archivo se llame exactamente `index.html`
- Asegúrate de que GitHub Pages esté activado
- Espera 5-10 minutos después de activar

### Google Analytics no rastrea

**Solución:**
- Verifica que el ID sea correcto (formato `G-XXXXXXXXXX`)
- Abre la consola del navegador (F12) y busca errores
- Usa el modo "Real-Time" en Google Analytics para verificar

### Los enlaces de afiliado no funcionan

**Solución:**
- Verifica que el enlace sea correcto
- Asegúrate de que no haya espacios extra
- Prueba el enlace directamente en el navegador

### El offerwall no se muestra

**Solución:**
- Verifica que el código esté correctamente pegado
- Revisa la consola del navegador para errores
- Contacta al soporte del offerwall

---

## 📞 Recursos Adicionales

- **Documentación GitHub Pages:** [https://docs.github.com/pages](https://docs.github.com/pages)
- **Google Analytics Help:** [https://support.google.com/analytics](https://support.google.com/analytics)
- **Facebook Pixel Guide:** [https://www.facebook.com/business/help/pixel](https://www.facebook.com/business/help/pixel)

---

**¡Éxito con tu sitio! 🚀💰**
