let currentTheme = 'dark';
let currentLang = 'tr';

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

function setLanguage(lang) {
    const desktopLangToggle = document.getElementById('desktopLangToggle');
    const mobileLangToggle = document.getElementById('mobileLangToggle');
    const elementsToTranslate = document.querySelectorAll('.translate');
    currentLang = lang;

    if (lang === 'tr') {
        desktopLangToggle.textContent = 'TR';
        mobileLangToggle.innerHTML = '<span class="translate" data-tr="Türkçe">Türkçe</span>';
        elementsToTranslate.forEach(el => {
            const trText = el.getAttribute('data-tr');
            if (trText) {
                el.textContent = trText;
            }
        });
    } else {
        desktopLangToggle.textContent = 'EN';
        mobileLangToggle.innerHTML = '<span class="translate" data-en="English">English</span>';
        elementsToTranslate.forEach(el => {
            const enText = el.getAttribute('data-en');
            if (enText) {
                el.textContent = enText;
            }
        });
    }
}

function toggleLanguage() {
    if (currentLang === 'en') {
        setLanguage('tr');
    } else {
        setLanguage('en');
    }
}

function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.toLowerCase().startsWith('en')) {
        setLanguage('en');
    } else {
        setLanguage('tr');
    }
}

detectBrowserLanguage();

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');
const slideInterval = 5000; // 5 seconds
let slideTimer;

function goToSlide(index) {
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (index + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    resetSlideTimer();
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function resetSlideTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, slideInterval);
}

// Initialize slider events
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        goToSlide(parseInt(dot.getAttribute('data-index')));
    });
});

if (slides.length > 0) {
    resetSlideTimer();
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Theme toggle
function toggleTheme() {
    const body = document.body;
    const theme = document.getElementById('theme');
    const mobileTheme = document.getElementById('mobileTheme');
    if (currentTheme === 'dark') {
        body.classList.add('light-mode');
        theme.setAttribute("src", "images/light-mode.png");
        mobileTheme.setAttribute("src", "images/light-mode.png");
        currentTheme = 'light';
    } else {
        body.classList.remove('light-mode');
        theme.setAttribute("src", "images/night-mode.png");
        mobileTheme.setAttribute("src", "images/night-mode.png");
        currentTheme = 'dark';
    }
}

// FAQ toggle
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const allFaqs = document.querySelectorAll('.faq-item');
    allFaqs.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
    faqItem.classList.toggle('active');
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});



// Event listeners
document.getElementById('desktopLangToggle').addEventListener('click', toggleLanguage);
document.getElementById('mobileLangToggle').addEventListener('click', toggleLanguage);
document.getElementById('themeToggle').addEventListener('click', toggleTheme);
document.getElementById('mobileThemeToggle').addEventListener('click', toggleTheme);
