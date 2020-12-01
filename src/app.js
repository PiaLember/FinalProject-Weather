function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#search-outcome");
  let descriptionElement = document.querySelector("#description");
  let realFeelElement = document.querySelector("#real-feel");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#time");
  let currentTime = new Date();
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}°`;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  realFeelElement.innerHTML = `Real feel ${Math.round(
    response.data.main.feels_like
  )}°`;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;
  dateElement.innerHTML = formatDate(currentTime);
}

let apiKey = "ac0f4954f2276c6ad1120e7edce5fa23";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lewisville&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
