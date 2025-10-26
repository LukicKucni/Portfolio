// Image Modal Functions
// Image modal functionality
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

// Add click listeners to all profile images
const profileImg = document.querySelector('.profile-img');
if (profileImg) {
    profileImg.addEventListener('click', function() {
        openImageModal(this.src);
    });
}

// Add click listeners to project images
const featuredProjectImage = document.querySelector('.project-img');
if (featuredProjectImage) {
    featuredProjectImage.addEventListener('click', function() {
        openImageModal(this.src);
    });
}

// Project images click handlers
const projectImages = document.querySelectorAll('.project-image-wrapper img');
projectImages.forEach(function(img) {
    img.addEventListener('click', function() {
        openImageModal(this.src);
    });
});

// Modal close handlers
closeBtn.addEventListener('click', closeImageModal);

modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeImageModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeImageModal();
    }
});

// Nav show/hide on scroll - DISABLED (always visible)
// const nav = document.querySelector('nav');
// let isAtTop = true;
// let hoverTimeout;

// function updateNavVisibility() {
//     if (window.scrollY > 100) {
//         nav.classList.add('visible');
//         nav.classList.remove('hover-visible');
//         isAtTop = false;
//     } else {
//         nav.classList.remove('visible', 'hover-visible');
//         isAtTop = true;
//     }
// }

// Scroll event with throttle for better performance
// let lastScroll = 0;
// let scrollTimeout;
// window.addEventListener('scroll', function() {
//     clearTimeout(scrollTimeout);
//     scrollTimeout = setTimeout(() => {
//         updateNavVisibility();
//     }, 10);
// }, { passive: true });

// Mouse hover at top of page with throttle
// let mousemoveTimeout;
// document.addEventListener('mousemove', function(e) {
//     clearTimeout(mousemoveTimeout);
//     mousemoveTimeout = setTimeout(() => {
//         if (isAtTop && e.clientY < 100) {
//             // Mouse is near top of page
//             nav.classList.add('visible', 'hover-visible');
//             clearTimeout(hoverTimeout);
//             
//             // Hide nav after mouse leaves top area
//             hoverTimeout = setTimeout(() => {
//                 if (isAtTop) {
//                     nav.classList.remove('visible', 'hover-visible');
//                 }
//             }, 2000);
//         } else if (isAtTop && e.clientY > 100) {
//             // Mouse moved away from top
//             clearTimeout(hoverTimeout);
//             hoverTimeout = setTimeout(() => {
//                 if (isAtTop) {
//                     nav.classList.remove('visible', 'hover-visible');
//                 }
//             }, 200);
//         }
//     }, 50);
// }, { passive: true });

// Generate animated stars for dark theme background
function generateStars() {
    const starsContainer = document.getElementById('starsContainer');
    const numStars = 100;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random size between 1-3px
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Random position across screen
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random animation timing for natural twinkle effect
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        starsContainer.appendChild(star);
    }
}

// Generate geometric elements for light mode
function generateGeometricElements() {
    const geometricContainer = document.getElementById('geometricContainer');
    const numElements = 12;
    
    console.log('Generating geometric elements...', geometricContainer);
    console.log('Current theme:', document.documentElement.getAttribute('data-theme'));

    for (let i = 0; i < numElements; i++) {
        const element = document.createElement('div');
        element.className = 'geometric-element';
        
        // Random element type
        const elementTypes = ['geometric-circle', 'geometric-square', 'geometric-triangle'];
        const randomType = elementTypes[Math.floor(Math.random() * elementTypes.length)];
        element.classList.add(randomType);
        
        // Random size
        const size = Math.random() * 40 + 20;
        element.style.width = size + 'px';
        element.style.height = size + 'px';
        
        // Random position (spread across screen)
        element.style.top = Math.random() * 100 + '%';
        element.style.left = Math.random() * 100 + '%';
        
        // Random animation duration (20-40 seconds)
        element.style.animationDuration = (Math.random() * 20 + 20) + 's';
        element.style.animationDelay = Math.random() * 30 + 's';
        
        geometricContainer.appendChild(element);
        console.log('Geometric element added:', element, 'Type:', randomType);
    }
    
    console.log('Total geometric elements created:', geometricContainer.children.length);
    console.log('Container display:', window.getComputedStyle(geometricContainer).display);
}

