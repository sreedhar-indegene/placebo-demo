/**
 * PBCards Block
 * Transforms authored structure into proper card layout
 */

export default function decorate(block) {
  const cards = [...block.children];

  block.classList.add('pbcards-container');

  cards.forEach((card) => {
    card.classList.add('pb-card');

    const imageWrapper = card.children[0];
    const eyebrowWrapper = card.children[1];
    const titleWrapper = card.children[2];
    const ctaWrapper = card.children[3];

    // Create structured content container
    const content = document.createElement('div');
    content.className = 'pb-card-content';

    /* Eyebrow */
    if (eyebrowWrapper) {
      eyebrowWrapper.classList.add('pb-card-eyebrow');
      content.appendChild(eyebrowWrapper);
    }

    /* Title */
    if (titleWrapper) {
      titleWrapper.classList.add('pb-card-title');
      content.appendChild(titleWrapper);
    }

    /* CTA Button */
    if (ctaWrapper) {
      const text = ctaWrapper.textContent.trim();
      const button = document.createElement('a');
      button.textContent = text;
      button.href = '#';
      button.className = 'pb-card-button';

      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'pb-card-cta';
      buttonContainer.appendChild(button);

      content.appendChild(buttonContainer);
    }

    // Clear card and rebuild
    card.innerHTML = '';
    card.appendChild(imageWrapper);
    card.appendChild(content);
  });
}
