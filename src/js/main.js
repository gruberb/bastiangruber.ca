function setupThemeToggle() {
  const button = document.getElementById('theme-toggle');
  if (!button) return;

  const root = document.documentElement;
  button.addEventListener('click', () => {
    const isDark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = isDark ? 'light' : 'dark';
    try {
      localStorage.setItem('theme', root.dataset.theme);
    } catch (_) {
      // Storage can be blocked (private mode); the toggle still works for this page.
    }
  });
}

function setupMobileNav() {
  const button = document.getElementById('menubtn');
  const nav = document.getElementById('nav');
  if (!button || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle('open', open);
    button.setAttribute('aria-expanded', String(open));
  };

  button.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
}

function setupReadingProgress() {
  const bar = document.getElementById('reading-progress');
  if (!bar) return;

  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    bar.style.width = `${max > 0 ? Math.min(100, (doc.scrollTop / max) * 100) : 0}%`;
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

// Highlights the section currently at the top of the viewport in the sidebar.
function setupScrollSpy() {
  const links = [...document.querySelectorAll('#toc li a')];
  if (links.length === 0) return;

  const headings = links.map((a) => document.getElementById(a.hash.slice(1)));
  const offset = 120;
  let ticking = false;

  const update = () => {
    ticking = false;
    let active = 0;
    headings.forEach((h, i) => {
      if (h && h.getBoundingClientRect().top < offset) active = i;
    });
    // A short final section can never scroll up to the offset line, so once the page
    // bottoms out, the last heading is the one being read.
    const doc = document.documentElement;
    if (doc.scrollTop + doc.clientHeight >= doc.scrollHeight - 2) {
      active = headings.length - 1;
    }
    links.forEach((a, i) => a.classList.toggle('active', i === active));
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  update();
}

function setupCopyButtons() {
  document.querySelectorAll('.codeblock .copybtn').forEach((button) => {
    // Promise chain instead of async/await: preset-env would need regenerator-runtime.
    button.addEventListener('click', () => {
      const code = button.closest('.codeblock').querySelector('pre code, pre');
      navigator.clipboard.writeText(code.innerText)
        .then(() => { button.textContent = 'Copied'; })
        .catch(() => { button.textContent = 'Failed'; })
        .then(() => setTimeout(() => { button.textContent = 'Copy'; }, 2000));
    });
  });
}

// Blog index: filter rows by free text and topic. The server renders every post, so
// without JS the controls stay hidden and the full list is still there.
function setupPostFilter() {
  const input = document.getElementById('post-filter');
  const filters = document.getElementById('topic-filters');
  if (!input || !filters) return;

  document.querySelectorAll('[data-js-only]').forEach((el) => { el.hidden = false; });

  const rows = [...document.querySelectorAll('.blog-index .row')];
  const groups = [...document.querySelectorAll('.year-group')];
  const count = document.getElementById('post-count');
  const empty = document.getElementById('post-empty');
  let topic = '';

  const apply = () => {
    const needle = input.value.trim().toLowerCase();
    let visible = 0;
    rows.forEach((row) => {
      const show = (!topic || row.dataset.topic === topic)
        && (!needle || row.dataset.search.includes(needle));
      row.hidden = !show;
      if (show) visible += 1;
    });
    groups.forEach((g) => { g.hidden = !g.querySelector('.row:not([hidden])'); });
    count.textContent = `Posts: ${visible}`;
    empty.hidden = visible > 0;
  };

  input.addEventListener('input', apply);
  filters.addEventListener('click', (e) => {
    const button = e.target.closest('.filter');
    if (!button) return;
    topic = button.dataset.topic;
    filters.querySelectorAll('.filter').forEach((b) => {
      b.setAttribute('aria-pressed', String(b === button));
    });
    apply();
  });

  document.addEventListener('keydown', (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if (e.key === '/' && !typing) {
      e.preventDefault();
      input.focus();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  setupMobileNav();
  setupReadingProgress();
  setupScrollSpy();
  setupCopyButtons();
  setupPostFilter();
});
