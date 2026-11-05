// Wird im <head> geladen, damit das Farbschema schon vor dem ersten Rendern steht.
(function () {
  var THEME_KEY = 'lukman-portfolio-theme';
  var root = document.documentElement;
  var stored = null;

  try { stored = localStorage.getItem(THEME_KEY); } catch (e) {}

  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = stored === 'dark' || stored === 'light' ? stored : (prefersDark ? 'dark' : 'light');
  root.classList.add('js');
})();
