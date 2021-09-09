export default function buildHeader() {
  const header = document.createElement('header');
  header.classList.add('header');

  const logo = document.createElement('h1');
  logo.textContent = 'Spell';
  logo.classList.add('logo');

  header.appendChild(logo);

  return header;
}
