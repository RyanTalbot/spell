export async function weatherSearch(location) {
  try {
    let API = process.env.API;
    let URL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API}`;

    await fetch(URL)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(`${location}`);
        console.log(`Temp: ${res.main.temp}`);
        console.log(`Weather: ${res.weather[0].main}`);
      });
  } catch (error) {
    console.log(error);
  }
}
