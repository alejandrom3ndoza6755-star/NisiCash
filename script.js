// ============================================
// CONFIGURACIÓN DE CPX RESEARCH
// ============================================

const CPX_CONFIG = {
    appId: '32674',
    secureHashKey: 'CNyYOocHuRrNRRqsUueyBCOQ9ZtzaHFN' // Tu secure hash de CPX Research
};

// ============================================
// CONFIGURACIÓN DE THEOREM REACH
// ============================================

const THEOREM_CONFIG = {
    apiKey: '5b4aa87c9129005b37e8d57917a4',
    appId: '24903'
};

// Generar o recuperar ID único de usuario
function getUserId() {
    let userId = localStorage.getItem('cpx_user_id');
    if (!userId) {
        // Generar ID único basado en timestamp y random
        userId = 'USER_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('cpx_user_id', userId);
    }
    return userId;
}

// Generar secure hash (MD5 simplificado para cliente)
// NOTA: En producción, esto debería hacerse en el servidor
async function generateSecureHash(userId) {
    const text = userId + '-' + CPX_CONFIG.secureHashKey;
    const msgBuffer = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Inicializar CPX Research Offerwall
async function initCPXResearch() {
    const userId = getUserId();
    const secureHash = await generateSecureHash(userId);
    
    // Construir URL del iframe
    const cpxUrl = new URL('https://offers.cpx-research.com/index.php');
    cpxUrl.searchParams.set('app_id', CPX_CONFIG.appId);
    cpxUrl.searchParams.set('ext_user_id', userId);
    cpxUrl.searchParams.set('secure_hash', secureHash);
    cpxUrl.searchParams.set('username', 'Usuario_' + userId.substr(-6));
    cpxUrl.searchParams.set('subid_1', 'web');
    cpxUrl.searchParams.set('subid_2', window.location.hostname);
    
    // Agregar parámetros adicionales para mejor targeting
    // Detectar idioma del navegador
    const userLang = navigator.language || navigator.userLanguage;
    cpxUrl.searchParams.set('language', userLang);
    
    // Establecer URL del iframe
    const iframe = document.getElementById('cpx-iframe');
    if (iframe) {
        iframe.src = cpxUrl.toString();
        console.log('CPX Research inicializado para usuario:', userId);
        console.log('Idioma detectado:', userLang);
        console.log('URL completa:', cpxUrl.toString());
        
        // Tracking
        trackEvent('cpx_offerwall_loaded', {
            user_id: userId,
            language: userLang
        });
    }
}

// ============================================
// INICIALIZAR THEOREM REACH
// ============================================

// Inicializar Theorem Reach Offerwall
function initTheoremReach() {
    const userId = getUserId();
    
    // Construir URL del iframe de Theorem Reach
    const theoremUrl = new URL('https://theoremreach.com/respondent_entry/direct');
    theoremUrl.searchParams.set('api_key', THEOREM_CONFIG.apiKey);
    theoremUrl.searchParams.set('user_id', userId);
    
    // Establecer URL del iframe
    const iframe = document.getElementById('theorem-iframe');
    if (iframe) {
        iframe.src = theoremUrl.toString();
        console.log('Theorem Reach inicializado para usuario:', userId);
        
        // Tracking
        trackEvent('theorem_offerwall_loaded', {
            user_id: userId
        });
    }
}

// ============================================
// CONFIGURACIÓN DE TRACKING
// ============================================

// Google Analytics - Reemplaza 'G-XXXXXXXXXX' con tu ID cuando tengas la URL
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Reemplazar con tu ID real

// Facebook Pixel - Reemplaza 'XXXXXXXXXX' con tu ID cuando tengas la URL
const FB_PIXEL_ID = 'XXXXXXXXXX'; // TODO: Reemplazar con tu ID real

// ============================================
// INICIALIZACIÓN DE TRACKING
// ============================================

function initializeTracking() {
    // Solo inicializar si los IDs están configurados
    if (GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
        initGoogleAnalytics();
    }

    if (FB_PIXEL_ID !== 'XXXXXXXXXX') {
        initFacebookPixel();
    }
}

// Google Analytics
function initGoogleAnalytics() {
    // Cargar script de Google Analytics
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(gaScript);

    // Configurar Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);

    console.log('Google Analytics inicializado');
}

// Facebook Pixel
function initFacebookPixel() {
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', FB_PIXEL_ID);
    fbq('track', 'PageView');

    console.log('Facebook Pixel inicializado');
}

// ============================================
// TRACKING DE EVENTOS
// ============================================

function trackEvent(eventName, eventData = {}) {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }

    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }

    console.log('Evento rastreado:', eventName, eventData);
}

