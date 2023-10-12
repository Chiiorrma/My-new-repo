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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function forecastWeather(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");

  let htmlOfForecast = `<div class ="row">`;
  forecast.forEach(function (dayForecast, index) {
    if (index < 6) {
      htmlOfForecast =
        htmlOfForecast +
        `
       <div class="col-2"> 
                <div class="forecast-date">
                  ${formatDay(dayForecast.dt)}
                </div>
                <img src="http://openweathermap.org/img/wn/${dayForecast.weather[0].icon}@2x.png" alt="weather-image" srcset="" width ="42" /> 
                <div class="forecast-temperature">
                  <span class="forecast-max">
                    ${Math.round(dayForecast.temp.max)}° /
                  </span>
                  <span class="forecast-min">
                     ${Math.round(dayForecast.temp.min)}°
                  </span>
                </div>
                </div>
                `;
    }
  })

  htmlOfForecast = htmlOfForecast + `</div>`
  forecastElement.innerHTML = htmlOfForecast;
}

function showForecast(coordinates) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(forecastWeather);
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
  showForecast(response.data.coord);
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

let citySearch = document.querySelector("#weather-form");
citySearch.addEventListener("submit", getCityTemperature);

searchCity("Lagos");