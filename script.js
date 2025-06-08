// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');

function initializeMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    function toggleMenu() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    }

    function closeMenu() {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }

    hamburger.addEventListener("click", toggleMenu);
    navLinks.forEach(link => link.addEventListener("click", closeMenu));
}

// Update your DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function() {
    try {
        initializeAnimations();
        initializeScroller();
        initializeMobileMenu(); // Add this line
        initializeNavigation();
        initializeKonamiCode();
    } catch (error) {
        console.error('Initialization error:', error);
    }
});const navbar = document.querySelector('.top-nav'); // Changed from getElementById('navbar')
const scrollProgress = document.getElementById('scrollProgress');
let lastScrollY = 0;
let isThrottled = false;

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    try {
        initializeAnimations();
        initializeScroller();
        initializeNavigation();
        initializeKonamiCode();
    } catch (error) {
        console.error('Initialization error:', error);
    }
});

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);
});

// Navbar and Scroll Effects
window.addEventListener('scroll', throttle(() => {
    handleNavbarScroll();
    handleScrollProgress();
    handleParallaxEffect();
    highlightActiveSection();
}, 100));

// Animation Functions
function initializeAnimations() {
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

    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
}

// Infinite Scroller
function initializeScroller() {
    const scrollers = document.querySelectorAll(".scroller");
    
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        scrollers.forEach(scroller => {
            scroller.setAttribute("data-animated", true);
            const scrollerInner = scroller.querySelector(".scroller_inner");
            const scrollerContent = Array.from(scrollerInner.children);
            
            scrollerContent.forEach(item => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute("aria-hidden", true);
                scrollerInner.appendChild(duplicatedItem);
            });
        });
    }
}

// Navigation Functions
function handleNavbarScroll() {
    const currentScrollY = window.scrollY;

    if (!isThrottled && navbar) { // Added null check
        isThrottled = true;

        // Show navbar when scrolling up, hide when scrolling down
        if (currentScrollY > lastScrollY) {
            // Scrolling down
            if (currentScrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            }
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }

        // Add scrolled class for background change
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;

        // Reset throttle after a short delay
        setTimeout(() => {
            isThrottled = false;
        }, 100);
    }
}

function handleScrollProgress() {
    if (scrollProgress) {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = Math.min(scrolled, 100) + '%';
    }
}

function handleParallaxEffect() {
    const scrolled = window.scrollY;
    const heroBackground = document.querySelector('.hero-bg');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
}

// Skill Items Hover Effect
function initializeSkillsHover() {
    document.querySelectorAll('.skill-item').forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            skill.style.background = 'linear-gradient(135deg, rgba(79, 172, 254, 0.2), rgba(102, 126, 234, 0.2))';
        });
        skill.addEventListener('mouseleave', () => {
            skill.style.background = 'var(--card-bg)';
        });
    });
}

// Active Navigation Highlighting
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
            const current = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Navigation Initialization
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            if (section) {
                // Account for fixed header
                const navHeight = document.getElementById('navbar').offsetHeight;
                const sectionTop = section.offsetTop - navHeight;
                
                window.scrollTo({
                    top: sectionTop,
                    behavior: 'smooth'
                });
                
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to clicked link
                link.classList.add('active');
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                if (navLinks.classList.contains('mobile-open')) {
                    navLinks.classList.remove('mobile-open');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });
}

function activateEasterEgg() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.style.background = 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)';
    document.body.style.animation = 'rainbow 2s infinite';
    
    setTimeout(() => {
        document.body.style.background = 'var(--dark-bg)';
        document.body.style.animation = 'none';
    }, 5000);
}

// Konami Code Easter Egg
function initializeKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

// Error Handling
window.addEventListener('error', (e) => {
    if (e && e.error) {
        console.error('An error occurred:', e.error.message || e.error);
    }
});

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

document.addEventListener("DOMContentLoaded", function() {
  const titles = ["مطورة ويب", "محللة أعمال", "مديرة مشاريع", "محللة بيانات"];
  const jobTitleElem = document.getElementById("job-title");
  let index = 0;

  function typeAndDelete() {
    const title = titles[index];
    let charIndex = 0;
    
    // Type the title
    const typeInterval = setInterval(() => {
      jobTitleElem.textContent = title.substring(0, charIndex + 1);
      charIndex++;
      
      if (charIndex === title.length) {
        clearInterval(typeInterval);
        
        // Wait then delete
        setTimeout(() => {
          let deleteIndex = title.length;
          const deleteInterval = setInterval(() => {
            jobTitleElem.textContent = title.substring(0, deleteIndex - 1);
            deleteIndex--;
            
            if (deleteIndex === 0) {
              clearInterval(deleteInterval);
              index = (index + 1) % titles.length;
              setTimeout(typeAndDelete, 500);
            }
          }, 100);
        }, 2000);
      }
    }, 150);
  }

  setTimeout(typeAndDelete, 1000);
});