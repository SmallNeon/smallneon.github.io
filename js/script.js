// JavaScript for portfolio site

// Language toggle functionality
let currentLanguage = 'en';

// Auto-detect browser language on page load
function detectBrowserLanguage() {
    // Get browser language
    const browserLang = navigator.language || navigator.userLanguage;
    
    // Check if browser language is Chinese (simplified or traditional)
    if (browserLang.startsWith('zh')) {
        return 'zh';
    }
    
    // Default to English for all other languages
    return 'en';
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'zh' : 'en';
    updateLanguageContent();
    updateLanguageButton();
    
    // Store user's language preference in localStorage
    localStorage.setItem('preferredLanguage', currentLanguage);
}

function updateLanguageContent() {
    const elements = document.querySelectorAll('[data-en][data-zh]');
    
    elements.forEach(element => {
        const enText = element.getAttribute('data-en');
        const zhText = element.getAttribute('data-zh');
        
        if (currentLanguage === 'zh') {
            element.textContent = zhText;
        } else {
            element.textContent = enText;
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en';
}

function updateLanguageButton() {
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.textContent = currentLanguage === 'en' ? '中文' : 'English';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize language based on user preference or browser language
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        // Use saved preference if available
        currentLanguage = savedLanguage;
    } else {
        // Auto-detect browser language
        currentLanguage = detectBrowserLanguage();
    }
    
    // Update content and button based on detected/saved language
    updateLanguageContent();
    updateLanguageButton();

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Sticky navigation on scroll
    const navbar = document.getElementById('navbar');
    let scrollPosition = window.scrollY;

    window.addEventListener('scroll', function() {
        scrollPosition = window.scrollY;
        
        if (scrollPosition > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('#navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});
