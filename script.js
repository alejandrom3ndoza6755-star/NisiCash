// ============================================
// SISTEMA DE TRADUCCIÓN (i18n)
// ============================================

const translations = {
    en: {
        pageTitle: 'Earn Money Today | NisiCash',
        navHome: 'Home',
        navHow: 'How It Works',
        navTestimonials: 'Testimonials',
        navAbout: 'About Us',
        navCTA: 'Start Now',
        bannerVerified: 'Verified and secure platforms',
        bannerUsers: 'More than 12,000 active users',
        bannerPayments: 'Guaranteed payments',
        heroBadge: 'Platform #1 in Latin America',
        heroTitle: 'Earn Extra Money',
        heroTitleHighlight: 'From Home',
        heroSubtitle: 'Complete simple surveys and receive real payments via PayPal, Amazon or bank transfer. No initial investment, 100% free.',
        heroBtn1: 'Start Now',
        heroBtn2: 'See How It Works',
        heroStat1: 'Active Users',
        heroStat2: 'Paid This Month',
        heroStat3: 'Rating',
        card1Badge: 'RECOMMENDED',
        card1Title: 'CPX Research Surveys',
        card1Desc: 'Earn between $0.50 and $2.00 for answering simple questions. Low minimum payout.',
        card1EarnPer: 'Per survey',
        card1Time: 'Estimated time',
        card1Tip: '💡 Tip:',
        card1TipDesc: "If you don't see available surveys, try later. Surveys are constantly updated throughout the day.",
        card2Badge: 'LATAM SPECIALIST',
        card2Title: 'Wannads Surveys',
        card2Desc: 'Platform specialized in Latin America. Withdrawal from $20 USD in 7 days.',
        card2EarnPer: 'Per survey',
        card2Time: 'Payment time',
        card2LatamBold: '🌎 Perfect for Latin America & USA:',
        card2LatamDesc: 'Wannads specializes in Latin America and the United States with localized surveys. Fast withdrawal in 7 days.',
        howTitle: 'How Does It Work?',
        step1Title: 'Register for Free',
        step1Desc: 'Click on any survey and complete a quick registration. No credit card required.',
        step2Title: 'Complete Surveys',
        step2Desc: 'Answer simple questions about products, services and your opinion. Takes only minutes.',
        step3Title: 'Receive Your Payment',
        step3Desc: 'Withdraw your money via PayPal, Amazon or bank transfer. Minimum payment from $5.',
        step4Title: 'Earn More',
        step4Desc: 'Invite friends and earn additional commissions. The more you participate, the more you earn.',
        paymentTitle: 'Available Payment Methods',
        paymentBank: 'Bank',
        trustTitle: 'Verified and Secure Platform',
        trustSubtitle: 'We work with the most trusted companies in the industry',
        badge1H4: 'Protected Data',
        badge1P: 'SSL 256-bit encryption',
        badge2H4: 'Secure Payments',
        badge2P: 'Verified by PayPal',
        badge3H4: 'Privacy',
        badge3P: 'GDPR Compliant',
        badge4H4: 'Verified',
        badge4P: 'Registered Company',
        liveBadge: 'LIVE',
        liveH3: 'Users earning right now',
        liveLabel: 'active users',
        testimonialsTitle: 'User Experiences',
        testimonialsNote: 'Results may vary depending on time dedicated and geographic location',
        test1Name: 'Maria R.',
        test1Text: '"Good way to earn extra money in my free time. The surveys are simple and payments arrive."',
        test1Duration: 'User for 3 months',
        test2Name: 'Juan L.',
        test2Text: "\"Perfect to supplement income. You won't get rich, but it's extra money that helps.\"",
        test2Duration: 'User for 5 months',
        test3Name: 'Ana C.',
        test3Text: '"I use it from my phone in spare time. Ideal for students looking for extra income."',
        test3Duration: 'User for 2 months',
        faqTitle: 'Frequently Asked Questions',
        faq1Q: 'Is it really free?',
        faq1A: "Yes, it's 100% free. You don't need to pay anything to register or complete surveys. We will never ask for your credit card information.",
        faq2Q: 'How much can I earn?',
        faq2A: 'It depends on the time you dedicate. On average, our users earn between $50 and $200 per month. Some dedicated users earn more than $500 monthly.',
        faq3Q: 'When do I receive my payment?',
        faq3A: 'Payments are processed between 24-48 hours after requesting withdrawal. The minimum payment is $5 for PayPal and $10 for other methods.',
        faq4Q: 'From which countries can I participate?',
        faq4A: 'We accept users from most countries in Latin America, Spain and the United States. Survey availability may vary by location.',
        faq5Q: 'Do I need prior experience?',
        faq5A: "No, you don't need any experience. The surveys are simple multiple-choice questions about products, services and your personal opinion.",
        faq6Q: 'Can I use my phone?',
        faq6A: 'Yes, our site is optimized for mobile devices. You can complete surveys from your phone, tablet or computer.',
        newsletterTitle: 'Receive Exclusive Offers',
        newsletterDesc: 'Subscribe and receive notifications of the best paid surveys',
        newsletterPlaceholder: 'Your email address',
        newsletterBtn: 'Subscribe',
        newsletterNote: 'No spam. You can cancel at any time.',
        newsletterSuccess: 'Subscription successful! Check your email.',
        newsletterError: 'Please enter a valid email',
        footerDesc: 'Your trusted platform to earn money completing online surveys. We connect users with the best monetization opportunities.',
        footerLinksTitle: 'Quick Links',
        footerLegalTitle: 'Legal',
        footerContactTitle: 'Contact',
        footerLinkHome: 'Home',
        footerLinkAbout: 'About Us',
        footerLinkHow: 'How It Works',
        footerLinkTestimonials: 'Testimonials',
        footerLinkFAQ: 'FAQ',
        footerPrivacy: 'Privacy Policy',
        footerTerms: 'Terms and Conditions',
        footerCookies: 'Cookie Policy',
        footerLegalNotice: 'Legal Notice',
        footerHours: 'Mon-Fri: 9AM-6PM (GMT-6/-5)',
        footerSupport: '24/7 Support',
        footerCopyright: '© 2026 NisiCash - All rights reserved',
        footerBadge1: 'Secure payments',
        footerBadge2: 'Protected data',
        footerBadge3: 'Dedicated support',
        paymentPaypal: '<strong><i class="fab fa-paypal"></i> PayPal</strong><br>Min. withdrawal: $5-$25 USD<br>Processing time: 24-48 hours<br>Fee: Free or 2-3%<br>Available in: 200+ countries',
        paymentAmazon: '<strong><i class="fab fa-amazon"></i> Amazon Gift Cards</strong><br>Min. withdrawal: $5-$10 USD<br>Processing time: Instant to 24 hours<br>Fee: Free<br>Available in: USA, UK, Canada, Mexico, Spain and more',
        paymentBanco: '<strong><i class="fas fa-university"></i> Bank Transfer</strong><br>Min. withdrawal: $50-$100 USD<br>Processing time: 3-7 business days<br>Fee: Varies by country<br>Available in: Most countries',
        paymentGiftcards: '<strong><i class="fas fa-gift"></i> Gift Cards</strong><br>Options: Google Play, iTunes, Steam, Xbox, PlayStation, etc.<br>Min. withdrawal: $5-$10 USD<br>Processing time: Instant to 24 hours<br>Fee: Free',
        notifSpinning: '<i class="fas fa-spinner fa-spin"></i> Sending...',
        dashboardNotice: 'To keep your progress, always access from the same browser and device. Clearing your browser data will reset your history.',
        dashboardSurveys: 'Surveys Completed',
        dashboardEarned: 'Verified Earnings',
        dashboardPending: 'Pending',
        dashboardRecent: 'Recent Transactions',
        dashboardLoading: 'Loading...',
        dashboardError: 'Could not load data. Try again later.',
        dashboardNoTx: 'No transactions yet.',
        txStatusCompleted: 'Completed',
        txStatusPending: 'Pending',
        txStatusReversed: 'Reversed',
        // Referral & Raffle
        raffleActive: 'ACTIVE RAFFLE',
        referralTitle: 'Share and Win $100',
        referralSubtitle: 'Share NisiCash with your friends and automatically enter our monthly raffle for $100 USD!',
        shareTitle: 'Share on Social Media',
        shareDescription: 'Each share = 1 entry to the raffle',
        shareWhatsApp: 'Share on WhatsApp',
        shareFacebook: 'Share on Facebook',
        shareTwitter: 'Share on Twitter',
        shareTelegram: 'Share on Telegram',
        copyLinkTitle: 'Or copy your referral link:',
        copyBtn: 'Copy',
        copied: 'Copied!',
        prizeLabel: 'Monthly Prize',
        yourShares: 'Your Shares',
        yourEntries: 'Your Entries',
        totalParticipants: 'Total Participants',
        raffleEndsIn: 'Raffle ends in:',
        days: 'days',
        hours: 'hours',
        minutes: 'min',
        raffleRules: 'The winner will be randomly selected at the end of the month. You must have an active account to claim your prize.'
    },
    es: {
        pageTitle: 'Gana Dinero Hoy | NisiCash',
        navHome: 'Inicio',
        navHow: 'Cómo Funciona',
        navTestimonials: 'Testimonios',
        navAbout: 'Nosotros',
        navCTA: 'Comenzar Ahora',
        bannerVerified: 'Plataformas verificadas y seguras',
        bannerUsers: 'Más de 12,000 usuarios activos',
        bannerPayments: 'Pagos garantizados',
        heroBadge: 'Plataforma #1 en Latinoamérica',
        heroTitle: 'Gana Dinero Extra',
        heroTitleHighlight: 'Desde Casa',
        heroSubtitle: 'Completa encuestas simples y recibe pagos reales por PayPal, Amazon o transferencia bancaria. Sin inversión inicial, 100% gratis.',
        heroBtn1: 'Empezar Ahora',
        heroBtn2: 'Ver Cómo Funciona',
        heroStat1: 'Usuarios Activos',
        heroStat2: 'Pagados Este Mes',
        heroStat3: 'Valoración',
        card1Badge: 'RECOMENDADO',
        card1Title: 'Encuestas CPX Research',
        card1Desc: 'Gana entre $0.50 y $2.00 por responder preguntas simples. Pago mínimo bajo.',
        card1EarnPer: 'Por encuesta',
        card1Time: 'Tiempo estimado',
        card1Tip: '💡 Consejo:',
        card1TipDesc: 'Si no ves encuestas disponibles, intenta más tarde. Las encuestas se actualizan constantemente durante el día.',
        card2Badge: 'ESPECIALIZADO LATAM',
        card2Title: 'Encuestas Wannads',
        card2Desc: 'Plataforma especializada en América Latina. Retiro desde $20 USD en 7 días.',
        card2EarnPer: 'Por encuesta',
        card2Time: 'Tiempo de pago',
        card2LatamBold: '🌎 Perfecto para Latinoamérica y EE.UU.:',
        card2LatamDesc: 'Wannads se especializa en América Latina y Estados Unidos con encuestas localizadas. Retiro rápido en 7 días.',
        howTitle: '¿Cómo Funciona?',
        step1Title: 'Regístrate Gratis',
        step1Desc: 'Haz clic en cualquier encuesta y completa un registro rápido. No requiere tarjeta de crédito.',
        step2Title: 'Completa Encuestas',
        step2Desc: 'Responde preguntas simples sobre productos, servicios y tu opinión. Toma solo minutos.',
        step3Title: 'Recibe tu Pago',
        step3Desc: 'Retira tu dinero por PayPal, Amazon o transferencia bancaria. Pago mínimo desde $5.',
        step4Title: 'Gana Más',
        step4Desc: 'Invita amigos y gana comisiones adicionales. Mientras más participas, más ganas.',
        paymentTitle: 'Métodos de Pago Disponibles',
        paymentBank: 'Banco',
        trustTitle: 'Plataforma Verificada y Segura',
        trustSubtitle: 'Trabajamos con las empresas más confiables de la industria',
        badge1H4: 'Datos Protegidos',
        badge1P: 'Encriptación SSL 256-bit',
        badge2H4: 'Pagos Seguros',
        badge2P: 'Verificados por PayPal',
        badge3H4: 'Privacidad',
        badge3P: 'GDPR Compliant',
        badge4H4: 'Verificado',
        badge4P: 'Empresa Registrada',
        liveBadge: 'EN VIVO',
        liveH3: 'Usuarios ganando ahora mismo',
        liveLabel: 'usuarios activos',
        testimonialsTitle: 'Experiencias de Usuarios',
        testimonialsNote: 'Los resultados pueden variar según el tiempo dedicado y la ubicación geográfica',
        test1Name: 'María R.',
        test1Text: '"Buena forma de ganar dinero extra en mi tiempo libre. Las encuestas son sencillas y los pagos llegan."',
        test1Duration: 'Usuario desde hace 3 meses',
        test2Name: 'Juan L.',
        test2Text: '"Perfecto para complementar ingresos. No te haces rico, pero es dinero extra que viene bien."',
        test2Duration: 'Usuario desde hace 5 meses',
        test3Name: 'Ana C.',
        test3Text: '"Lo uso desde mi celular en ratos libres. Ideal para estudiantes que buscan ingresos extra."',
        test3Duration: 'Usuario desde hace 2 meses',
        faqTitle: 'Preguntas Frecuentes',
        faq1Q: '¿Es realmente gratis?',
        faq1A: 'Sí, es 100% gratis. No necesitas pagar nada para registrarte ni para completar encuestas. Nunca te pediremos información de tarjeta de crédito.',
        faq2Q: '¿Cuánto puedo ganar?',
        faq2A: 'Depende del tiempo que dediques. En promedio, nuestros usuarios ganan entre $50 y $200 al mes. Algunos usuarios dedicados ganan más de $500 mensuales.',
        faq3Q: '¿Cuándo recibo mi pago?',
        faq3A: 'Los pagos se procesan entre 24-48 horas después de solicitar el retiro. El pago mínimo es de $5 para PayPal y $10 para otros métodos.',
        faq4Q: '¿Desde qué países puedo participar?',
        faq4A: 'Aceptamos usuarios de la mayoría de países de Latinoamérica, España y Estados Unidos. La disponibilidad de encuestas puede variar según tu ubicación.',
        faq5Q: '¿Necesito experiencia previa?',
        faq5A: 'No, no necesitas ninguna experiencia. Las encuestas son simples preguntas de opción múltiple sobre productos, servicios y tu opinión personal.',
        faq6Q: '¿Puedo usar mi celular?',
        faq6A: 'Sí, nuestro sitio está optimizado para dispositivos móviles. Puedes completar encuestas desde tu teléfono, tablet o computadora.',
        newsletterTitle: 'Recibe Ofertas Exclusivas',
        newsletterDesc: 'Suscríbete y recibe notificaciones de las mejores encuestas pagadas',
        newsletterPlaceholder: 'Tu correo electrónico',
        newsletterBtn: 'Suscribirse',
        newsletterNote: 'No spam. Puedes cancelar en cualquier momento.',
        newsletterSuccess: '¡Suscripción exitosa! Revisa tu email.',
        newsletterError: 'Por favor ingresa un email válido',
        footerDesc: 'Tu plataforma confiable para ganar dinero completando encuestas online. Conectamos a usuarios con las mejores oportunidades de monetización.',
        footerLinksTitle: 'Enlaces Rápidos',
        footerLegalTitle: 'Legal',
        footerContactTitle: 'Contacto',
        footerLinkHome: 'Inicio',
        footerLinkAbout: 'Sobre Nosotros',
        footerLinkHow: 'Cómo Funciona',
        footerLinkTestimonials: 'Testimonios',
        footerLinkFAQ: 'Preguntas Frecuentes',
        footerPrivacy: 'Política de Privacidad',
        footerTerms: 'Términos y Condiciones',
        footerCookies: 'Política de Cookies',
        footerLegalNotice: 'Aviso Legal',
        footerHours: 'Lun-Vie: 9AM-6PM (GMT-6/-5)',
        footerSupport: 'Soporte 24/7',
        footerCopyright: '© 2026 NisiCash - Todos los derechos reservados',
        footerBadge1: 'Pagos seguros',
        footerBadge2: 'Datos protegidos',
        footerBadge3: 'Soporte dedicado',
        paymentPaypal: '<strong><i class="fab fa-paypal"></i> PayPal</strong><br>Retiro mínimo: $5-$25 USD<br>Tiempo de procesamiento: 24-48 horas<br>Comisión: Gratis o 2-3%<br>Disponible en: 200+ países',
        paymentAmazon: '<strong><i class="fab fa-amazon"></i> Amazon Gift Cards</strong><br>Retiro mínimo: $5-$10 USD<br>Tiempo de procesamiento: Instantáneo a 24 horas<br>Comisión: Gratis<br>Disponible en: USA, UK, Canadá, México, España y más',
        paymentBanco: '<strong><i class="fas fa-university"></i> Transferencia Bancaria</strong><br>Retiro mínimo: $50-$100 USD<br>Tiempo de procesamiento: 3-7 días hábiles<br>Comisión: Variable según país<br>Disponible en: La mayoría de países',
        paymentGiftcards: '<strong><i class="fas fa-gift"></i> Gift Cards</strong><br>Opciones: Google Play, iTunes, Steam, Xbox, PlayStation, etc.<br>Retiro mínimo: $5-$10 USD<br>Tiempo de procesamiento: Instantáneo a 24 horas<br>Comisión: Gratis',
        notifSpinning: '<i class="fas fa-spinner fa-spin"></i> Enviando...',
        dashboardNotice: 'Para mantener tu progreso, accede siempre desde el mismo navegador y dispositivo. Si borras los datos del navegador, tu historial se reiniciará.',
        dashboardTitle: 'Mi Progreso',
        dashboardSurveys: 'Encuestas Completadas',
        dashboardEarned: 'Ganancias Verificadas',
        dashboardPending: 'Pendiente',
        dashboardRecent: 'Transacciones Recientes',
        dashboardLoading: 'Cargando...',
        dashboardError: 'No se pudieron cargar los datos. Intenta más tarde.',
        dashboardNoTx: 'Sin transacciones aún.',
        txStatusCompleted: 'Completada',
        txStatusPending: 'Pendiente',
        txStatusReversed: 'Revertida',
        // Referral & Raffle
        raffleActive: 'SORTEO ACTIVO',
        referralTitle: 'Comparte y Gana $100',
        referralSubtitle: '¡Comparte NisiCash con tus amigos y participa automáticamente en nuestro sorteo mensual de $100 USD!',
        shareTitle: 'Comparte en Redes Sociales',
        shareDescription: 'Cada compartido = 1 entrada al sorteo',
        shareWhatsApp: 'Compartir en WhatsApp',
        shareFacebook: 'Compartir en Facebook',
        shareTwitter: 'Compartir en Twitter',
        shareTelegram: 'Compartir en Telegram',
        copyLinkTitle: 'O copia tu enlace de referido:',
        copyBtn: 'Copiar',
        copied: '¡Copiado!',
        prizeLabel: 'Premio Mensual',
        yourShares: 'Tus Compartidos',
        yourEntries: 'Tus Entradas',
        totalParticipants: 'Participantes Totales',
        raffleEndsIn: 'El sorteo termina en:',
        days: 'días',
        hours: 'horas',
        minutes: 'min',
        raffleRules: 'El ganador será seleccionado aleatoriamente al final del mes. Debes tener una cuenta activa para reclamar tu premio.'
    }
};

