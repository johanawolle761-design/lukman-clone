const THEME_KEY = 'lukman-portfolio-theme';
const root = document.documentElement;

/* ---------- Farbschema ---------- */

function getStoredTheme() {
  try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
}

function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');

  toggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
  });

  // Systemeinstellung folgen, solange keine eigene Wahl gespeichert ist
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!getStoredTheme()) root.dataset.theme = e.matches ? 'dark' : 'light';
    });
  }
}

/* ---------- Einblenden beim Scrollen ---------- */

function initReveal() {
  const sections = document.querySelectorAll('.section');

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  sections.forEach((section) => observer.observe(section));
}

/* ---------- Terminal im Hero „tippt“ sich selbst ---------- */

function initTerminal() {
  const terminal = document.getElementById('terminal');
  if (!terminal || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const rows = Array.from(terminal.children);
  // Zeilen bleiben im Layout (visibility statt display) – so springt nichts
  rows.forEach((row) => row.classList.add('t-hidden'));

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function typeInto(el) {
    const text = el.textContent;
    el.textContent = '';
    for (const char of text) {
      el.textContent += char;
      await wait(45 + Math.random() * 45);
    }
  }

  async function run() {
    await wait(500);
    for (const row of rows) {
      row.classList.remove('t-hidden');
      const cmd = row.querySelector('.t-cmd');
      if (cmd) {
        await typeInto(cmd);
        await wait(300);
      } else {
        await wait(120);
      }
    }
  }

  run();
}

/* ---------- Aktiven Menüpunkt beim Scrollen markieren ---------- */

function initNavSpy() {
  const links = document.querySelectorAll('[data-nav]');
  if (!('IntersectionObserver' in window)) return;

  const byId = {};
  links.forEach((link) => { byId[link.getAttribute('href').slice(1)] = link; });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => link.classList.remove('is-active'));
      const link = byId[entry.target.id];
      if (link) link.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  document.querySelectorAll('main > section').forEach((section) => observer.observe(section));
}

/* ---------- Discord-Namen kopieren ---------- */

function initCopyDiscord() {
  const button = document.getElementById('copy-discord');
  const label = button.querySelector('.contact__copy');
  let timeout;

  button.addEventListener('click', () => {
    const text = button.dataset.copy;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }

    button.classList.add('is-copied');
    label.textContent = 'Kopiert ✓';

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      button.classList.remove('is-copied');
      label.textContent = 'Kopieren';
    }, 1800);
  });
}

/* ---------- Jahr im Footer ---------- */

function initYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}

initThemeToggle();
initReveal();
initTerminal();
initNavSpy();
initCopyDiscord();
initYear();
