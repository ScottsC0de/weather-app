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
var fiveDayForecast = document.querySelectorAll('.future-forecast');

var searchHistory = []; // push user search value into array that will be put into LS

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
            var cityState = response.city.country; // change to state somehow
            currentCityName.textContent = cityName + ", " + cityState;

            // var currentDate = response.list[0].dt_txt;
            // convert to normal looking time
            var currentDate = moment().format('dddd MMM Do, YYYY');
            todaysDateDisplay.textContent = currentDate;

            var cityIcon = response.list[0].weather[0].icon;
            var cityIconConvert = document.createElement('img');
            cityIconConvert.src =
                "https://openweathermap.org/img/w/" + cityIcon + ".png"; // get icon to display
            currentCity.appendChild(cityIconConvert);
            clearOldIcon(cityIconConvert, cityIconConvert);

            var cityTemp = response.list[0].main.temp;
            cityTempConvert = Math.floor((cityTemp - 273.15) * 9 / 5 + 32)// (K − 273.15) × 9/5 + 32 = °F. Kelvins to Farenheit
            cityTempDisplay.textContent = "Temp: " + cityTempConvert + "°F"; // shift+option+8 for degree symbol (Mac)

            var windSpeed = response.list[0].wind.speed;
            windSpeedDisplay.textContent = "Wind Speed: " + windSpeed + "mph";

            var cityHumidity = response.list[0].main.humidity;
            currentHumidityDisplay.textContent = "Humidity: " + cityHumidity + "%";

            /* for (let i = 1; i < 6; i++) {
                 var fiveDayDisplay = {
                     // cityIcon: response.list[arrayIndex].weather[0].icon,
                     cityTemp: response.list[i].main.temp,
                     windSpeed: response.list[i].wind.speed,
                     cityHumidity: response.list[i].main.humidity
                 };
             } 
             console.log(fiveDayDisplay)
             */

            // for loop
            // stores variables for each data item
            // from its spot in the response array
            // take those variables
            // add them to text content ==


            fiveDayForecast.forEach((fiveDayBlock) => {
                for (i = 1; i < fiveDayForecast.length; i++) {
                    var fiveTemps = response.list[i].main.temp;
                    var fiveWinds = response.list[i].wind.speed;
                    var fiveHumids = response.list[i].main.humidity;
                }

                var fiveDayName = document.createElement('p');
                var fiveDayDate = document.createElement('p');
                var fiveDayIcon = document.createElement('img');
                var fiveDayTemp = document.createElement('p');
                var fiveDayWind = document.createElement('p');
                var fiveDayHumid = document.createElement('p');

                fiveDayName.textContent = cityName + ", " + cityState;
                fiveDayTemp.textContent = fiveTemps;
                fiveDayWind.textContent = fiveWinds;
                fiveDayHumid.textContent = fiveHumids;

                fiveDayBlock.appendChild(fiveDayName);
                fiveDayBlock.appendChild(fiveDayDate);
                fiveDayBlock.appendChild(fiveDayIcon);
                fiveDayBlock.appendChild(fiveDayTemp);
                fiveDayBlock.appendChild(fiveDayWind);
                fiveDayBlock.appendChild(fiveDayHumid);
                console.log(fiveDayBlock);
            })
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
    // clearRecents();
    // saves user recent searches to page
    // local storage
    // display on page and have it stay there   
}

function clearOldIcon(newIcon, oldIcon) {
    weatherIconDisplay.replaceChildren(newIcon, oldIcon);
};

// function clearOldData()

// need function when you click recent city, runs search button function