// Get translation helper
function t(key) {
    return (translations[currentLanguage] && translations[currentLanguage][key]) ||
           (translations['en'] && translations['en'][key]) || key;
}

// Initialize language system
function initLanguage() {
    const savedLang = localStorage.getItem('nisicash_language') || 'en';
    setLanguage(savedLang, false);

    // Language option buttons
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const lang = this.getAttribute('data-lang');
            setLanguage(lang, true);
            closeLangDropdown();
        });
    });

    // Toggle dropdown
    const currentBtn = document.querySelector('.lang-current-btn');
    if (currentBtn) {
        currentBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            const dropdown = document.querySelector('.lang-dropdown');
            const isOpen = dropdown.classList.contains('open');
            dropdown.classList.toggle('open', !isOpen);
            this.setAttribute('aria-expanded', !isOpen);
        });
    }

    // Close when clicking outside
    document.addEventListener('click', function () {
        closeLangDropdown();
    });
}

function closeLangDropdown() {
    const dropdown = document.querySelector('.lang-dropdown');
    const btn = document.querySelector('.lang-current-btn');
    if (dropdown) dropdown.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
}

function setLanguage(lang, save) {
    if (!translations[lang]) return;
    currentLanguage = lang;
    if (save) localStorage.setItem('nisicash_language', lang);

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Update page title
    if (translations[lang].pageTitle) {
        document.title = translations[lang].pageTitle;
    }

    // Apply to data-i18n elements (text content)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key] !== undefined) {
            el.textContent = translations[lang][key];
        }
    });

    // Apply to data-i18n-placeholder elements
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key] !== undefined) {
            el.placeholder = translations[lang][key];
        }
    });

    // Update lang button UI
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    const flagEl = document.querySelector('.lang-current-flag');
    const codeEl = document.querySelector('.lang-current-code');
    if (lang === 'en') {
        if (flagEl) flagEl.textContent = '🇺🇸';
        if (codeEl) codeEl.textContent = 'EN';
    } else if (lang === 'es') {
        if (flagEl) flagEl.textContent = '🇪🇸';
        if (codeEl) codeEl.textContent = 'ES';
    }
}

