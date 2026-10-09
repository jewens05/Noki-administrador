/**
 * NOKI Web — Módulo de Accesibilidad & Notificaciones Centralizado
 * Gestiona:
 * 1. Modo Oscuro / Alto Contraste (Deshabilitado en Login)
 * 2. Escalado de Tamaño de Texto (100% -> 112% -> 125% -> 100%)
 * 3. Menú Desplegable de Notificaciones en Topbar
 */

(function () {
  'use strict';

  const isLoginPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || !!document.getElementById('login-form');

  // 1. Aplicación Inmediata de Preferencias Guardadas (Evita parpadeo)
  const savedTheme = isLoginPage ? 'light' : (localStorage.getItem('noki-theme') || 'light');
  const savedFontSize = localStorage.getItem('noki-font-size') || 'normal';

  function applyTheme(theme) {
    if (isLoginPage) {
      document.documentElement.removeAttribute('data-theme');
      if (document.body) document.body.classList.remove('dark-mode');
      return;
    }

    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (document.body) document.body.classList.add('dark-mode');
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (document.body) document.body.classList.remove('dark-mode');
    }
  }

  function applyFontSize(size) {
    let px = '16px';
    if (size === 'grande') px = '18px';
    if (size === 'extra-grande') px = '20px';

    document.documentElement.style.fontSize = px;
  }

  applyTheme(savedTheme);
  applyFontSize(savedFontSize);

  // 2. Inicialización de Controles del DOM
  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(isLoginPage ? 'light' : (localStorage.getItem('noki-theme') || 'light'));
    applyFontSize(localStorage.getItem('noki-font-size') || 'normal');

    // Botón de Contraste / Tema
    const themeBtn = document.getElementById('btn-theme-toggle');
    const themeIcon = document.getElementById('theme-toggle-icon');

    function updateThemeUI(theme) {
      if (themeBtn) {
        themeBtn.setAttribute('title', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro (Alto contraste)');
        themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
      }
      if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'ph ph-sun' : 'ph ph-moon';
      }
    }

    if (!isLoginPage) {
      const currentTheme = localStorage.getItem('noki-theme') || 'light';
      updateThemeUI(currentTheme);

      if (themeBtn) {
        themeBtn.addEventListener('click', function () {
          const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
          const newTheme = isDark ? 'light' : 'dark';

          applyTheme(newTheme);
          localStorage.setItem('noki-theme', newTheme);
          updateThemeUI(newTheme);
        });
      }
    }

    // Botón de Tamaño de Texto
    const fontBtn = document.getElementById('btn-font-size');
    const fontBadge = document.getElementById('font-size-badge');

    function updateFontUI(size) {
      if (fontBadge) {
        if (size === 'grande') fontBadge.textContent = '112%';
        else if (size === 'extra-grande') fontBadge.textContent = '125%';
        else fontBadge.textContent = '100%';
      }
      if (fontBtn) {
        let label = 'Tamaño de texto: Normal (100%). Clic para aumentar';
        if (size === 'grande') label = 'Tamaño de texto: Grande (112%). Clic para aumentar';
        if (size === 'extra-grande') label = 'Tamaño de texto: Extra Grande (125%). Clic para restablecer';
        fontBtn.setAttribute('title', label);
        fontBtn.setAttribute('aria-label', label);
      }
    }

    const currentFont = localStorage.getItem('noki-font-size') || 'normal';
    updateFontUI(currentFont);

    if (fontBtn) {
      fontBtn.addEventListener('click', function () {
        const curr = localStorage.getItem('noki-font-size') || 'normal';
        let next = 'grande';
        if (curr === 'grande') next = 'extra-grande';
        else if (curr === 'extra-grande') next = 'normal';

        applyFontSize(next);
        localStorage.setItem('noki-font-size', next);
        updateFontUI(next);
      });
    }

    // 3. Menú Desplegable de Notificaciones en Topbar
    const notifBtn = document.getElementById('notifications-btn');
    const notifDropdown = document.getElementById('notifications-dropdown');
    const markReadBtn = document.getElementById('btn-mark-notifications-read');

    if (notifBtn && notifDropdown) {
      notifBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const isVisible = notifDropdown.style.display === 'block';
        notifDropdown.style.display = isVisible ? 'none' : 'block';
        notifBtn.setAttribute('aria-expanded', !isVisible);
      });

      document.addEventListener('click', function (e) {
        if (!notifBtn.contains(e.target) && !notifDropdown.contains(e.target)) {
          notifDropdown.style.display = 'none';
          notifBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    if (markReadBtn) {
      markReadBtn.addEventListener('click', function () {
        const dots = document.querySelectorAll('.notification-dot');
        const countBadges = document.querySelectorAll('.notification-count-badge');
        dots.forEach(d => d.style.display = 'none');
        countBadges.forEach(b => b.textContent = '0 nuevas');
        markReadBtn.textContent = 'Notificaciones leídas';
        markReadBtn.disabled = true;
      });
    }
  });
})();
