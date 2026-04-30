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

// ============================================
// CONFIGURACIÓN DE POLLFISH
// ============================================

const POLLFISH_CONFIG = {
    apiKey: 'YOUR_POLLFISH_API_KEY', // TODO: Reemplazar con tu API Key de Pollfish
    publisherId: 'YOUR_PUBLISHER_ID' // TODO: Reemplazar con tu Publisher ID
};

// ============================================
// CONFIGURACIÓN DE WANNADS
// ============================================

const WANNADS_CONFIG = {
    publisherId: 'YOUR_WANNADS_PUBLISHER_ID', // TODO: Reemplazar con tu Publisher ID de Wannads
    apiKey: 'YOUR_WANNADS_API_KEY' // TODO: Reemplazar con tu API Key
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
// INICIALIZAR POLLFISH
// ============================================

// Inicializar Pollfish Offerwall
function initPollfish() {
    // Verificar si las credenciales están configuradas
    if (POLLFISH_CONFIG.apiKey === 'YOUR_POLLFISH_API_KEY') {
        console.warn('⚠️ Pollfish no configurado. Por favor agrega tu API Key.');
        const container = document.getElementById('pollfish-offerwall');
        if (container) {
            container.innerHTML = `
                <div style="background: #fff3cd; padding: 20px; border-radius: 8px; text-align: center; border: 2px dashed #ffc107;">
                    <i class="fas fa-exclamation-triangle" style="color: #ffc107; font-size: 2rem; margin-bottom: 10px;"></i>
                    <h3 style="color: #856404; margin: 10px 0;">Configuración Pendiente</h3>
                    <p style="color: #856404; margin: 10px 0;">
                        Para activar Pollfish, necesitas:
                    </p>
                    <ol style="text-align: left; display: inline-block; color: #856404;">
                        <li>Registrarte en <a href="https://www.pollfish.com/publisher" target="_blank" style="color: #007bff;">Pollfish Publisher</a></li>
                        <li>Crear una aplicación web</li>
                        <li>Obtener tu API Key</li>
                        <li>Configurar el postback URL: <code>https://nisi-cash.vercel.app/api/pollfish-postback</code></li>
                        <li>Agregar las credenciales en script.js</li>
                    </ol>
                </div>
            `;
        }
        return;
    }

    const userId = getUserId();
    
    // Pollfish usa un SDK JavaScript, no iframe
    // Cargar el SDK de Pollfish
    const script = document.createElement('script');
    script.src = 'https://storage.googleapis.com/pollfish_production/sdk/webplugin/pollfish.min.js';
    script.onload = function() {
        // Inicializar Pollfish
        if (typeof Pollfish !== 'undefined') {
            Pollfish.init({
                api_key: POLLFISH_CONFIG.apiKey,
                debug: false,
                ready: function() {
                    console.log('✅ Pollfish inicializado correctamente');
                    trackEvent('pollfish_offerwall_loaded', { user_id: userId });
                },
                userNotEligible: function() {
                    console.log('⚠️ Usuario no elegible para encuestas de Pollfish');
                    showPollfishMessage('No hay encuestas disponibles en este momento. Intenta más tarde.');
                },
                surveyCompleted: function(data) {
                    console.log('✅ Encuesta de Pollfish completada:', data);
                    trackEvent('pollfish_survey_completed', { 
                        user_id: userId,
                        cpa: data.cpa 
                    });
                    showNotification(`¡Encuesta completada! Ganaste $${data.cpa}`, 'success');
                },
                surveyNotAvailable: function() {
                    console.log('⚠️ No hay encuestas disponibles en Pollfish');
                    showPollfishMessage('No hay encuestas disponibles ahora. Vuelve más tarde.');
                }
            });
        }
    };
    document.head.appendChild(script);
}

function showPollfishMessage(message) {
    const container = document.getElementById('pollfish-offerwall');
    if (container) {
        container.innerHTML = `
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
                <i class="fas fa-info-circle" style="color: #3498db; font-size: 2rem; margin-bottom: 10px;"></i>
                <p style="color: #2c3e50; margin: 10px 0;">${message}</p>
            </div>
        `;
    }
}

// ============================================
// INICIALIZAR WANNADS
// ============================================

// Inicializar Wannads Offerwall
function initWannads() {
    // Verificar si las credenciales están configuradas
    if (WANNADS_CONFIG.publisherId === 'YOUR_WANNADS_PUBLISHER_ID') {
        console.warn('⚠️ Wannads no configurado. Por favor agrega tu Publisher ID.');
        const container = document.getElementById('wannads-offerwall');
        if (container) {
            container.innerHTML = `
                <div style="background: #fff3cd; padding: 20px; border-radius: 8px; text-align: center; border: 2px dashed #ffc107;">
                    <i class="fas fa-exclamation-triangle" style="color: #ffc107; font-size: 2rem; margin-bottom: 10px;"></i>
                    <h3 style="color: #856404; margin: 10px 0;">Configuración Pendiente</h3>
                    <p style="color: #856404; margin: 10px 0;">
                        Para activar Wannads, necesitas:
                    </p>
                    <ol style="text-align: left; display: inline-block; color: #856404;">
                        <li>Registrarte en <a href="https://wannads.com/publishers" target="_blank" style="color: #007bff;">Wannads Publishers</a></li>
                        <li>Crear una aplicación/sitio web</li>
                        <li>Obtener tu Publisher ID</li>
                        <li>Configurar el postback URL: <code>https://nisi-cash.vercel.app/api/wannads-postback</code></li>
                        <li>Agregar las credenciales en script.js</li>
                    </ol>
                </div>
            `;
        }
        return;
    }

    const userId = getUserId();
    
    // Construir URL del iframe de Wannads
    const wannadsUrl = new URL('https://wall.wannads.com/wall');
    wannadsUrl.searchParams.set('pub_id', WANNADS_CONFIG.publisherId);
    wannadsUrl.searchParams.set('user_id', userId);
    wannadsUrl.searchParams.set('iframe', '1');
    
    // Establecer URL del iframe
    const iframe = document.getElementById('wannads-iframe');
    if (iframe) {
        iframe.src = wannadsUrl.toString();
        console.log('Wannads inicializado para usuario:', userId);
        
        // Tracking
        trackEvent('wannads_offerwall_loaded', {
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
// NOTIFICACIONES DE ACTIVIDAD - DESACTIVADAS
// ============================================
// Las notificaciones falsas pueden dañar la credibilidad del sitio.
// Si deseas mostrar actividad real, considera integrar datos reales de las APIs.

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

    // Inicializar navbar
    initNavbar();

    // Inicializar contador en vivo
    initLiveCounter();

    // Inicializar newsletter
    initNewsletter();

    // Inicializar animaciones al scroll
    initScrollAnimations();

    // Inicializar lazy loading
    initLazyLoading();

    // Inicializar CPX Research
    initCPXResearch();

    // Inicializar Theorem Reach
    initTheoremReach();

    // Inicializar Pollfish
    initPollfish();

    // Inicializar Wannads
    initWannads();

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
// NAVBAR FUNCIONALIDAD
// ============================================

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// ============================================
// CONTADOR EN VIVO
// ============================================

function initLiveCounter() {
    const counterElement = document.getElementById('liveCounter');
    if (!counterElement) return;

    // Generar número base aleatorio entre 800-950 en cada carga
    const baseNumber = Math.floor(Math.random() * (950 - 800 + 1)) + 800;
    
    // Usar sessionStorage para mantener durante la sesión pero cambiar en nueva pestaña
    let currentCount = sessionStorage.getItem('liveUserCount');
    
    if (!currentCount) {
        currentCount = baseNumber;
        sessionStorage.setItem('liveUserCount', currentCount);
    } else {
        currentCount = parseInt(currentCount);
        // Pequeña variación si ya existe
        currentCount = Math.max(800, Math.min(950, currentCount + Math.floor(Math.random() * 21) - 10));
        sessionStorage.setItem('liveUserCount', currentCount);
    }
    
    // Mostrar número inicial con animación
    animateCounterValue(counterElement, 0, currentCount, 2000);
    
    // Actualizar contador cada 5-15 segundos con variación aleatoria
    setInterval(() => {
        const change = Math.floor(Math.random() * 10) - 3; // -3 a +6
        const newCount = Math.max(800, Math.min(950, currentCount + change));
        
        if (newCount !== currentCount) {
            animateCounterValue(counterElement, currentCount, newCount, 800);
            currentCount = newCount;
            sessionStorage.setItem('liveUserCount', currentCount);
        }
    }, Math.random() * 10000 + 5000); // Entre 5 y 15 segundos
}

// Función auxiliar para animar el contador
function animateCounterValue(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function para animación suave
        const easeProgress = progress < 0.5 
            ? 2 * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        const current = Math.floor(start + (end - start) * easeProgress);
        element.textContent = current;
        
        // Efecto de escala durante la animación
        const scale = 1 + Math.sin(progress * Math.PI) * 0.05;
        element.style.transform = `scale(${scale})`;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.style.transform = 'scale(1)';
        }
    }
    
    requestAnimationFrame(update);
}

// ============================================
// INFORMACIÓN DE MÉTODOS DE PAGO
// ============================================

function showPaymentInfo(method) {
    const infoBox = document.getElementById('paymentInfo');
    const infoText = document.getElementById('paymentInfoText');
    
    const paymentInfo = {
        paypal: {
            icon: 'fab fa-paypal',
            color: '#00457C',
            title: 'PayPal',
            text: '<strong><i class="fab fa-paypal"></i> PayPal</strong><br>Retiro mínimo: $5-$25 USD (según plataforma)<br>Tiempo de procesamiento: 24-48 horas<br>Comisión: Gratis o 2-3%<br>Disponible en: 200+ países'
        },
        amazon: {
            icon: 'fab fa-amazon',
            color: '#FF9900',
            title: 'Amazon',
            text: '<strong><i class="fab fa-amazon"></i> Amazon Gift Cards</strong><br>Retiro mínimo: $5-$10 USD<br>Tiempo de procesamiento: Instantáneo a 24 horas<br>Comisión: Gratis<br>Disponible en: USA, UK, Canadá, México, España y más'
        },
        banco: {
            icon: 'fas fa-university',
            color: '#2ecc71',
            title: 'Transferencia Bancaria',
            text: '<strong><i class="fas fa-university"></i> Transferencia Bancaria</strong><br>Retiro mínimo: $50-$100 USD<br>Tiempo de procesamiento: 3-7 días hábiles<br>Comisión: Variable según país<br>Disponible en: La mayoría de países'
        },
        giftcards: {
            icon: 'fas fa-gift',
            color: '#e74c3c',
            title: 'Gift Cards',
            text: '<strong><i class="fas fa-gift"></i> Gift Cards</strong><br>Opciones: Google Play, iTunes, Steam, Xbox, PlayStation, etc.<br>Retiro mínimo: $5-$10 USD<br>Tiempo de procesamiento: Instantáneo a 24 horas<br>Comisión: Gratis'
        }
    };
    
    const info = paymentInfo[method];
    if (info) {
        infoText.innerHTML = info.text;
        infoBox.style.display = 'block';
        
        // Scroll suave hacia la información
        infoBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Efecto de aparición
        infoBox.style.opacity = '0';
        infoBox.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            infoBox.style.transition = 'all 0.3s ease';
            infoBox.style.opacity = '1';
            infoBox.style.transform = 'translateY(0)';
        }, 10);
    }
}

// ============================================
// NEWSLETTER FORM
// ============================================

function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = document.getElementById('newsletterEmail');
        const email = emailInput.value;
        
        // Validar email
        if (!isValidEmail(email)) {
            showNotification('Por favor ingresa un email válido', 'error');
            return;
        }
        
        // Simular envío (aquí conectarías con tu backend)
        const button = form.querySelector('.btn-newsletter');
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        button.disabled = true;
        
        setTimeout(() => {
            // Guardar en localStorage
            localStorage.setItem('newsletter_email', email);
            
            showNotification('¡Suscripción exitosa! Revisa tu email.', 'success');
            emailInput.value = '';
            button.innerHTML = originalText;
            button.disabled = false;
            
            // Tracking
            trackEvent('newsletter_signup', {
                email: email,
                timestamp: new Date().toISOString()
            });
        }, 1500);
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// SISTEMA DE NOTIFICACIONES
// ============================================

function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? 'check-circle' : 
                 type === 'error' ? 'exclamation-circle' : 
                 'info-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ============================================
// ANIMACIONES AL SCROLL (Intersection Observer)
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos
    document.querySelectorAll('.card, .testimonial-card, .step, .badge-item, .partner-logo').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// LAZY LOADING DE IFRAMES
// ============================================

function initLazyLoading() {
    const iframes = document.querySelectorAll('iframe[data-src]');
    
    const iframeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                iframe.src = iframe.dataset.src;
                iframeObserver.unobserve(iframe);
            }
        });
    });
    
    iframes.forEach(iframe => iframeObserver.observe(iframe));
}

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
