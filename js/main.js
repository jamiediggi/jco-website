/**
 * Jamie Clarke Online - Main JavaScript
 * Handles animations, navigation, and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initScrollAnimations();
  initNavigation();
  initMobileNav();
  initFAQ();
  initFormHandling();
});

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll, .fade-in-left, .fade-in-right');

  if (animatedElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optionally unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

/**
 * Navigation scroll behavior
 * Adds shadow on scroll and handles active states
 */
function initNavigation() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  let lastScroll = 0;
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class for shadow
    if (currentScroll > scrollThreshold) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // Set active nav link based on current page
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '/' && href === '/')) {
      link.classList.add('active');
    }
  });
}

/**
 * Mobile navigation toggle
 */
function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');
  const body = document.body;

  if (!navToggle || !navMobile) return;

  navToggle.addEventListener('click', () => {
    const isOpen = navMobile.classList.contains('active');

    if (isOpen) {
      navMobile.classList.remove('active');
      navToggle.classList.remove('active');
      body.style.overflow = '';
    } else {
      navMobile.classList.add('active');
      navToggle.classList.add('active');
      body.style.overflow = 'hidden';
    }
  });

  // Close mobile nav when clicking a link
  const mobileLinks = navMobile.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('active');
      navToggle.classList.remove('active');
      body.style.overflow = '';
    });
  });

  // Close mobile nav on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMobile.classList.contains('active')) {
      navMobile.classList.remove('active');
      navToggle.classList.remove('active');
      body.style.overflow = '';
    }
  });
}

/**
 * FAQ accordion functionality
 */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  if (faqItems.length === 0) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items (optional - for single open behavior)
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current item
      item.classList.toggle('active');
    });

    // Keyboard accessibility
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });

    // Make question focusable
    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');
  });
}

/**
 * Form handling with validation feedback
 */
function initFormHandling() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      // Simple loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Simulate form submission (replace with actual endpoint)
      try {
        // In production, this would be an actual API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Success feedback
        submitBtn.textContent = 'Success!';
        submitBtn.style.background = 'var(--accent-green-dark)';

        // Reset form
        form.reset();

        // Reset button after delay
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
        }, 2000);

      } catch (error) {
        // Error feedback
        submitBtn.textContent = 'Error - Try Again';
        submitBtn.style.background = 'var(--red-dark)';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
        }, 2000);
      }
    });
  });

  // Email validation on blur
  const emailInputs = document.querySelectorAll('input[type="email"]');
  emailInputs.forEach(input => {
    input.addEventListener('blur', () => {
      const isValid = input.checkValidity();
      if (input.value && !isValid) {
        input.style.borderColor = 'var(--red)';
      } else {
        input.style.borderColor = '';
      }
    });

    input.addEventListener('input', () => {
      input.style.borderColor = '';
    });
  });
}

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/**
 * Add parallax effect to hero section (optional, subtle)
 */
function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const heroBg = hero.querySelector('.hero-image-bg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;

    if (scrolled < window.innerHeight) {
      heroBg.style.transform = `translateY(${rate}px)`;
    }
  }, { passive: true });
}

// Initialize parallax if desired
// initParallax();

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Utility: Throttle function
 */
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
