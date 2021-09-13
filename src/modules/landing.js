import { buildForm } from './search';

export default function buildLanding() {
  const splash = document.createElement('div');
  splash.classList.add('splash');

  splash.appendChild(buildForm());

  return splash;
}
