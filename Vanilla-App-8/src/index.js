function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `${hours}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "dbdeefe04c94b8d2607c00ef173913af";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  console.log(response.data.main);
  let cityElement = document.querySelector("#city");
  let temperature = Math.round(celsiusTemperature);
  let temperatureElement = document.querySelector("#temperature");
  let description = document.querySelector("#temperature-description");
  let feelslikeElement = document.querySelector("#feelslike");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windSpeed");
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#date");
  feelslikeElement.innerHTML = response.data.main.feels_like;
  cityElement.innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  description.innerHTML = response.data.weather[0].description;
  temperatureElement.innerHTML = `${temperature}`;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "dbdeefe04c94b8d2607c00ef173913af";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class ="row">`;
  let days = ["tue", "wed", "thr", "fri", "sat", "sun"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
    <div class="weather-date">
     ${formatDay(forecastDay.dt)}
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" width="35"
          alt="cloudy"
          id="icon2"
          class="icon2"
        />
        <div class="weather-forecast-temperature-date"></div>
        <span  class="weather-forecast-temperature-max"> ${Math.round(
          forecastDay.temp.max
        )}° | </span>
        <span class="weather-forecast-temperature-min "> ${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div> `;
  forecastElement.innerHTML = forecastHTML;
}
function displaycelsiusTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displaycelsiusTemperature);

search("Addis Ababa");
