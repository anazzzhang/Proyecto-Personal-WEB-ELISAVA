const root = document.documentElement;
const themeToggle = document.querySelector('#theme-toggle');
const themeLabel = themeToggle?.querySelector('.theme-label');
const themeIcon = themeToggle?.querySelector('.theme-icon');
const progress = document.querySelector('#progress');

function applyTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === 'dark';
  themeToggle?.setAttribute('aria-pressed', String(dark));
  themeToggle?.setAttribute('aria-label', dark ? 'Activar modo claro' : 'Activar modo oscuro');
  if (themeLabel) themeLabel.textContent = dark ? 'MODO CLARO' : 'MODO OSCURO';
  if (themeIcon) themeIcon.textContent = dark ? '☼' : '◐';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#111111' : '#f4f4f1');
}

let savedTheme = null;
try { savedTheme = localStorage.getItem('echoes-theme'); } catch {}
applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

themeToggle?.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('echoes-theme', next); } catch {}
});

function updateReadingProgress() {
  if (!progress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const amount = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = Math.min(100, Math.max(0, amount)) + '%';
}
window.addEventListener('scroll', updateReadingProgress, { passive: true });
window.addEventListener('resize', updateReadingProgress);
updateReadingProgress();

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

document.querySelectorAll('.fragment-card').forEach(card => {
  card.addEventListener('click', () => {
    const expanded = card.getAttribute('aria-expanded') === 'true';
    card.setAttribute('aria-expanded', String(!expanded));
    const symbol = card.querySelector('.fragment-top b');
    if (symbol) symbol.textContent = expanded ? '+' : '−';
  });
});

const navLinks = [...document.querySelectorAll('.site-header nav a')];
const navSections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window && navSections.length) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  navSections.forEach(section => sectionObserver.observe(section));
}

/* Inline word interactions: hover/focus on desktop, tap on touch screens. */
document.querySelectorAll('.word-trigger').forEach(word => {
  word.setAttribute('aria-label', word.textContent.trim() + '. ' + word.dataset.note);
  word.setAttribute('aria-expanded', 'false');
  word.addEventListener('click', event => {
    event.stopPropagation();
    const willOpen = !word.classList.contains('is-open');
    document.querySelectorAll('.word-trigger.is-open').forEach(openWord => {
      openWord.classList.remove('is-open');
      openWord.setAttribute('aria-expanded', 'false');
    });
    if (willOpen) {
      word.classList.add('is-open');
      word.setAttribute('aria-expanded', 'true');
    }
  });
  word.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      word.classList.remove('is-open');
      word.setAttribute('aria-expanded', 'false');
      word.blur();
    }
  });
});
document.addEventListener('click', event => {
  if (!event.target.closest('.word-trigger')) {
    document.querySelectorAll('.word-trigger.is-open').forEach(word => {
      word.classList.remove('is-open');
      word.setAttribute('aria-expanded', 'false');
    });
  }
});

/* A subtle magnetic response on the oversized title; no font or layout changes. */
const heroTitle = document.querySelector('.hero-title');
if (heroTitle && window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  heroTitle.addEventListener('pointermove', event => {
    const bounds = heroTitle.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    heroTitle.style.setProperty('--mag-x', (x * 5).toFixed(2) + 'px');
    heroTitle.style.setProperty('--mag-y', (y * 4).toFixed(2) + 'px');
  });
  heroTitle.addEventListener('pointerleave', () => {
    heroTitle.style.setProperty('--mag-x', '0px');
    heroTitle.style.setProperty('--mag-y', '0px');
  });
}