// ============================================
// CONFIGURACIÓN DE CPX RESEARCH
// ============================================

const CPX_CONFIG = {
    appId: '32674',
    // NOTA DE SEGURIDAD: Esta clave es usada para generar el hash de verificación del usuario.
    // Aunque está expuesta en el frontend (necesario para generar la URL del iframe),
    // CPX Research valida también el hash en el servidor desde el postback.
    // Para mayor seguridad, considera mover la generación del hash a tu backend
    // y pasar solo la URL final al iframe mediante una llamada a tu API.
    secureHashKey: 'CNyYOocHuRrNRRqsUueyBCOQ9ZtzaHFN'
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
    apiKey: '69fb8078c7980765005934',
    secret: '8ce7087919',
    apiSecret: '981a7c7380'
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
    const userId = getUserId();
    
    // Construir URL del iframe de Wannads (Surveywall)
    const wannadsUrl = new URL('https://earn.wannads.com/surveywall');
    wannadsUrl.searchParams.set('apiKey', WANNADS_CONFIG.apiKey);
    wannadsUrl.searchParams.set('userId', userId);
    
    // Establecer URL del iframe
    const iframe = document.getElementById('wannads-iframe');
    if (iframe) {
        iframe.src = wannadsUrl.toString();
        console.log('✅ Wannads inicializado para usuario:', userId);
        console.log('URL:', wannadsUrl.toString());
        
        // Tracking
        trackEvent('wannads_offerwall_loaded', {
            user_id: userId
        });
    }
}

