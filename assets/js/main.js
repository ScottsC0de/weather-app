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
var recentSearches = document.getElementById('recent-searches');

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
            // convert to normal looking time
            var currentDate = moment().format('dddd MMM Do, YYYY');
            todaysDateDisplay.textContent = currentDate;

            var cityIcon = response.list[0].weather[0].icon;
            var cityIconConvert = document.createElement('img');
            cityIconConvert.src =
                "https://openweathermap.org/img/w/" + cityIcon + ".png"; // get icon to display
            currentCity.appendChild(cityIconConvert);

            var cityTemp = response.list[0].main.temp;
            cityTempConvert = Math.floor((cityTemp - 273.15) * 9 / 5 + 32)// (K − 273.15) × 9/5 + 32 = °F. Kelvins to Farenheit
            cityTempDisplay.textContent = "Temp: " + cityTempConvert + "°F"; // shift+option+8 for degree symbol (Mac)

            var windSpeed = response.list[0].wind.speed;
            windSpeedDisplay.textContent = "Wind Speed: " + windSpeed + "mph";

            var cityHumidity = response.list[0].main.humidity;
            currentHumidityDisplay.textContent = "Humidity: " + cityHumidity + "%";

            for (var i = 0; i < response.list.length; i++) {

            }
        });
}

// button function, onclick, api is called for current city and 5 day weather
searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var userCity = userInput.value;
    getLatLon(userCity);
    saveSearch(userCity);
});

function saveSearch(city) {
    var recentCity = document.createElement('button');
    recentCity.textContent = city;
    recentSearches.appendChild(recentCity);
    // saves user recent searches to page
    // local storage
    // display on page and have it stay there   
}

// need function when you click recent city, runs search button function