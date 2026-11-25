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