// ============================================
// CONFIGURACIÓN DE TRACKING
// ============================================

// Google Analytics
// Para activar: reemplaza 'G-XXXXXXXXXX' con tu Measurement ID real.
// Obtén tu ID en: https://analytics.google.com → Admin → Data Streams → Web Stream
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Reemplazar con tu ID de GA4

// Facebook Pixel
// Para activar: reemplaza 'XXXXXXXXXX' con tu Pixel ID real.
// Obtén tu ID en: https://business.facebook.com → Events Manager → Connect Data Source
const FB_PIXEL_ID = 'XXXXXXXXXX'; // TODO: Reemplazar con tu Facebook Pixel ID

// ============================================
// INICIALIZACIÓN DE TRACKING
// ============================================

function initializeTracking() {
    // Google Analytics
    if (GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
        initGoogleAnalytics();
    } else {
        console.warn('⚠️ Google Analytics no configurado. Reemplaza GA_MEASUREMENT_ID en script.js con tu Measurement ID real (Ej: G-ABC123DEF4). Obtén el tuyo en https://analytics.google.com');
    }

    // Facebook Pixel
    if (FB_PIXEL_ID !== 'XXXXXXXXXX') {
        initFacebookPixel();
    } else {
        console.warn('⚠️ Facebook Pixel no configurado. Reemplaza FB_PIXEL_ID en script.js con tu Pixel ID real. Obtén el tuyo en https://business.facebook.com → Events Manager');
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
// PROGRESS DASHBOARD
// ============================================

// API base URL — empty string means same origin (works on any deployment: prod, preview, local)
const VERCEL_BASE_URL = '';

function renderTransactions(history) {
    const container = document.getElementById('transactions-list');
    if (!container) return;
    const last5 = [...history].reverse().slice(0, 5);
    if (last5.length === 0) {
        container.innerHTML = `<p style="text-align:center; color: var(--text-light); padding: 1rem;" data-i18n="dashboardNoTx">${t('dashboardNoTx')}</p>`;
        return;
    }
    const statusColors = { completed: 'var(--secondary-color)', pending: 'var(--accent-color)', reversed: 'var(--danger-color)' };
    const rows = last5.map(tx => {
        const date = new Date(tx.date).toLocaleDateString(currentLanguage === 'es' ? 'es-MX' : 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        const statusLabel = t('txStatus' + tx.status.charAt(0).toUpperCase() + tx.status.slice(1)) || tx.status;
        const color = statusColors[tx.status] || 'var(--text-secondary)';
        return `<div style="display:flex; align-items:center; justify-content:space-between; padding:0.75rem; border-bottom:1px solid var(--border-color); flex-wrap:wrap; gap:0.5rem;">
            <span style="font-size:0.8rem; color:var(--text-light); min-width:110px;">${date}</span>
            <span style="font-size:0.8rem; background:var(--light-bg); border-radius:6px; padding:2px 8px; text-transform:uppercase; font-weight:600; color:var(--primary-color);">${tx.platform}</span>
            <span style="font-weight:700; color:var(--text-primary);">$${tx.amount.toFixed(2)}</span>
            <span style="font-size:0.8rem; color:${color}; font-weight:600;">${statusLabel}</span>
        </div>`;
    }).join('');
    container.innerHTML = rows;
}

async function loadDashboardData() {
    const userId = getUserId();
    const container = document.getElementById('transactions-list');
    try {
        const res = await fetch(`${VERCEL_BASE_URL}/api/user-stats?user_id=${encodeURIComponent(userId)}`);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        const surveyEl = document.getElementById('stat-surveys');
        const earnedEl = document.getElementById('stat-earned');
        const pendingEl = document.getElementById('stat-pending');
        if (surveyEl) surveyEl.textContent = data.surveys_completed || 0;
        if (earnedEl) earnedEl.textContent = '$' + ((data.total_earned || 0).toFixed(2));
        if (pendingEl) pendingEl.textContent = '$' + ((data.pending_earned || 0).toFixed(2));
        renderTransactions(data.history || []);
    } catch (err) {
        console.warn('Dashboard load failed:', err);
        if (container) {
            container.innerHTML = `<p style="text-align:center; color:var(--danger-color); padding:1rem;" data-i18n="dashboardError">${t('dashboardError')}</p>`;
        }
        const surveyEl = document.getElementById('stat-surveys');
        const earnedEl = document.getElementById('stat-earned');
        const pendingEl = document.getElementById('stat-pending');
        if (surveyEl) surveyEl.textContent = '-';
        if (earnedEl) earnedEl.textContent = '-';
        if (pendingEl) pendingEl.textContent = '-';
    }
}

function initProgressDashboard() {
    loadDashboardData();
    setInterval(loadDashboardData, 30000);
}

// ============================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('NisiCash loaded');

    // Inicializar sistema de idiomas (PRIMERO)
    initLanguage();

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

    // Inicializar Wannads
    initWannads();

    // Inicializar Progress Dashboard
    initProgressDashboard();

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
        paypal:    { text: t('paymentPaypal') },
        amazon:    { text: t('paymentAmazon') },
        banco:     { text: t('paymentBanco') },
        giftcards: { text: t('paymentGiftcards') }
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
            showNotification(t('newsletterError'), 'error');
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
            
            showNotification(t('newsletterSuccess'), 'success');
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


// ============================================
// REFERRAL & RAFFLE SYSTEM
// ============================================

// Generate or get unique user ID
function getUserId() {
  let userId = localStorage.getItem('nisicash_user_id');
  if (!userId) {
    userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('nisicash_user_id', userId);
  }
  return userId;
}

// Generate referral link
function generateReferralLink() {
  const userId = getUserId();
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?ref=${userId}`;
}

// Share on WhatsApp
function shareOnWhatsApp() {
  const userId = getUserId();
  const text = encodeURIComponent('¡Gana dinero completando encuestas! 💰\n\nÚnete a NisiCash y empieza a ganar hoy mismo. Es 100% gratis ✅\n\nRegistrate aquí: ' + generateReferralLink());
  const url = `https://wa.me/?text=${text}`;
  
  recordShare('whatsapp');
  window.open(url, '_blank');
}

// Share on Facebook
function shareOnFacebook() {
  const userId = getUserId();
  const url = encodeURIComponent(generateReferralLink());
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  
  recordShare('facebook');
  window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Share on Twitter
function shareOnTwitter() {
  const userId = getUserId();
  const text = encodeURIComponent('💰 ¡Gana dinero con encuestas online! Únete a NisiCash 👉');
  const url = encodeURIComponent(generateReferralLink());
  const hashtags = 'GanarDinero,EncuestasPagadas,DineroOnline';
  const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtags}`;
  
  recordShare('twitter');
  window.open(twitterUrl, '_blank', 'width=600,height=400');
}

// Share on Telegram
function shareOnTelegram() {
  const userId = getUserId();
  const text = encodeURIComponent('💰 ¡Gana dinero completando encuestas!\n\nÚnete a NisiCash y empieza a ganar hoy mismo:\n' + generateReferralLink());
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(generateReferralLink())}&text=${text}`;
  
  recordShare('telegram');
  window.open(telegramUrl, '_blank');
}

// Copy referral link
function copyReferralLink() {
  const input = document.getElementById('referralLink');
  input.select();
  input.setSelectionRange(0, 99999); // For mobile devices
  
  try {
    document.execCommand('copy');
    
    // Change button text temporarily
    const btn = event.target.closest('.copy-btn');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> <span data-i18n="copied">Copied!</span>';
    btn.style.background = '#27ae60';
    
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
    }, 2000);
    
    recordShare('copy');
  } catch (err) {
    console.error('Failed to copy:', err);
    alert('Failed to copy link. Please copy manually.');
  }
}

// Record share to backend
async function recordShare(platform) {
  const userId = getUserId();
  
  try {
    const response = await fetch('/api/record-share', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userId,
        platform: platform
      })
    });

    if (response.ok) {
      const data = await response.json();
      // Update UI with new stats
      updateReferralStats();
      
      // Show success notification
      showNotification(`¡Compartido! Ahora tienes ${data.raffle_entries} ${data.raffle_entries === 1 ? 'entrada' : 'entradas'} para el sorteo 🎉`);
    }
  } catch (error) {
    console.error('Error recording share:', error);
  }
}

