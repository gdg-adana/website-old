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

// Navbar scroll effect & Scroll to Top button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show/hide scroll-to-top button
    if (scrollToTopBtn) {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
});

// Scroll to top click
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

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

// Infinite Sponsors Marquee
function setupMarquee() {
    const track = document.getElementById('sponsorsTrack');
    if (!track) return;

    // Clone items
    const items = Array.from(track.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });

    let position = 0;
    const speed = 0.5; // Adjust speed (higher is faster)

    function animateMarquee() {
        position -= speed;

        // When we've scrolled past half the track's content, reset to 0
        // We use scrollWidth / 2 because we duplicated the items
        if (Math.abs(position) >= track.scrollWidth / 2) {
            position = 0;
        }

        track.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animateMarquee);
    }

    // Start animation
    requestAnimationFrame(animateMarquee);
}

// Initialize marquee when DOM is loaded
document.addEventListener('DOMContentLoaded', setupMarquee);

// FAQ Toggle Logic
function toggleFaq(element) {
    const item = element.parentElement;
    const isActive = item.classList.contains('active');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('active');
        faq.querySelector('.faq-answer').style.maxHeight = null;
    });

    // If it wasn't active, open it
    if (!isActive) {
        item.classList.add('active');
        const answer = item.querySelector('.faq-answer');
        answer.style.maxHeight = answer.scrollHeight + "px";
    }
}
