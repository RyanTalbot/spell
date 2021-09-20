import SunIcon from '../resources/icons/sun-icon.png';
import WindIcon from '../resources/icons/wind-icon.png';
import StormIcon from '../resources/icons/storm-icon.png';
import RainIcon from '../resources/icons/rain-icon.png';
import OvercastIcon from '../resources/icons/overcast-icon.png';
import MistIcon from '../resources/icons/mist-icon.png';
import FogIcon from '../resources/icons/fog-icon.png';

export async function weatherSearch(location) {
  try {
    let API = '';
    let URL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API}`;

    let currentTemp;
    let currentWeather;

    let currentSearchResponse = await fetch(URL)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        currentTemp = Math.floor(res.main.temp);
        currentWeather = res.weather[0].main;

        console.log(`${location}`);
        console.log(`Temp: ${currentTemp}c`);
        console.log(`Weather: ${currentWeather}`);

        displayCurrentWeather(location, currentTemp, currentWeather);
      });
  } catch (error) {
    console.log(error);
  }
}

function displayCurrentWeather(location, currentTemp, currentWeather) {
  const splash = document.getElementById('splash-area');

  const currentWeatherContainer = document.createElement('div');
  currentWeatherContainer.classList.add('cur-weather-container');

  const locationHeader = document.createElement('p');
  locationHeader.textContent = location;

  const currentTempHeader = document.createElement('p');
  currentTempHeader.textContent = currentTemp;

  const currentWeatherIcon = new Image();

  switch (currentWeather) {
    case 'Clear':
      currentWeatherIcon.src = SunIcon;
      break;
    case 'Rain':
      currentWeatherIcon.src = RainIcon;
      break;
    case 'Clouds':
      currentWeatherIcon.src = OvercastIcon;
      break;
    case 'Fog':
      currentWeatherIcon.src = FogIcon;
      break;
    case 'Mist':
      currentWeatherIcon.src = MistIcon;
      break;
  }

  currentWeatherIcon.setAttribute('id', 'cur-weather-icon');

  currentWeatherContainer.appendChild(locationHeader);
  currentWeatherContainer.appendChild(currentTempHeader);
  currentWeatherContainer.appendChild(currentWeatherIcon);

  splash.appendChild(currentWeatherContainer);

  return splash;
}
