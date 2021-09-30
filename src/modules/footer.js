export default function buildFooter() {
  const footer = document.createElement('footer');
  footer.classList.add('footer');

  const footerName = document.createElement('p');
  footerName.textContent = 'by Ryan Talbot';
  footerName.setAttribute('id', 'footer-name');

  const iconNotice = document.createElement('p');
  iconNotice.setAttribute('id', 'icon-notice');
  iconNotice.textContent = 'Icons by Phosphor Icons';

  const phosphorIcons = document.createElement('a');
  phosphorIcons.setAttribute(
    'href',
    'https://github.com/phosphor-icons/phosphor-icons'
  );
  phosphorIcons.setAttribute('title', 'Phosphor Icons');
  phosphorIcons.classList.add('ph-github-logo');

  iconNotice.appendChild(phosphorIcons);

  footer.appendChild(footerName);
  footer.appendChild(iconNotice);

  return footer;
}
