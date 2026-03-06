export default function decorate(block) {
  const row = block.querySelector(':scope > div');
  if (!row) return;

  const imageCol = row.children[0];
  const title = row.children[1];
  const desc = row.children[2];
  const cta = row.children[3];

  // Create text column
  const textCol = document.createElement('div');
  textCol.className = 'imagetext-text';

  // Add semantic classes
  if (title) title.classList.add('imagetext-title');
  if (desc) desc.classList.add('imagetext-desc');
  //if (cta) cta.classList.add('imagetext-cta');

  textCol.append(title, desc, cta);

  // Clear and rebuild as 2-column layout
  row.innerHTML = '';
  row.append(textCol, imageCol);
}