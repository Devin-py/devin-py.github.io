/**
 * Animation Handling
 * Manages advanced animations and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  initializeParticleBackground();
  initializeSmoothScrolling();
  initializeStaggeredAnimations();
  initializePageTransitions();
  initializeFormValidation();
  initializeBlogFilters();
});

/**
 * Creates particle effects for the hero section background
 */
function initializeParticleBackground() {
  const heroSection = document.querySelector('.hero');
  const particlesContainer = document.querySelector('.hero-particles');
  
  if (heroSection && particlesContainer) {
    // Number of particles to create
    const particleCount = 30;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      createParticle(particlesContainer);
    }
  }
  
  function createParticle(container) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    
    // Random size between 2-6px
    const size = Math.random() * 4 + 2;
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Random opacity
    const opacity = Math.random() * 0.5 + 0.1;
    
    // Random animation duration
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    // Apply styles
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background-color: var(--color-primary);
      border-radius: 50%;
      top: ${posY}%;
      left: ${posX}%;
      opacity: ${opacity};
      animation: float ${duration}s ease-in-out ${delay}s infinite;
    `;
    
    container.appendChild(particle);
  }
}

/**
 * Enables smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      
      const targetElement = document.querySelector(href);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        history.pushState(null, null, href);
      }
    });
  });
}

/**
 * Initializes staggered animations for lists and grids
 */
function initializeStaggeredAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });

  const staggerContainers = document.querySelectorAll('.stagger-animation');
  
  if (staggerContainers.length > 0) {
    staggerContainers.forEach(container => {
      const children = container.children;
      const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            Array.from(children).forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('visible');
              }, index * 100);
            });
            staggerObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });

      staggerObserver.observe(container);
    });
  }
}

/**
 * Page transition effect for navigation
 */
function initializePageTransitions() {
  const transitionElement = document.createElement('div');
  transitionElement.className = 'page-transition';
  document.body.appendChild(transitionElement);
  
  document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])').forEach(link => {
    if (link.hostname === window.location.hostname) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (!this.hasAttribute('download')) {
          e.preventDefault();
          
          transitionElement.classList.add('active');
          
          setTimeout(() => {
            window.location.href = href;
          }, 500);
        }
      });
    }
  });
  
  window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      transitionElement.classList.add('exit');
      
      setTimeout(() => {
        transitionElement.classList.remove('exit');
      }, 500);
    }
  });
}

/**
 * Form validation and submission handling
 */
function initializeFormValidation() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const formObject = Object.fromEntries(formData);
      
      // Validate form data
      let isValid = true;
      let errorMessages = [];
      
      if (!formObject.name.trim()) {
        isValid = false;
        errorMessages.push('Name is required');
      }
      
      if (!formObject.email.trim() || !isValidEmail(formObject.email)) {
        isValid = false;
        errorMessages.push('Valid email is required');
      }
      
      if (!formObject.message.trim()) {
        isValid = false;
        errorMessages.push('Message is required');
      }
      
      if (!isValid) {
        showFormErrors(errorMessages);
        return;
      }
      
      // Simulate form submission
      const submitButton = this.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      
      setTimeout(() => {
        const formContainer = contactForm.parentElement;
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message fade-in';
        successMessage.innerHTML = `
          <i class="fas fa-check-circle"></i>
          <h3>Message Sent Successfully!</h3>
          <p>Thank you for reaching out. I'll get back to you soon.</p>
        `;
        
        formContainer.innerHTML = '';
        formContainer.appendChild(successMessage);
      }, 1500);
    });
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFormErrors(errors) {
  const errorContainer = document.createElement('div');
  errorContainer.className = 'form-errors fade-in';
  errorContainer.innerHTML = `
    <ul>
      ${errors.map(error => `<li>${error}</li>`).join('')}
    </ul>
  `;
  
  const existingErrors = document.querySelector('.form-errors');
  if (existingErrors) {
    existingErrors.remove();
  }
  
  const form = document.getElementById('contact-form');
  form.insertBefore(errorContainer, form.firstChild);
}

/**
 * Blog category filtering
 */
function initializeBlogFilters() {
  const categoryButtons = document.querySelectorAll('.category-tag');
  const blogPosts = document.querySelectorAll('.blog-post');
  
  if (categoryButtons.length && blogPosts.length) {
    categoryButtons.forEach(button => {
      button.addEventListener('click', function() {
        const category = this.dataset.category;
        
        // Update active state
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Filter posts
        blogPosts.forEach(post => {
          if (category === 'all' || post.dataset.category === category) {
            post.style.display = 'block';
            setTimeout(() => {
              post.style.opacity = '1';
              post.style.transform = 'translateY(0)';
            }, 50);
          } else {
            post.style.opacity = '0';
            post.style.transform = 'translateY(20px)';
            setTimeout(() => {
              post.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
}