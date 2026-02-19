import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const isDesktop = window.matchMedia('(min-width: 900px)');

function toggleMenu(nav, forceExpanded = null) {
  const expanded =
    forceExpanded !== null
      ? !forceExpanded
      : nav.getAttribute('aria-expanded') === 'true';

  const button = nav.querySelector('.nav-hamburger button');

  document.body.style.overflowY =
    (expanded || isDesktop.matches) ? '' : 'hidden';

  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');

  if (button) {
    button.setAttribute(
      'aria-label',
      expanded ? 'Open navigation' : 'Close navigation'
    );
  }
}

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta
    ? new URL(navMeta, window.location).pathname
    : '/nav';

  const fragment = await loadFragment(navPath);

  block.textContent = '';

  const nav = document.createElement('nav');
  nav.id = 'nav';

  while (fragment.firstElementChild) {
    nav.append(fragment.firstElementChild);
  }

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const hamburger = document.createElement('div');
  hamburger.className = 'nav-hamburger';

  hamburger.innerHTML = `
    <button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>
  `;

  hamburger.addEventListener('click', () => toggleMenu(nav));

  nav.prepend(hamburger);

  nav.setAttribute('aria-expanded', 'false');

  toggleMenu(nav, isDesktop.matches);
  isDesktop.addEventListener('change', () =>
    toggleMenu(nav, isDesktop.matches)
  );

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);

  block.append(navWrapper);

  /* Convert "Connect with us" text into button */
const ctaText = nav.querySelector(
  '.nav-sections .default-content-wrapper > p:last-child'
);

if (ctaText && ctaText.textContent.trim()) {
  const btn = document.createElement('a');
  btn.className = 'nav-cta-button';
  btn.href = '#'; // replace with real link if needed
  btn.textContent = ctaText.textContent.trim();

  ctaText.replaceWith(btn);
}
}
