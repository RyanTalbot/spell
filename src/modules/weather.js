import SunIcon from '../resources/icons/sun-icon.png';
import WindIcon from '../resources/icons/wind-icon.png';
import StormIcon from '../resources/icons/storm-icon.png';
import RainIcon from '../resources/icons/rain-icon.png';
import OvercastIcon from '../resources/icons/overcast-icon.png';
import MistIcon from '../resources/icons/mist-icon.png';
import FogIcon from '../resources/icons/fog-icon.png';

export async function weatherSearch(location) {
  try {
    let API = process.env.API;
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API}`;
    let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${API}`;

    let currentTemp;
    let currentWeather;

    // current weather response
    await fetch(URL)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        currentTemp = Math.floor(res.main.temp);
        currentWeather = res.weather[0].main;

        displayCurrentWeather(location, currentTemp, currentWeather);
      });

    // forecast response
    await fetch(forecastURL)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res.list);

        const groupedData = getGroupedDataForEachDate(res.list);

        console.log(groupedData);

        createForecastContainer();

        for (let date of Object.keys(groupedData)) {
          console.log(`Date: ${getOrdinalSuffix(date)}`);
          console.log(`RowCount: ${groupedData[date].length}`);
          console.log(`Max: ${getMaxTemp(groupedData[date], 'temp_max')}`);
          console.log(`Min: ${getMinTemp(groupedData[date], 'temp_min')}`);
          console.log(
            `Desc ${getForecastDescription(groupedData[date], 'main')}`
          );
          console.log(`\n\n`);
          let dateFixed = getOrdinalSuffix(date);
          let max = getMaxTemp(groupedData[date], 'temp_max');
          let min = getMinTemp(groupedData[date], 'temp_min');
          displayForecast(dateFixed, max, min);
        }
      });
  } catch (error) {
    console.log(error);
  }
}

function getForecastDescription(givenArray, attribute) {
  return givenArray.map((item) => item.weather[0][attribute]);
}

function getGroupedDataForEachDate(data) {
  return data.reduce((days, row) => {
    const date = row.dt_txt.split(' ')[0];
    days[date] = [...(days[date] ? days[date] : []), row];
    return days;
  }, {});
}

function getMaxTemp(givenArray, attribute) {
  return Math.ceil(Math.max(...givenArray.map((item) => item.main[attribute])));
}

function getMinTemp(givenArray, attribute) {
  return Math.floor(
    Math.min(...givenArray.map((item) => item.main[attribute]))
  );
}

function getOrdinalSuffix(date) {
  let dateSliced = date.slice(-2);
  let dateAsNumber = Number(dateSliced);

  let j = dateAsNumber % 10;
  let k = dateAsNumber % 100;

  if (j === 1 && k !== 11) {
    return `${dateAsNumber}st`;
  }
  if (j === 2 && k !== 12) {
    return `${dateAsNumber}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${dateAsNumber}rd`;
  }
  return `${dateAsNumber}th`;
}

function displayCurrentWeather(location, currentTemp, currentWeather) {
  const splash = document.getElementById('splash-area');

  const currentWeatherContainer = document.createElement('div');
  currentWeatherContainer.classList.add('cur-weather-container');
  currentWeatherContainer.setAttribute('id', 'current-cont');

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

function createForecastContainer() {
  const splash = document.getElementById('splash-area');

  const forecastContainer = document.createElement('div');
  forecastContainer.classList.add('forecast-container');
  forecastContainer.setAttribute('id', 'fore-cont');

  // const forecastTitle = document.createElement('p');
  // forecastTitle.setAttribute('id', 'forecast-title');
  // forecastTitle.textContent = 'Next couple of days look like this';

  // forecastContainer.appendChild(forecastTitle);
  splash.appendChild(forecastContainer);

  return splash;
}

function displayForecast(dateGiven, max, min) {
  const forecastContainer = document.getElementById('fore-cont');

  const forecastItem = document.createElement('div');
  forecastItem.setAttribute('id', 'day');

  const date = document.createElement('p');
  date.setAttribute('id', 'date');
  date.textContent = dateGiven;

  const maxTemp = document.createElement('p');
  maxTemp.setAttribute('id', 'max-temp');
  maxTemp.textContent = max;

  const minTemp = document.createElement('p');
  minTemp.setAttribute('id', 'min-temp');
  minTemp.textContent = min;

  forecastItem.appendChild(date);
  forecastItem.appendChild(maxTemp);
  forecastItem.appendChild(minTemp);

  forecastContainer.appendChild(forecastItem);

  return forecastContainer;
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

export function clear() {
  const currentCont = document.getElementById('current-cont');
  const forecastCont = document.getElementById('fore-cont');

  if (document.contains(currentCont)) {
    currentCont.remove();
    forecastCont.remove();
  }
}
