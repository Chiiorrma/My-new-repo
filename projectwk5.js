function todaysDate() {
  let now = new Date();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let mydate = document.querySelector("#date");
  mydate.innerHTML = `${day} ${hour}:${minutes}`;
}

function weatherDisplay(response) {
  todaysDate();

  let h1 = document.querySelector("h1");
  let weatherdes = document.querySelector("#weather-description");
  let temperatureElement = document.querySelector("#temperature");
  let iconElement = document.querySelector("#icon")
  let humidity = document.querySelector("#humidity-probality");
  let windSpeed = document.querySelector("#wind-speed");

  celsuisTemperature = response.data.main.temp;

  h1.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsuisTemperature);
  weatherdes.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `${response.data.main.humidity} %`;
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(weatherDisplay);
}

function getCityTemperature(event) {
  event.preventDefault();
  let search = document.querySelector("#weather-form-text");
  let city = search.value;
  searchCity(city);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureType = document.querySelector("#temperature");

  celsuisLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsuisTemperature * (9 / 5)) + 32;
  temperatureType.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsuisTemperature(event) {
  event.preventDefault();
  let temperatureType = document.querySelector("#temperature");
  temperatureType.innerHTML = Math.round(celsuisTemperature);
}

let celsuisTemperature = null;

let citySearch = document.querySelector("#weather-form");
citySearch.addEventListener("submit", getCityTemperature);

let celsuisLink = document.querySelector("#celsius-link");
celsuisLink.addEventListener("click", displayCelsuisTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link")
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

searchCity("Lagos");