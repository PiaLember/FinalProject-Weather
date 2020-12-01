function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#search-outcome");
  let descriptionElement = document.querySelector("#description");
  let realFeelElement = document.querySelector("#real-feel");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}°`;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  realFeelElement.innerHTML = `Real feel ${Math.round(
    response.data.main.feels_like
  )}°`;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;
}

let apiKey = "ac0f4954f2276c6ad1120e7edce5fa23";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lewisville&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
