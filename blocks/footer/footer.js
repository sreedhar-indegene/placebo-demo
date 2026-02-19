import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // Load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : '/footer';

  const fragment = await loadFragment(footerPath);

  // Clear block
  block.textContent = '';

  // Wrapper
  const footer = document.createElement('div');

  while (fragment.firstElementChild) {
    footer.append(fragment.firstElementChild);
  }

  block.append(footer);

  /* =========================
     CUSTOM DECORATION
  ========================= */

  const sections = block.querySelectorAll('.section');

  // Assign row classes
  sections.forEach((section, i) => {
    section.classList.add(`footer-row-${i + 1}`);
  });

  /* ---------- ROW 1: NAV ---------- */
  const row1 = block.querySelector('.footer-row-1 ul');
  if (row1) {
    row1.classList.add('footer-nav');
  }

  /* ---------- ROW 2: LEGAL ---------- */
  const row2 = block.querySelector('.footer-row-2');
  if (row2) {
    row2.classList.add('footer-legal');
  }

  /* ---------- ROW 3: LOGO + BADGES ---------- */
  const row3 = block.querySelector('.footer-row-3 .default-content-wrapper');

  if (row3) {
    row3.classList.add('footer-branding');

    const buttons = row3.querySelectorAll('.button-container');

    if (buttons.length) {
      const badgeGroup = document.createElement('div');
      badgeGroup.className = 'footer-badges';

      buttons.forEach((btn) => badgeGroup.appendChild(btn));

      row3.appendChild(badgeGroup);
    }
  }
}
