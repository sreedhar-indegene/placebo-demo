export default function decorate(block) {
  const row = block.querySelector(':scope > div');
  const overlay = document.createElement('div');
  overlay.className = 'primarybanner-overlay';

  const title = row.children[1];
  const desc = row.children[2];
  const cta = row.children[3];

  title.classList.add('banner-title');
  desc.classList.add('banner-desc');

  overlay.append(title, desc, cta);
  row.appendChild(overlay);
}