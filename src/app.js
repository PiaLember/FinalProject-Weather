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
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  celsiusRealFeel = response.data.main.feels_like;

  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°`;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  realFeelElement.innerHTML = `Real feel ${Math.round(celsiusRealFeel)}°`;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;
  dateElement.innerHTML = formatDate(currentTime);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "ac0f4954f2276c6ad1120e7edce5fa23";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function diplayFahrenheitTemperature(event) {
  let temperatureElement = document.querySelector("#temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°`;
}
function displayFahrenheitRealFeel(event) {
  let temperatureRealFeel = document.querySelector("#real-feel");
  let fahrenheitRealFeel = (celsiusRealFeel * 9) / 5 + 32;
  temperatureRealFeel.innerHTML = `Real feel ${Math.round(
    fahrenheitRealFeel
  )}°`;
}

function diplayCelsiusTemperature(event) {
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°`;
}
function displayCelsiusRealFeel(event) {
  let temperatureRealFeel = document.querySelector("#real-feel");
  temperatureRealFeel.innerHTML = `Real feel ${Math.round(celsiusRealFeel)}°`;
}

let celsiusTemperature = null;
let celsiusRealFeel = null;

let form = document.querySelector("#search");
form.addEventListener("submit", handleSubmit);

let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", () => {
  diplayFahrenheitTemperature();
  displayFahrenheitRealFeel();
});

let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", () => {
  diplayCelsiusTemperature();
  displayCelsiusRealFeel();
});

search("Lewisville");
