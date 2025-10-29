// ===========================================
// IMAGE MODAL FUNCTIONALITY
// ===========================================

const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.querySelector('.modal-close');

function openImageModal(src) {
    modalImg.src = src;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Add click listeners to images
document.querySelectorAll('.profile-img').forEach(img => {
    img.addEventListener('click', function() {
        openImageModal(this.src);
    });
});

document.querySelectorAll('.project-img').forEach(img => {
    img.addEventListener('click', function() {
        openImageModal(this.src);
    });
});

document.querySelectorAll('.project-image-wrapper img').forEach(img => {
    img.addEventListener('click', function() {
        openImageModal(this.src);
    });
});

// Modal close handlers
closeBtn?.addEventListener('click', closeImageModal);

modal?.addEventListener('click', function(e) {
    if (e.target === modal) closeImageModal();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal?.classList.contains('show')) {
        closeImageModal();
    }
});

// ===========================================
// STARS BACKGROUND ANIMATION
// ===========================================

function generateStars() {
    const starsContainer = document.getElementById('starsContainer');
    if (!starsContainer) return;
    
    const numStars = 50;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        starsContainer.appendChild(star);
    }
}

// ===========================================
// MOUSE TRAIL EFFECT
// ===========================================

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'mouse-trail';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    
    const core = document.createElement('div');
    core.className = 'sparkle-core';
    sparkle.appendChild(core);
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.parentNode?.removeChild(sparkle), 600);
}

let lastMouseTime = 0;
let animationFrameId;

document.addEventListener('mousemove', function(e) {
    const now = Date.now();
    if (now - lastMouseTime > 50) {
        lastMouseTime = now;
        
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        
        animationFrameId = requestAnimationFrame(() => {
            createSparkle(e.clientX, e.clientY);
        });
    }
}, { passive: true });


// ===========================================
// CONTACT FORM SUBMISSION
// ===========================================

const form = document.querySelector('form');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = form.querySelector('[name="name"]').value;
        const email = form.querySelector('[name="email"]').value;
        const subject = form.querySelector('[name="subject"]').value;
        const message = form.querySelector('[name="message"]').value;
        
        const mailtoLink = `mailto:lukiclazar.dev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        window.location.href = mailtoLink;
        form.reset();
    });
}

// ===========================================
// BACK TO TOP BUTTON
// ===========================================

const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    let ticking = false;
    
    function updateBackToTop() {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateBackToTop);
            ticking = true;
        }
    }, { passive: true });
}

// ===========================================
// HAMBURGER MENU
// ===========================================

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ===========================================
// THEME TOGGLE
// ===========================================

const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

function updateThemeIcon(theme) {
    if (sunIcon && moonIcon) {
        sunIcon.style.display = theme === 'light' ? 'none' : 'block';
        moonIcon.style.display = theme === 'light' ? 'block' : 'none';
    }
}

updateThemeIcon(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

// ===========================================
// SKILL BARS ANIMATION
// ===========================================

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    if (skillBars.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                
                requestAnimationFrame(() => {
                    bar.style.setProperty('--skill-width', width + '%');
                    bar.style.width = width + '%';
                });
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.1 });
    
    skillBars.forEach((bar) => {
        observer.observe(bar);
    });
}

// ===========================================
// INITIALIZATION
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    generateStars();
    setTimeout(animateSkillBars, 500);
});

// Fallback initialization
generateStars();
