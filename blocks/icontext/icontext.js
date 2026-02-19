/**
 * IconText Block
 * Layout: Image left | Content right
 */

export default function decorate(block) {
  const row = block.querySelector(':scope > div');
  if (!row) return;

  const imageWrapper = row.children[0];
  const titleWrapper = row.children[1];
  const descriptionWrapper = row.children[2];
  const ctaWrapper = row.children[3];

  block.classList.add('icontext-container');

  /* Create structured layout */
  const content = document.createElement('div');
  content.className = 'icontext-content';

  // Title
  if (titleWrapper) {
    titleWrapper.classList.add('icontext-title');
    content.appendChild(titleWrapper);
  }

  // Description
  if (descriptionWrapper) {
    descriptionWrapper.classList.add('icontext-description');
    content.appendChild(descriptionWrapper);
  }

  // CTA
  if (ctaWrapper) {
    const text = ctaWrapper.textContent.trim();
    const button = document.createElement('a');
    button.textContent = text;
    button.href = '#';
    button.className = 'icontext-button';

    const ctaDiv = document.createElement('div');
    ctaDiv.className = 'icontext-cta';
    ctaDiv.appendChild(button);

    content.appendChild(ctaDiv);
  }

  // Rebuild structure
  block.innerHTML = '';

  const layout = document.createElement('div');
  layout.className = 'icontext-layout';

  imageWrapper.classList.add('icontext-image');

  layout.appendChild(imageWrapper);
  layout.appendChild(content);

  block.appendChild(layout);
}
