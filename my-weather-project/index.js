function displayTemperature(response) {
  console.log(response.data); // Add this line

  let cityElement = document.querySelector("#current-city");
  let temperatureElement = document.querySelector(".current-temperature-value");

  if (cityElement === null || temperatureElement === null) {
    console.error("City or temperature element not found");
    return;
  }

  let temperatureValue = response.data.temperature.current;
  if (isNaN(temperatureValue)) {
    console.error("Invalid temperature: ", temperatureValue);
    return;
  }

  let temperature = Math.round(temperatureValue);
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
}

function search(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#search-input");

  let city = searchInputElement.value;

  let apikey = "o162eeb39ca2c0c4ffeabtf4a361bc7f";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}
function handleError(error) {
  console.error("Error fetching weather data: ", error);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
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

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
