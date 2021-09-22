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
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API}`;

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

    let fiveDayForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${API}`;

    let fiveDayForecastResponse = await fetch(fiveDayForecastURL)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        let uniqueDates = getUniqueDates(res.list);
      });
  } catch (error) {
    console.log(error);
  }
}

function getMaxTemp(givenArray, attribute) {
  return Math.max(...givenArray.map((item) => item.main[attribute]));
}

function getMinTemp(givenArray, attribute) {
  return Math.min(...givenArray.map((item) => item.main[attribute]));
}

function getUniqueDates(data) {
  let dates = [];
  let uniqueDates = [];

  data.forEach((element) => {
    let rawDate = element.dt_txt;
    let extractedDate = rawDate.split(' ');
    dates.push(extractedDate[0]);
  });

  dates.forEach((date) => {
    if (!uniqueDates.includes(date)) {
      uniqueDates.push(date);
    }
  });

  return uniqueDates;
}

function displayCurrentWeather(location, currentTemp, currentWeather) {
  const splash = document.getElementById('splash-area');

  const currentWeatherContainer = document.createElement('div');
  currentWeatherContainer.classList.add('cur-weather-container');

  const title = document.createElement('p');
  title.setAttribute('id', 'title');
  title.textContent = `Showing the current weather for `;

  const locationHeader = document.createElement('p');
  locationHeader.setAttribute('id', 'cur-local');
  locationHeader.textContent = location;

  const currentTempHeader = document.createElement('p');
  currentTempHeader.setAttribute('id', 'cur-temp');
  currentTempHeader.textContent = currentTemp;

  const currentWeatherIcon = new Image();
  currentWeatherIcon.setAttribute('id', 'cur-weather-icon');
  currentWeatherIcon.src = getWeatherIcon(currentWeather);

  currentWeatherContainer.appendChild(title);
  currentWeatherContainer.appendChild(locationHeader);
  currentWeatherContainer.appendChild(currentTempHeader);
  currentWeatherContainer.appendChild(currentWeatherIcon);

  splash.appendChild(currentWeatherContainer);

  return splash;
}

function getWeatherIcon(currentWeather) {
  switch (currentWeather) {
    case 'Clear':
      return SunIcon;
    case 'Rain':
      return RainIcon;
    case 'Clouds':
      return OvercastIcon;
    case 'Fog':
      return FogIcon;
    case 'Mist':
      return MistIcon;
  }
}
