/*
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
*/

// API request by city name
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

// module api link
// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// NEEDS https://
// weatherApiKey = "https://api.openweathermap.org/data/2.5/forecast?q=hartford&appid=43eade946f6708f970e3b3d38a9999a2";
// console.log(fetch(weatherApiKey));

// targetting html elements
var currentCity = document.getElementById('current-city');
var fiveDay = document.getElementById('five-day');
var searchBtn = document.getElementById('search-button');
var userInput = document.getElementById('user-input');
var currentCityName = document.getElementById('current-city-name');
var todaysDateDisplay = document.getElementById('todays-date');
var weatherIconDisplay = document.getElementById('weather-icon');
var cityTempDisplay = document.getElementById('temp');
var windSpeedDisplay = document.getElementById('wind-speed');
var currentHumidityDisplay = document.getElementById('humidity');

// geocoding API
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// 2 api calls to grab data
function getLatLon(city) {
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + ", us&appid=43eade946f6708f970e3b3d38a9999a2"
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        // response = array of object sent
        .then(function (response) {
            console.log(response);
            var cityLat = response[0].lat;
            var cityLon = response[0].lon;
            getForecast(cityLat, cityLon);
        })
}

function getForecast(lat, lon) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=43eade946f6708f970e3b3d38a9999a2"
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        // displaying data for city, date, icon, temp in F, wind speed, humidity
        .then(function (response) {
            console.log(response);
            // grabbing all necessary data

            var cityName = response.city.name; // and state?
            currentCityName.textContent = cityName;

            // var currentDate = response.list[0].dt_txt;
            var currentDate = moment().format('dddd MMM Do, YYYY');
            todaysDateDisplay.textContent = currentDate;
            // convert to normal looking time

            var cityIcon = response.list[0].weather[0].icon;
            var cityIconConvert = document.createElement('img');
            cityIconConvert.src =
                "https://openweathermap.org/img/w/" + cityIcon + ".png";
            currentCity.appendChild(cityIconConvert);
            // get icon to display

            var cityTemp = response.list[0].main.temp;
            cityTempConvert = Math.floor((cityTemp - 273.15) * 9 / 5 + 32)// (K − 273.15) × 9/5 + 32 = °F. Kelvins to Farenheit
            cityTempDisplay.textContent = "Temp: " + cityTempConvert + "°F"; // shift+option+8 for degree symbol (Mac)

            var windSpeed = response.list[0].wind.speed;
            windSpeedDisplay.textContent = "Wind Speed: " + windSpeed + "mph";

            var cityHumidity = response.list[0].main.humidity;
            currentHumidityDisplay.textContent = "Humidity: " + cityHumidity + "%";
        });
}

// button function, onclick, api is called for current city and 5 day weather
searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var userCity = userInput.value;
    getLatLon(userCity);
    // currentCity.innerHTML;
    // fiveDay.innerHTML;
    // function, loop through 5 days, display weather for each day
    // createElement();
    // saveSearch();
});

function saveSearch() {
    // saves user recent searches to page
    // local storage
    // display on page and have it stay there   
}

// need function when you click recent city, runs search button function