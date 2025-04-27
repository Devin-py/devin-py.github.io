/**
 * Main JavaScript file for Devin's Portfolio
 * Contains core functionality for the portfolio website
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initializeNavigation();
  initializeProjectCards();
  initializeCodeCopy();
  initializeFilters();
  initializeScrollAnimations();
  initializeBackToTop();
  initializeCookieBanner();
});

/**
 * Mobile Navigation Toggle
 */
function initializeNavigation() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navLinks.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      }
    });
    
    // Close menu when clicking a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      });
    });
  }
}

/**
 * Project Cards Interactions
 */
function initializeProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  const toggleButtons = document.querySelectorAll('.toggle-code');
  
  // Toggle code visibility with buttons
  toggleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const card = this.closest('.project-card');
      const codeContainer = card.querySelector('.code-container');
      
      if (codeContainer) {
        const isVisible = codeContainer.style.display === 'block';
        
        // Close any open code containers
        document.querySelectorAll('.code-container').forEach(container => {
          container.style.display = 'none';
        });
        
        // Toggle current container visibility
        if (!isVisible) {
          codeContainer.style.display = 'block';
          this.innerHTML = 'Hide Code <i class="fas fa-code-branch"></i>';
          
          // Initialize syntax highlighting if not already done
          if (!codeContainer.classList.contains('highlighted')) {
            hljs.highlightElement(codeContainer.querySelector('code'));
            codeContainer.classList.add('highlighted');
          }
        } else {
          this.innerHTML = 'View Code <i class="fas fa-code"></i>';
        }
      }
    });
  });
}

/**
 * Copy Code Functionality
 */
function initializeCodeCopy() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      
      const targetId = this.getAttribute('data-target');
      const codeElement = document.getElementById(targetId);
      
      if (codeElement) {
        const codeText = codeElement.textContent;
        
        // Use Clipboard API to copy text
        navigator.clipboard.writeText(codeText)
          .then(() => {
            // Success feedback
            this.innerHTML = '<i class="fas fa-check"></i> Copied!';
            
            // Reset button text after 2 seconds
            setTimeout(() => {
              this.innerHTML = '<i class="fas fa-copy"></i> Copy Code';
            }, 2000);
          })
          .catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy code. Please try selecting and copying manually.');
          });
      }
    });
  });
}

/**
 * Project Filtering
 */
function initializeFilters() {
  const filterButtons = document.querySelectorAll('.filter-tag');
  const searchInput = document.getElementById('search-input');
  const projectCards = document.querySelectorAll('.project-card');
  
  // Category filtering
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
          if (filter === 'all') {
            card.style.display = 'block';
          } else {
            const categories = card.getAttribute('data-category');
            if (categories && categories.includes(filter)) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  }
  
  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      
      projectCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
}

/**
 * Scroll Animations
 */
function initializeScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  // Initial check for elements in viewport
  checkElementsInViewport();
  
  // Check on scroll
  window.addEventListener('scroll', checkElementsInViewport);
  
  function checkElementsInViewport() {
    animatedElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Check if element is in viewport
      if (elementTop < windowHeight - elementHeight / 4) {
        element.classList.add('visible');
      }
    });
  }
}

/**
 * Back to Top Button
 */
function initializeBackToTop() {
  const backToTopButton = document.getElementById('back-to-top');
  
  if (backToTopButton) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/**
 * Cookie Banner
 */
function initializeCookieBanner() {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookiesBtn = document.getElementById('accept-cookies');
  
  if (cookieBanner && acceptCookiesBtn) {
    // Check if cookies have been accepted
    if (localStorage.getItem('cookiesAccepted') !== 'true') {
      // Show banner with slight delay
      setTimeout(() => {
        cookieBanner.classList.remove('hidden');
        cookieBanner.classList.add('visible');
      }, 1000);
    }
    
    // Store cookie preference
    acceptCookiesBtn.addEventListener('click', function() {
      localStorage.setItem('cookiesAccepted', 'true');
      cookieBanner.classList.remove('visible');
      
      // Hide after animation completes
      setTimeout(() => {
        cookieBanner.classList.add('hidden');
      }, 300);
    });
  }
}

/**
 * Form submission handling (for newsletter, contact form, etc.)
 */
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    // Prevent actual form submission for demo purposes
    e.preventDefault();
    
    // Show success message
    const formContainer = this.parentElement;
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message fade-in';
    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your submission!';
    
    // Replace form with success message
    formContainer.innerHTML = '';
    formContainer.appendChild(successMessage);
  });
});