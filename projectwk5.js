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
  let mydate = document.querySelector("#weather-date");
  mydate.innerHTML = `${day} ${hour}:${minutes}`;
}

function weatherDisplay(response) {
  todaysDate();

  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;

  let weatherdes = document.querySelector("#weather-description");
  weatherdes.innerHTML = response.data.weather[0].description;

  let temp = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#temp-val");
  displayTemp.innerHTML = temp;

  let humidity = document.querySelector("#humidity-probality");
  humidity.innerHTML = `${response.data.main.humidity} %`

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${response.data.wind.speed} km/h`;
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(weatherDisplay);
}

function getCityTemp(event) {
  event.preventDefault();
  let search = document.querySelector("#weather-form-text");
  let city = search.value;
  console.log(city);
  searchCity(city);
}

function getPosition(position) {
  todaysDate();
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(weatherDisplay);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}
let citySearch = document.querySelector("#weather-form");
citySearch.addEventListener("submit", getCityTemp);

let button = document.querySelector("button");
button.addEventListener("click", getLocation);


