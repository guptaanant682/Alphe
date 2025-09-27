// Auto-hide Navbar and Interactive Solutions Engine
document.addEventListener('DOMContentLoaded', function() {
    // Auto-hide navbar functionality
    let lastScrollTop = 0;
    const navbar = document.getElementById('navbar');
    let scrollThreshold = 100; // Only start hiding after scrolling 100px
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                navbar.classList.add('hidden');
            } else {
                // Scrolling up
                navbar.classList.remove('hidden');
            }
        } else {
            // Near top of page, always show navbar
            navbar.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });

    // Waitlist form functionality - Show success message after submission
    const waitlistForm = document.getElementById('waitlistForm');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            const button = this.querySelector('.join-waitlist-btn');
            const originalText = button.innerHTML;
            
            // Show loading state
            button.innerHTML = '<span>Submitting...</span>';
            button.disabled = true;
            
            // Form will submit naturally to Formspree
            // Success page will be shown by Formspree
        });
    }
    // Solutions Engine Interactivity
    const solutionNodes = document.querySelectorAll('.solution-node, .solution-core');
    const infoContents = document.querySelectorAll('.info-content');
    
    solutionNodes.forEach(node => {
        node.addEventListener('click', function() {
            // Remove active class from all nodes
            solutionNodes.forEach(n => n.classList.remove('active'));
            
            // Add active class to clicked node
            this.classList.add('active');
            
            // Hide all info content
            infoContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show corresponding info content
            const solutionType = this.getAttribute('data-solution');
            const targetInfo = document.getElementById(`info-${solutionType}`);
            if (targetInfo) {
                targetInfo.classList.add('active');
            }
            
            // Add visual feedback
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // Smooth scrolling for navigation
    // Add smooth scrolling to all internal links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add parallax effect to floating shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Animate statistics on scroll
    const stats = document.querySelectorAll('.stat-number');
    const animateStats = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                // Extract number and suffix
                const match = finalValue.match(/^([\d.]+)(.*)$/);
                if (match) {
                    const number = parseFloat(match[1]);
                    const suffix = match[2];
                    
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            current = number;
                            clearInterval(timer);
                        }
                        target.textContent = current.toFixed(number % 1 === 0 ? 0 : 1) + suffix;
                    }, 30);
                }
            }
        });
    };

    const statsObserver = new IntersectionObserver(animateStats, observerOptions);
    stats.forEach(stat => statsObserver.observe(stat));

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.problem-card, .solution-card, .team-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add interactive network nodes
    const networkNodes = document.querySelectorAll('.network-node');
    
    networkNodes.forEach(node => {
        node.addEventListener('mouseenter', function() {
            this.style.transform += ' scale(1.2)';
            this.style.backgroundColor = 'rgba(255, 216, 155, 0.5)';
        });
        
        node.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.2)', '');
            this.style.backgroundColor = '';
        });
    });

    // Add particle effect to hero section
    const createParticles = () => {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
            `;
            heroSection.appendChild(particle);
        }
    };

    createParticles();

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// Add CSS animations through JavaScript
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.8s ease-out forwards;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .particle {
        opacity: 0;
        animation: particleFloat 8s ease-in-out infinite !important;
    }

    @keyframes particleFloat {
        0%, 100% {
            opacity: 0;
            transform: translateY(0px);
        }
        50% {
            opacity: 1;
            transform: translateY(-20px);
        }
    }

    body {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }

    body.loaded {
        opacity: 1;
    }

    .feature-item, .solution-card, .problem-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .hero-visual {
        perspective: 1000px;
    }

    .ai-network {
        transform-style: preserve-3d;
    }

    .network-node {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;

document.head.appendChild(style);