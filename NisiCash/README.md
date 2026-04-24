# 💰 Sitio Web de Encuestas Pagadas

Sitio web para ganar dinero completando encuestas online con integración de CPX Research, CPAlead y otros offerwalls.

## 🚀 Demo en Vivo

**URL:** `https://tu-usuario.github.io/tu-repo/`

> ⚠️ **Importante:** Reemplaza `tu-usuario` y `tu-repo` con tu información real de GitHub.

## 📋 Características

- ✅ Diseño moderno y responsive
- ✅ Animaciones suaves y atractivas
- ✅ Sistema de estadísticas en tiempo real
- ✅ Testimonios de usuarios
- ✅ Sección FAQ interactiva
- ✅ Notificaciones de actividad (prueba social)
- ✅ Tracking con Google Analytics y Facebook Pixel
- ✅ Optimizado para conversión
- ✅ Compatible con móviles

## 🛠️ Configuración Inicial

### 1. Subir a GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```

### 2. Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Pages**
4. En **Source**, selecciona la rama `main` y carpeta `/ (root)`
5. Click en **Save**
6. Espera 2-3 minutos y tu sitio estará en: `https://tu-usuario.github.io/tu-repo/`

### 3. Configurar Tracking

Una vez que tengas tu URL de GitHub Pages:

#### Google Analytics

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una propiedad nueva
3. Copia tu ID de medición (formato: `G-XXXXXXXXXX`)
4. Abre `script.js` y reemplaza:
   ```javascript
   const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Pega tu ID aquí
   ```

#### Facebook Pixel

1. Ve a [Facebook Business](https://business.facebook.com/)
2. Crea un Pixel en Events Manager
3. Copia tu Pixel ID
4. Abre `script.js` y reemplaza:
   ```javascript
   const FB_PIXEL_ID = 'XXXXXXXXXX'; // Pega tu ID aquí
   ```

### 4. Configurar Offerwalls

#### CPX Research

1. Regístrate en [CPX Research](https://www.cpx-research.com/)
2. Crea una nueva aplicación
3. Copia el código de integración
4. Pega el código en `index.html` dentro de `<div class="offerwall-area">`

#### CPAlead

1. Regístrate en [CPAlead](https://www.cpalead.com/)
2. Crea un Content Locker o Gateway
3. Copia el código de integración
4. Pega el código en `index.html`

### 5. Agregar Enlaces de Afiliado

En `index.html`, busca:

```html
<a href="#" target="_blank" class="btn">
```

Reemplaza `#` con tu enlace de afiliado real de:
- ySense
- Swagbucks
- InboxDollars
- Survey Junkie
- Etc.

## 📁 Estructura del Proyecto

```
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript y tracking
├── README.md           # Este archivo
└── .gitignore          # Archivos a ignorar
```

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #2ecc71;    /* Color principal */
    --secondary-color: #27ae60;  /* Color secundario */
    --accent-color: #f39c12;     /* Color de acento */
    --danger-color: #e74c3c;     /* Color de alerta */
}
```

### Modificar Estadísticas

En `index.html`, busca la sección `.stats-section` y modifica los números.

### Cambiar Testimonios

En `index.html`, busca `.testimonials-section` y edita los testimonios.

## 📊 Eventos Rastreados

El sitio rastrea automáticamente:

- ✅ Vistas de página
- ✅ Clics en botones de encuestas
- ✅ Tiempo en página
- ✅ Tipo de dispositivo (móvil/escritorio)

## 🔧 Mantenimiento

### Actualizar Estadísticas

Las estadísticas son estáticas. Para actualizarlas:

1. Abre `index.html`
2. Busca `.stat-number`
3. Modifica los valores
4. Commit y push a GitHub

### Agregar Nuevas Encuestas

1. Copia una tarjeta `.card` existente
2. Modifica el contenido
3. Actualiza el enlace de afiliado

## 🚀 Optimización SEO

El sitio incluye:

- ✅ Meta tags optimizados
- ✅ Open Graph para redes sociales
- ✅ Descripción y keywords
- ✅ Estructura semántica HTML5

Para mejorar el SEO:

1. Actualiza los meta tags en `index.html`
2. Agrega una imagen `og-image.jpg` (1200x630px)
3. Crea un `sitemap.xml`
4. Registra tu sitio en Google Search Console

## 📱 Responsive

El sitio es 100% responsive y se adapta a:

- 📱 Móviles (< 768px)
- 💻 Tablets (768px - 1024px)
- 🖥️ Escritorio (> 1024px)

## 🐛 Solución de Problemas

### El sitio no se ve en GitHub Pages

- Verifica que GitHub Pages esté activado
- Asegúrate de que el archivo se llame `index.html`
- Espera 5-10 minutos después de activar Pages

### Las animaciones no funcionan

- Verifica que `script.js` esté cargando correctamente
- Abre la consola del navegador (F12) para ver errores

### El tracking no funciona

- Verifica que hayas reemplazado los IDs de placeholder
- Comprueba que los scripts se carguen sin errores

## 📞 Soporte

Si tienes problemas, revisa:

1. La consola del navegador (F12)
2. Los archivos están correctamente enlazados
3. GitHub Pages está activo

## 📄 Licencia

Este proyecto es de uso libre para fines personales y comerciales.

## 🎯 Próximos Pasos

- [ ] Subir a GitHub
- [ ] Activar GitHub Pages
- [ ] Configurar Google Analytics
- [ ] Configurar Facebook Pixel
- [ ] Agregar enlaces de afiliado
- [ ] Integrar CPX Research o CPAlead
- [ ] Crear imagen Open Graph
- [ ] Registrar en Google Search Console
- [ ] Promocionar en redes sociales

---

**¡Buena suerte con tu sitio de encuestas! 💰**
