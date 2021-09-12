import buildFooter from './footer';
import buildHeader from './header';
import buildLanding from './landing';

export default function buildWebsite() {
  const content = document.getElementById('content');

  const container = document.createElement('div');
  container.classList.add('container');
  content.appendChild(container);

  container.appendChild(buildHeader());
  container.appendChild(buildLanding());
  container.appendChild(buildFooter());
}