// Rastrear clics en botones de encuestas
function trackSurveyClick(surveyType) {
    trackEvent('survey_click', {
        survey_type: surveyType,
        timestamp: new Date().toISOString()
    });
}

// Rastrear tiempo en página
let pageStartTime = Date.now();
window.addEventListener('beforeunload', function() {
    const timeSpent = Math.round((Date.now() - pageStartTime) / 1000);
    trackEvent('time_on_page', {
        seconds: timeSpent
    });
});

// ============================================
// FUNCIONALIDAD DEL FAQ
// ============================================

function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');

            // Cerrar todas las respuestas
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
            });
            document.querySelectorAll('.faq-answer').forEach(a => {
                a.classList.remove('active');
            });

            // Abrir la respuesta clickeada si no estaba activa
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
}

// ============================================
// CONTADOR ANIMADO DE ESTADÍSTICAS
// ============================================

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = counter.textContent.replace(/[^0-9.]/g, '');
        const isDecimal = target.includes('.');
        const isCurrency = counter.textContent.includes('$');
        const isPercentage = counter.textContent.includes('%');

        let current = 0;
        const increment = parseFloat(target) / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= parseFloat(target)) {
                current = parseFloat(target);
                clearInterval(timer);
            }

            let displayValue = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString();

            if (isCurrency) {
                counter.textContent = '$' + displayValue;
            } else if (isPercentage) {
                counter.textContent = displayValue + '%';
            } else {
                counter.textContent = displayValue;
            }
        }, 30);
    });
}

// ============================================
// SCROLL SUAVE
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ============================================
// NOTIFICACIONES DE ACTIVIDAD (Prueba Social)
// ============================================

const notifications = [
    { name: 'Carlos M.', amount: '$12.50', time: '2 minutos' },
    { name: 'Laura P.', amount: '$8.75', time: '5 minutos' },
    { name: 'Miguel R.', amount: '$15.00', time: '8 minutos' },
    { name: 'Sofia L.', amount: '$6.25', time: '12 minutos' },
    { name: 'Diego F.', amount: '$20.00', time: '15 minutos' }
];

function showNotification() {
    const notification = notifications[Math.floor(Math.random() * notifications.length)];

    const notifElement = document.createElement('div');
    notifElement.className = 'activity-notification';
    notifElement.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <div>
            <strong>${notification.name}</strong> acaba de ganar <strong>${notification.amount}</strong>
            <br><small>Hace ${notification.time}</small>
        </div>
    `;

    document.body.appendChild(notifElement);

    // Mostrar notificación
    setTimeout(() => {
        notifElement.classList.add('show');
    }, 100);

    // Ocultar después de 5 segundos
    setTimeout(() => {
        notifElement.classList.remove('show');
        setTimeout(() => {
            notifElement.remove();
        }, 300);
    }, 5000);
}

// Mostrar notificación cada 15 segundos
setInterval(showNotification, 15000);

// Mostrar primera notificación después de 5 segundos
setTimeout(showNotification, 5000);

// ============================================
// RASTREO DE CLICS EN ENLACES DE AFILIADO
// ============================================

function initAffiliateTracking() {
    const affiliateLinks = document.querySelectorAll('a[href*="#"]');

    affiliateLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const surveyType = this.closest('.card')?.querySelector('h2')?.textContent || 'Unknown';
            trackSurveyClick(surveyType);
        });
    });
}

// ============================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Sitio web cargado correctamente');

    // Inicializar CPX Research
    initCPXResearch();

    // Inicializar Theorem Reach
    initTheoremReach();

    // Inicializar tracking
    initializeTracking();

    // Inicializar FAQ
    initFAQ();

    // Animar contadores cuando sean visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Inicializar scroll suave
    initSmoothScroll();

    // Inicializar tracking de afiliados
    initAffiliateTracking();

    // Rastrear vista de página
    trackEvent('page_view', {
        page: window.location.pathname
    });
});

// ============================================
// UTILIDADES
// ============================================

// Detectar si el usuario está en móvil
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Log para debugging
if (isMobile()) {
    console.log('Usuario en dispositivo móvil');
} else {
    console.log('Usuario en escritorio');
}
