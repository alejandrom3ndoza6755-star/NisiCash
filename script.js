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
