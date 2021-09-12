export default function buildFooter() {
  const footer = document.createElement('footer');
  footer.classList.add('footer');

  const footTest = document.createElement('p');
  footTest.textContent = 'footer';

  footer.appendChild(footTest);

  return footer;
}
