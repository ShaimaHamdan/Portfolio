// Mobile menu functionality
const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
const hamburgerIcon = document.getElementById('hamburgerIcon');
const closeIcon = document.getElementById('closeIcon');

// Loading Screen
document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  // Hide loading screen when page is loaded
  window.addEventListener('load', () => {
    loadingScreen.classList.add('hidden');
  });

  // Mobile menu functionality
  menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    
    // Toggle icons with animation
    if (mobileMenu.classList.contains('open')) {
      hamburgerIcon.style.opacity = '0';
      hamburgerIcon.style.transform = 'rotate(180deg)';
      closeIcon.style.opacity = '1';
      closeIcon.style.transform = 'rotate(0deg)';
    } else {
      hamburgerIcon.style.opacity = '1';
      hamburgerIcon.style.transform = 'rotate(0deg)';
      closeIcon.style.opacity = '0';
      closeIcon.style.transform = 'rotate(-180deg)';
    }
  });

  // Close mobile menu when clicking a link
  const mobileLinks = document.querySelectorAll('.mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburgerIcon.style.opacity = '1';
      hamburgerIcon.style.transform = 'rotate(0deg)';
      closeIcon.style.opacity = '0';
      closeIcon.style.transform = 'rotate(-180deg)';
    });
  });
});

// Typing animation
document.addEventListener("DOMContentLoaded", function () {
  const titles = ["مطورة ويب", "محللة أعمال", "مديرة مشاريع", "محللة بيانات"];
  const ref = document.getElementById("text");
  const cursor = document.querySelector(".cursor");

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = titles[wordIndex];
    const visible = currentWord.substring(0, charIndex);
    ref.textContent = visible;
    
    let speed = isDeleting ? 70 : 110;
    
    if (!isDeleting && charIndex < currentWord.length) {
      charIndex++;
      setTimeout(type, speed);
    } else if (!isDeleting && charIndex === currentWord.length) {
      setTimeout(() => {
        isDeleting = true;
        setTimeout(type, speed);
      }, 2000);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(type, speed);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % titles.length;
      setTimeout(type, 500);
    }
  }

  type();
});

// Initialize scroller
function initializeScroller() {
  const scrollers = document.querySelectorAll('.scroller');
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    scrollers.forEach(scroller => {
      scroller.setAttribute('data-animated', true);
      const scrollerInner = scroller.querySelector('.scroller_inner');
      const scrollerContent = Array.from(scrollerInner.children);
      
      // Add multiple copies for smoother infinite scroll
      for (let i = 0; i < 3; i++) {
        scrollerContent.forEach(item => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute('aria-hidden', true);
          scrollerInner.appendChild(duplicatedItem);
        });
      }
    });
  }
  
  // Prevent animation jump during window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.body.classList.remove('resize-animation-stopper');
    }, 400);
  });
}

// Initialize scroller when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeScroller);

// Scroll Animation
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appear');
    }
  });
}, observerOptions);

// Observe all elements with fade-up class
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-up');
  fadeElements.forEach(element => observer.observe(element));
});