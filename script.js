/*
===============================================
MODERN DEVELOPER PORTFOLIO - JAVASCRIPT
===============================================
Interactive functionality for the portfolio template:
- Dark/Light theme toggle with persistence
- Smooth scrolling navigation
- CV download functionality
- Scroll-based navbar effects
- Scroll animations for elements
- Typing effect for hero title

Author: Portfolio Template
Version: 1.0
License: Commercial Use Allowed
===============================================
*/

// THEME TOGGLE FUNCTIONALITY
// Handles switching between dark and light modes with localStorage persistence

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);

/**
 * Updates the theme toggle icon based on current theme
 * @param {string} theme - Current theme ('light' or 'dark')
 */
function updateThemeIcon(theme) {
    if (theme === 'light') {
        themeIcon.className = 'fas fa-moon';
    } else {
        themeIcon.className = 'fas fa-sun';
    }
}

// Initialize icon on page load
updateThemeIcon(currentTheme);

// Theme toggle event listener with smooth animation
themeToggle.addEventListener('click', function() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Apply new theme
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Add subtle button animation feedback
    themeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 150);
});

// SMOOTH SCROLLING NAVIGATION
// Enables smooth scrolling when clicking navigation links

// Only enable smooth scrolling for anchors that target real IDs
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const selector = this.getAttribute('href');
        let target = null;
        try {
            target = document.querySelector(selector);
        } catch (err) {
            target = null;
        }

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// CV DOWNLOAD FUNCTIONALITY
// Handles CV download for both hero and footer buttons
// CUSTOMIZATION: Update the CV file path and name

document.getElementById('download-cv').addEventListener('click', function(e) {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = 'assets/Khadija_Belmouden_CV.pdf'; 
    link.download = 'Khadija_Belmouden_CV.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
});

// Footer CV download button (same functionality)
document.getElementById('download-cv-footer').addEventListener('click', function(e) {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = 'assets/Khadija_Belmouden_CV.pdf';
    link.download = 'Khadija_Belmouden_CV.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
});

// DYNAMIC NAVBAR SCROLL EFFECT
// Changes navbar opacity based on scroll position and current theme

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const currentTheme = body.getAttribute('data-theme');
    
    // Increase opacity when scrolled down for better readability
    if (window.scrollY > 100) {
        if (currentTheme === 'light') {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        }
    } else {
        if (currentTheme === 'light') {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    }
});

// SCROLL-TRIGGERED ANIMATIONS
// Animates elements when they come into viewport using Intersection Observer

const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Start animation 50px before element enters viewport
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate element into view
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item');
    
    animateElements.forEach(el => {
        // Set initial state (hidden and moved down)
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// TYPING EFFECT FOR HERO TITLE
// Creates a typewriter effect for the main hero title

/**
 * Creates a typing animation effect
 * @param {HTMLElement} element - The element to apply the effect to
 * @param {string} text - The text to type out
 * @param {number} speed - Typing speed in milliseconds (default: 100)
 */
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150); // 150ms delay between characters
    }
});

// GET IN TOUCH BUTTON HANDLER
// Ensures clicking the Get In Touch button opens the user's mail client,
// and copies the email to clipboard as a fallback.
const getInTouchBtn = document.getElementById('get-in-touch');
if (getInTouchBtn) {
    getInTouchBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const email = 'khadijabelmouden19@gmail.com';
        alert('the email : ' + email);
    });
}