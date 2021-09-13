export function buildForm() {
  const locationForm = document.createElement('form');
  //   locationForm.setAttribute('method', 'post');
  //   locationForm.setAttribute('action', '""');
  locationForm.classList.add('location-form');

  const locationInput = document.createElement('input');
  locationInput.setAttribute('type', 'text');
  locationInput.setAttribute('name', 'locationInput');
  locationInput.setAttribute('placeholder', 'City');

  const locationButton = document.createElement('input');
  locationButton.setAttribute('type', 'submit');
  locationButton.setAttribute('value', 'Submit');

  locationForm.appendChild(locationInput);
  locationForm.appendChild(locationButton);

  return locationForm;
}
