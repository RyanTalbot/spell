export function buildForm() {
  const locationForm = document.createElement('form');
  locationForm.setAttribute('id', 'l-form');
  locationForm.classList.add('location-form');

  const locationInput = document.createElement('input');
  locationInput.setAttribute('type', 'text');
  locationInput.setAttribute('name', 'locationInput');
  locationInput.setAttribute('value', '');
  locationInput.setAttribute('placeholder', 'City');

  const locationButton = document.createElement('input');
  locationButton.setAttribute('type', 'submit');
  locationButton.setAttribute('value', 'Submit');

  locationButton.addEventListener('click', (e) => {
    e.preventDefault();

    let val = document.getElementById('l-form');
    let citySearch = val.elements[0].value;

    alert(citySearch);
  });

  locationForm.appendChild(locationInput);
  locationForm.appendChild(locationButton);

  return locationForm;
}
