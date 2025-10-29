// Main JavaScript - Navigation and Global Functions
// Test de Personnalité Professionnelle

class App {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupNavigation();
        this.initializeAnimations();
    }

    setupEventListeners() {
        // Navigation mobile toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.boxShadow = 'none';
                }
            }
        });
    }

    setupNavigation() {
        // Check if we're on the test page and initialize test
        if (window.location.pathname.includes('test.html')) {
            // Test page specific initialization will be handled by test.js
            return;
        }

        // Check if we're on the results page and initialize results
        if (window.location.pathname.includes('resultats.html')) {
            // Results page specific initialization will be handled by results.js
            return;
        }

        // Home page specific initialization
        this.initializeHomePage();
    }

    initializeHomePage() {
        // Add any home page specific functionality here
        console.log('Home page initialized');
    }

    initializeAnimations() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const elementsToAnimate = document.querySelectorAll('.feature-card, .visual-card');
        elementsToAnimate.forEach(el => observer.observe(el));
    }

    toggleMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        if (mobileMenu && toggle) {
            mobileMenu.classList.toggle('active');
            toggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            
            // Update aria-expanded
            toggle.setAttribute('aria-expanded', 
                toggle.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
            );
        }
    }

    // Utility functions
    static showLoading(message = 'Chargement...') {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            const loadingText = loadingOverlay.querySelector('.loading-text');
            if (loadingText) {
                loadingText.textContent = message;
            }
            loadingOverlay.style.display = 'flex';
        }
    }

    static hideLoading() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
    }

    static scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    static showAlert(message, type = 'info') {
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        
        // Style the alert
        alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        // Set background color based on type
        switch (type) {
            case 'success':
                alert.style.background = '#2ecc71';
                break;
            case 'error':
                alert.style.background = '#e74c3c';
                break;
            case 'warning':
                alert.style.background = '#f39c12';
                break;
            default:
                alert.style.background = '#3498db';
        }

        // Add to DOM
        document.body.appendChild(alert);

        // Animate in
        setTimeout(() => {
            alert.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            alert.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.parentNode.removeChild(alert);
                }
            }, 300);
        }, 3000);
    }

    static saveToLocalStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }

    static loadFromLocalStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return null;
        }
    }

    static clearLocalStorage(key) {
        try {
            if (key) {
                localStorage.removeItem(key);
            } else {
                localStorage.clear();
            }
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }

    // Navigation functions
    static navigateTo(page) {
        window.location.href = page;
    }

    static goBack() {
        window.history.back();
    }

    // Validation functions
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validateRequired(value) {
        return value && value.trim().length > 0;
    }

    // Format functions
    static formatNumber(number, decimals = 0) {
        return new Intl.NumberFormat('fr-FR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(number);
    }

    static formatPercentage(value, total = 100) {
        const percentage = (value / total) * 100;
        return `${this.formatNumber(percentage, 1)}%`;
    }

    static formatDate(date) {
        return new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    }

    // Animation functions
    static fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let start = performance.now();
        
        function animate(timestamp) {
            let progress = (timestamp - start) / duration;
            if (progress > 1) progress = 1;
            
            element.style.opacity = progress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }

    static fadeOut(element, duration = 300) {
        let start = performance.now();
        let initialOpacity = parseFloat(getComputedStyle(element).opacity);
        
        function animate(timestamp) {
            let progress = (timestamp - start) / duration;
            if (progress > 1) progress = 1;
            
            element.style.opacity = initialOpacity * (1 - progress);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
            }
        }
        
        requestAnimationFrame(animate);
    }

    static slideIn(element, direction = 'left', duration = 300) {
        const isLeft = direction === 'left';
        const transform = isLeft ? 'translateX(-100%)' : 'translateX(100%)';
        
        element.style.transform = transform;
        element.style.display = 'block';
        
        let start = performance.now();
        
        function animate(timestamp) {
            let progress = (timestamp - start) / duration;
            if (progress > 1) progress = 1;
            
            const translate = (1 - progress) * (isLeft ? -100 : 100);
            element.style.transform = `translateX(${translate}%)`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }

    static slideOut(element, direction = 'left', duration = 300) {
        const isLeft = direction === 'left';
        
        let start = performance.now();
        
        function animate(timestamp) {
            let progress = (timestamp - start) / duration;
            if (progress > 1) progress = 1;
            
            const translate = progress * (isLeft ? -100 : 100);
            element.style.transform = `translateX(${translate}%)`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
            }
        }
        
        requestAnimationFrame(animate);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});

// Export for use in other modules
window.App = App;
