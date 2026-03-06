export default function decorate(block) {
  const row = block.querySelector(':scope > div');
  if (!row) return;

  const title = row.children[0]?.textContent.trim();
  const desc = row.children[1]?.textContent.trim();
  const fieldLabel = row.children[2]?.textContent.trim();
  const errorMessage = row.children[3]?.textContent.trim();
  const buttonText = row.children[4]?.textContent.trim();
  const footerText = row.children[5]?.textContent.trim();

  // Clear block
  block.innerHTML = '';

  // Create form container
  const container = document.createElement('div');
  container.className = 'certifyform-container';

  const form = document.createElement('form');
  form.className = 'certifyform-form';
  form.setAttribute('novalidate', true);

  // Title
  if (title) {
    const h2 = document.createElement('h2');
    h2.textContent = title;
    container.appendChild(h2);
  }

  // Description
  if (desc) {
    const p = document.createElement('p');
    p.className = 'certifyform-desc';
    p.textContent = desc;
    container.appendChild(p);
  }

  // Input
  const inputWrapper = document.createElement('div');
  inputWrapper.className = 'certifyform-field';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = fieldLabel || '';
  input.name = 'numberfield';

  inputWrapper.appendChild(input);
  form.appendChild(inputWrapper);

  // Error Message
  const errorEl = document.createElement('div');
  errorEl.className = 'certifyform-error';
  errorEl.textContent = errorMessage || 'Please enter valid number';
  form.appendChild(errorEl);

  // Submit Button
  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = buttonText || 'Submit';
  form.appendChild(button);

  container.appendChild(form);

  // Footer
  if (footerText) {
    const footer = document.createElement('p');
    footer.className = 'certifyform-footer';
    footer.textContent = footerText;
    container.appendChild(footer);
  }

  block.appendChild(container);

  // Validation
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const value = input.value.trim();

    if (!/^\d+$/.test(value)) {
      errorEl.style.display = 'block';
      input.classList.add('error');
    } else {
      errorEl.style.display = 'none';
      input.classList.remove('error');
      alert('Form submitted successfully'); // You can remove this if not needed
    }
  });
}