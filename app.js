// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.header');
const navLinksItems = document.querySelectorAll('.nav-links a');
const serviceButtons = document.querySelectorAll('.service-btn');
const heroCTA = document.querySelector('.hero-cta');

// Mobile Menu Functionality
function toggleMobileMenu() {
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('mobile-active');
        
        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('mobile-active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('mobile-active');
        document.body.style.overflow = '';
    }
}

// Header scroll effect
function handleHeaderScroll() {
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'var(--color-surface)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = 'none';
        }
    }
}

// Smooth scrolling for anchor links
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header ? header.offsetHeight : 80;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Close mobile menu if open
    closeMobileMenu();
}

// Handle service button clicks (external links)
function handleServiceButtonClick(e) {
    e.preventDefault();
    const url = this.getAttribute('href');
    if (url && url.startsWith('http')) {
        window.open(url, '_blank', 'noopener,noreferrer');
    }
}

// Intersection Observer for animations
function createIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    const animatedElements = document.querySelectorAll(
        '.service-card, .about-text, .values, .value-item, .section-header'
    );
    
    animatedElements.forEach((element, index) => {
        // Add animation classes based on element type and index
        if (element.classList.contains('service-card')) {
            element.classList.add('fade-in');
            element.style.transitionDelay = `${index * 0.1}s`;
        } else if (element.classList.contains('about-text')) {
            element.classList.add('slide-in-left');
        } else if (element.classList.contains('values')) {
            element.classList.add('slide-in-right');
        } else if (element.classList.contains('value-item')) {
            element.classList.add('fade-in');
            element.style.transitionDelay = `${(index % 4) * 0.1}s`;
        } else {
            element.classList.add('fade-in');
        }
        
        observer.observe(element);
    });
}

// Parallax effect for hero section
function handleParallax() {
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
}

// Service cards hover effects
function enhanceServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Button click effects
function enhanceButtons() {
    const buttons = document.querySelectorAll('.btn, .service-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Active navigation highlighting
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

// Scroll to top functionality
function createScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    function toggleScrollToTop() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    return toggleScrollToTop;
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Initialize everything when DOM is loaded
function init() {
    console.log('Initializing NCS Landing Page...');
    
    // Mobile menu functionality
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        console.log('Mobile menu toggle initialized');
    }
    
    // Navigation links - smooth scrolling for internal links
    navLinksItems.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            link.addEventListener('click', smoothScroll);
            console.log(`Navigation link initialized: ${href}`);
        }
    });
    
    // Service buttons - external links
    serviceButtons.forEach(button => {
        button.addEventListener('click', handleServiceButtonClick);
        const url = button.getAttribute('href');
        console.log(`Service button initialized: ${url}`);
    });
    
    // Hero CTA button
    if (heroCTA) {
        heroCTA.addEventListener('click', smoothScroll);
        console.log('Hero CTA button initialized');
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header') && navLinks && navLinks.classList.contains('mobile-active')) {
            closeMobileMenu();
        }
    });
    
    // Escape key to close mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('mobile-active')) {
            closeMobileMenu();
        }
    });
    
    // Initialize scroll effects
    const throttledScroll = throttle(() => {
        handleHeaderScroll();
        updateActiveNavigation();
        handleParallax();
    }, 16); // ~60fps
    
    window.addEventListener('scroll', throttledScroll);
    
    // Initialize scroll to top
    const toggleScrollToTop = createScrollToTop();
    window.addEventListener('scroll', throttle(toggleScrollToTop, 100));
    
    // Initialize intersection observer for animations
    createIntersectionObserver();
    
    // Enhance interactive elements
    enhanceServiceCards();
    enhanceButtons();
    
    // Initial calls
    handleHeaderScroll();
    updateActiveNavigation();
    
    // Handle window resize
    window.addEventListener('resize', throttle(() => {
        if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('mobile-active')) {
            closeMobileMenu();
        }
    }, 250));
    
    console.log('NCS Landing Page initialized successfully');
}

// CSS for scroll to top button and ripple effect
const additionalStyles = `
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--ncs-gradient, linear-gradient(135deg, #2E7D32 0%, #1976D2 100%));
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    
    .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn, .service-btn {
        position: relative;
        overflow: hidden;
    }
    
    .nav-links a.active {
        color: var(--ncs-green, #2E7D32);
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
    
    input.error, textarea.error {
        border-color: #dc3545;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    }
    
    @media (max-width: 768px) {
        .scroll-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
            font-size: 18px;
        }
        
        .nav-links.mobile-active {
            display: flex !important;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Start the application
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export functions for potential external use
window.NCS = {
    toggleMobileMenu,
    closeMobileMenu,
    smoothScroll,
    handleServiceButtonClick
};