export async function weatherSearch(location) {
  try {
    let API = process.env.API;
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API}`;
    let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${API}`;

    let currentTemp;
    let currentWeather;
    let currentWeatherDesc;

    // current weather response
    await fetch(URL)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        currentTemp = Math.floor(res.main.temp);
        currentWeather = res.weather[0].main;
        currentWeatherDesc = res.weather[0].description;

        displayCurrentWeather(
          location,
          currentTemp,
          currentWeather,
          currentWeatherDesc
        );
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
          let forecastDescription = getForecastDescription(
            groupedData[date],
            'main'
          );
          displayForecast(dateFixed, max, min, forecastDescription);
        }
      });
  } catch (error) {
    console.log(error);
  }
}

function getForecastDescription(givenArray, attribute) {
  let arr = givenArray.map((item) => item.weather[0][attribute]);
  return arr[0];
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

function displayCurrentWeather(
  location,
  currentTemp,
  currentWeather,
  description
) {
  const splash = document.getElementById('splash-area');

  const currentWeatherContainer = document.createElement('div');
  currentWeatherContainer.classList.add('cur-weather-container');
  currentWeatherContainer.setAttribute('id', 'current-cont');

  const locationHeader = document.createElement('p');
  locationHeader.setAttribute('id', 'cur-local');
  locationHeader.textContent = capitalizeEachWord(location);

  const currentTempHeader = document.createElement('p');
  currentTempHeader.setAttribute('id', 'cur-temp');
  currentTempHeader.textContent = `${currentTemp}℃`;

  const title = document.createElement('p');
  title.setAttribute('id', 'title');
  title.textContent = capitalizeEachWord(description);

  const currentWeatherIcon = document.createElement('i');
  currentWeatherIcon.setAttribute('id', 'cur-weather-icon');
  currentWeatherIcon.classList.add(getWeatherIcon(currentWeather));

  currentWeatherContainer.appendChild(title);
  currentWeatherContainer.appendChild(locationHeader);
  currentWeatherContainer.appendChild(currentTempHeader);
  currentWeatherContainer.appendChild(currentWeatherIcon);

  splash.appendChild(currentWeatherContainer);

  return splash;
}

function capitalizeEachWord(givenText) {
  const str = givenText.toLowerCase().split(' ');

  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].substring(1);
  }

  return str.join(' ');
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

function displayForecast(dateGiven, max, min, forecastDescription) {
  const forecastContainer = document.getElementById('fore-cont');

  const forecastItem = document.createElement('div');
  forecastItem.setAttribute('id', 'day');

  const date = document.createElement('p');
  date.setAttribute('id', 'date');
  date.textContent = dateGiven;

  const maxTemp = document.createElement('p');
  maxTemp.setAttribute('id', 'max-temp');
  maxTemp.textContent = `${max}°`;

  const separator = document.createElement('p');
  separator.setAttribute('id', 'separate');
  separator.textContent = `/`;

  const minTemp = document.createElement('p');
  minTemp.setAttribute('id', 'min-temp');
  minTemp.textContent = `${min}°`;

  const forecastIcon = document.createElement('i');
  forecastIcon.setAttribute('id', 'forecast-weather-icon');
  forecastIcon.classList.add(getWeatherIcon(forecastDescription));

  forecastItem.appendChild(date);
  forecastItem.appendChild(maxTemp);
  forecastItem.appendChild(minTemp);
  forecastItem.appendChild(separator);
  forecastItem.appendChild(forecastIcon);

  forecastContainer.appendChild(forecastItem);

  return forecastContainer;
}

function getWeatherIcon(currentWeather) {
  switch (currentWeather) {
    case 'Clear':
      return 'ph-sun';
    case 'Rain':
      return 'ph-cloud-rain';
    case 'Clouds':
      return 'ph-cloud';
    case 'Fog':
      return 'ph-cloud-fog';
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
