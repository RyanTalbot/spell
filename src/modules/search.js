import { weatherSearch } from './weather';
import SearchIcon from '../resources/icons/search-icon.png';

export function buildForm() {
  const locationForm = document.createElement('form');
  locationForm.setAttribute('id', 'l-form');
  locationForm.classList.add('location-form');

  const locationInput = document.createElement('input');
  locationInput.setAttribute('type', 'text');
  locationInput.setAttribute('name', 'locationInput');
  locationInput.setAttribute('value', '');
  locationInput.setAttribute('placeholder', 'City');
  locationInput.setAttribute('id', 'city-input');

  const locationButton = document.createElement('button');
  locationButton.setAttribute('class', 'search-button');

  const searchIcon = new Image();
  searchIcon.src = SearchIcon;
  searchIcon.setAttribute('id', 'search-png');
  locationButton.appendChild(searchIcon);

  locationButton.addEventListener('click', (e) => {
    e.preventDefault();

    let val = document.getElementById('l-form');
    let citySearch = val.elements[0].value;

    weatherSearch(citySearch);
  });

  locationForm.appendChild(locationInput);
  locationForm.appendChild(locationButton);

  return locationForm;
}