// Update referral stats
async function updateReferralStats() {
  const userId = getUserId();
  
  try {
    const response = await fetch(`/api/get-referral-stats?user_id=${userId}`);
    
    if (response.ok) {
      const data = await response.json();
      
      // Update user stats
      document.getElementById('userShares').textContent = data.user.total_shares;
      document.getElementById('userEntries').textContent = data.user.raffle_entries;
      document.getElementById('totalParticipants').textContent = data.global.total_participants;
      
      // Update raffle timer
      if (data.global.raffle_end_date) {
        startRaffleCountdown(data.global.raffle_end_date);
      }
    }
  } catch (error) {
    console.error('Error fetching referral stats:', error);
  }
}

// Raffle countdown timer
function startRaffleCountdown(endDate) {
  const end = new Date(endDate).getTime();
  
  function updateTimer() {
    const now = new Date().getTime();
    const distance = end - now;
    
    if (distance < 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  }
  
  updateTimer();
  setInterval(updateTimer, 60000); // Update every minute
}

// Show notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    z-index: 10000;
    font-weight: 600;
    animation: slideIn 0.3s ease-out;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Initialize referral system on page load
document.addEventListener('DOMContentLoaded', function() {
  // Set referral link
  const referralLink = document.getElementById('referralLink');
  if (referralLink) {
    referralLink.value = generateReferralLink();
  }
  
  // Load referral stats
  updateReferralStats();
  
  // Check if user came from a referral link
  const urlParams = new URLSearchParams(window.location.search);
  const refId = urlParams.get('ref');
  if (refId && refId !== getUserId()) {
    // Store referrer information
    localStorage.setItem('nisicash_referrer', refId);
    
    // Show welcome message
    showNotification('¡Bienvenido! Has sido referido por un amigo 🎉');
  }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