// Mouse trail effect with sparkles
let mouseTrailTimeout;
const trailElements = [];

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'mouse-trail';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    
    // Create sparkle core
    const core = document.createElement('div');
    core.className = 'sparkle-core';
    sparkle.appendChild(core);
    
    // Create sparkle beams
    for (let i = 0; i < 4; i++) {
        const beam = document.createElement('div');
        beam.className = 'sparkle-beam';
        sparkle.appendChild(beam);
    }
    
    document.body.appendChild(sparkle);
    trailElements.push(sparkle);
    
    // Clean up after animation
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
        const index = trailElements.indexOf(sparkle);
        if (index > -1) {
            trailElements.splice(index, 1);
        }
    }, 800);
}

let lastMouseTime = 0;
let sparkleTimeout;
document.addEventListener('mousemove', function(e) {
    const now = Date.now();
    if (now - lastMouseTime > 100) {
        clearTimeout(sparkleTimeout);
        sparkleTimeout = setTimeout(() => {
            createSparkle(e.clientX, e.clientY);
        }, 10);
        lastMouseTime = now;
    }
}, { passive: true });

// Form submission (for contact page)
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Create mailto link
        const mailtoLink = `mailto:lukiclazar.dev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Your email client will open with the message pre-filled. Please send it from there.');
    });
}

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    let lastScroll = 0;
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrolled = window.pageYOffset;
            
            if (scrolled > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, 10);
    }, { passive: true });
}

// Testimonials functionality
const testimonialForm = document.getElementById('testimonialForm');
const testimonialsContainer = document.getElementById('testimonialsContainer');

// Load existing testimonials from localStorage
function loadTestimonials() {
    const testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
    
    if (testimonialsContainer) {
        testimonialsContainer.innerHTML = testimonials.map(testimonial => `
            <div style="background: var(--card-bg); padding: 30px; border-radius: 12px; border: 1px solid var(--border); transition: border-color 0.3s ease;">
                <p style="color: var(--secondary); font-style: italic; margin-bottom: 20px;">"${testimonial.comment}"</p>
                <p style="color: var(--accent); font-weight: 600; margin: 0;">— ${testimonial.name}</p>
            </div>
        `).join('');
    }
}

// Handle form submission
if (testimonialForm && testimonialsContainer) {
    testimonialForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('testimonialName').value.trim();
        const comment = document.getElementById('testimonialComment').value.trim();
        
        if (!name || !comment) {
            alert('Please fill in all fields');
            return;
        }
        
        // Get existing testimonials
        const testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
        
        // Add new testimonial
        testimonials.push({
            name: name,
            comment: comment,
            date: new Date().toISOString()
        });
        
        // Save to localStorage
        localStorage.setItem('testimonials', JSON.stringify(testimonials));
        
        // Reload testimonials
        loadTestimonials();
        
        // Clear form
        testimonialForm.reset();
        
        // Show success message
        alert('Thank you for your comment!');
    });
    
    // Load testimonials on page load
    loadTestimonials();
}

// Dark/Light theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

// Load saved theme preference or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

// Update toggle icon based on current theme
function updateThemeIcon(theme) {
    if (sunIcon && moonIcon) {
        if (theme === 'light') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }
}

// Initialize theme icon on page load
updateThemeIcon(savedTheme);

// Handle theme toggle button click
if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

// Skills progress bar animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        
        // Delay each bar animation for staggered effect
        setTimeout(() => {
            bar.style.setProperty('--skill-width', width + '%');
            bar.style.width = width + '%';
        }, index * 100);
    });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    generateStars();
    
    // Animate skill bars after a short delay
    setTimeout(animateSkillBars, 500);
});

// Fallback initialization
generateStars();
