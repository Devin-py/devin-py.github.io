/**
 * Theme Toggle Functionality
 * Handles light/dark mode preferences
 */

document.addEventListener('DOMContentLoaded', function() {
  initializeTheme();
});

function initializeTheme() {
  const themeSwitch = document.getElementById('theme-switch');
  const root = document.documentElement;
  
  if (themeSwitch) {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply theme based on saved preference or system preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.add('dark-theme');
      themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
      applyDarkTheme();
    } else {
      document.body.classList.remove('dark-theme');
      themeSwitch.innerHTML = '<i class="fas fa-moon"></i>';
      applyLightTheme();
    }
    
    // Toggle theme when button is clicked
    themeSwitch.addEventListener('click', function() {
      if (document.body.classList.contains('dark-theme')) {
        // Switch to light theme
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        themeSwitch.innerHTML = '<i class="fas fa-moon"></i>';
        applyLightTheme();
      } else {
        // Switch to dark theme
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
        applyDarkTheme();
      }
    });
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      // Only apply if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        if (e.matches) {
          document.body.classList.add('dark-theme');
          themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
          applyDarkTheme();
        } else {
          document.body.classList.remove('dark-theme');
          themeSwitch.innerHTML = '<i class="fas fa-moon"></i>';
          applyLightTheme();
        }
      }
    });
  }
}

function applyLightTheme() {
  const root = document.documentElement;
  root.style.setProperty('--color-bg', '#f8f9fa');
  root.style.setProperty('--color-text', '#333333');
  root.style.setProperty('--color-text-secondary', '#666666');
  root.style.setProperty('--color-primary', '#3b82f6');
  root.style.setProperty('--color-primary-dark', '#2563eb');
  root.style.setProperty('--color-surface', '#ffffff');
  root.style.setProperty('--color-surface-variant', '#f1f5f9');
  root.style.setProperty('--color-border', '#e2e8f0');
  root.style.setProperty('--shadow-sm', '0 1px 2px rgba(0, 0, 0, 0.05)');
  root.style.setProperty('--shadow-md', '0 4px 6px -1px rgba(0, 0, 0, 0.1)');
  root.style.setProperty('--shadow-lg', '0 10px 15px -3px rgba(0, 0, 0, 0.1)');
}

function applyDarkTheme() {
  const root = document.documentElement;
  root.style.setProperty('--color-bg', '#1a1a1a');
  root.style.setProperty('--color-text', '#e5e5e5');
  root.style.setProperty('--color-text-secondary', '#a3a3a3');
  root.style.setProperty('--color-primary', '#60a5fa');
  root.style.setProperty('--color-primary-dark', '#3b82f6');
  root.style.setProperty('--color-surface', '#262626');
  root.style.setProperty('--color-surface-variant', '#2d2d2d');
  root.style.setProperty('--color-border', '#404040');
  root.style.setProperty('--shadow-sm', '0 1px 2px rgba(0, 0, 0, 0.3)');
  root.style.setProperty('--shadow-md', '0 4px 6px -1px rgba(0, 0, 0, 0.4)');
  root.style.setProperty('--shadow-lg', '0 10px 15px -3px rgba(0, 0, 0, 0.5)');
}