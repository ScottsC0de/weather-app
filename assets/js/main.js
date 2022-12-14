// Module API link
// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// Geocoding API
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

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
var clearBtn = document.getElementById('clear-button');

// 2 api calls to grab data
function getLatLon(city) {
    var queryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + ", us&appid=43eade946f6708f970e3b3d38a9999a2"
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })

        .then(function (response) {
            console.log(response);
            var cityLat = response[0].lat;
            var cityLon = response[0].lon;
            getForecast(cityLat, cityLon);
        })
};

function getForecast(lat, lon) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=43eade946f6708f970e3b3d38a9999a2"
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        // displaying data for city, date, icon, temp in F, wind speed, humidity
        .then(function (response) {
            console.log(response);

            var cityName = response.city.name;
            currentCityName.textContent = cityName;

            var currentDate = moment().format('dddd MMM Do, YYYY');
            todaysDateDisplay.textContent = currentDate;

            var cityIcon = response.list[0].weather[0].icon;
            var cityIconConvert = document.createElement('img');
            cityIconConvert.src =
                "https://openweathermap.org/img/w/" + cityIcon + ".png";
            currentCity.appendChild(cityIconConvert);
            clearOldIcon(cityIconConvert, cityIconConvert);

            var cityTemp = response.list[0].main.temp;
            cityTempConvert = Math.floor((cityTemp - 273.15) * 9 / 5 + 32) // (K ??? 273.15) ?? 9/5 + 32 = ??F. Kelvins to Farenheit
            cityTempDisplay.textContent = "Temp: " + cityTempConvert + "??F"; // shift+option+8 for degree symbol (Mac)

            var windSpeed = response.list[0].wind.speed;
            windSpeedDisplay.textContent = "Wind Speed: " + windSpeed + "mph";

            var cityHumidity = response.list[0].main.humidity;
            currentHumidityDisplay.textContent = "Humidity: " + cityHumidity + "%";

            fiveDay.textContent = ""; // so old data gets replaced with new data every search

            // for loop to get 5 day
            for (i = 0; i < 6; i++) {

                var dayContainers = document.createElement('div');
                dayContainers.classList.add("col", "bg-light", "mr-4", "text-center");

                // weather data was every 3 hours, needed to convert to 5 day
                indexConvert = i * 8 + 6; // mid-day (12 o'clock) weather conditions

                if (indexConvert > response.list.length) {

                }

                var fiveDayDate = document.createElement("p")
                fiveDayDate.textContent = moment(response.list[indexConvert].dt_txt).format('dddd MMM Do, YYYY');
                dayContainers.appendChild(fiveDayDate);

                var fiveDayIcon = document.createElement("img");
                fiveDayIcon.setAttribute("src", "https://openweathermap.org/img/w/" + response.list[indexConvert].weather[0].icon + ".png");
                dayContainers.appendChild(fiveDayIcon);

                var fiveDayTemp = document.createElement('p');
                fiveDayTempConvert = Math.floor((response.list[indexConvert].main.temp - 273.15) * 9 / 5 + 32)
                fiveDayTemp.textContent = "Temp: " + fiveDayTempConvert + " ??F";
                dayContainers.appendChild(fiveDayTemp);

                var fiveDayHumid = document.createElement('p');
                fiveDayHumid.textContent = "Humidity: " + response.list[indexConvert].main.humidity + "%";
                dayContainers.appendChild(fiveDayHumid);

                var fiveDayWind = document.createElement('p');
                fiveDayWind.textContent = "Wind Speed: " + response.list[indexConvert].wind.speed + "mph";
                dayContainers.appendChild(fiveDayWind);

                fiveDay.appendChild(dayContainers);

            }
        })
};

// main weather search function
searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var userCity = userInput.value;
    getLatLon(userCity);
    var searchHistory = [];
    searchHistory.push(userCity);
    localStorage.setItem(searchHistory, JSON.stringify(searchHistory));
    for (var i = 0; i < searchHistory.length; i++) {
        var recentCity = document.createElement('button');
        var spaceBetween = document.createElement('br');
        recentCity.textContent = searchHistory[i];
        recentSearches.appendChild(recentCity);
        recentSearches.appendChild(spaceBetween);
        recentCity.addEventListener("click", function (e) {
            e.preventDefault();
            getLatLon(userCity);
        })
    }
});

window.addEventListener("load", function () {
    for (var i = 0; i < localStorage.length; i++) {
        var recentCity = document.createElement('button');
        var spaceBetween = document.createElement('br');
        recentCity.textContent = JSON.parse(localStorage.getItem(localStorage.key(i)));
        var searchRecent = JSON.parse(localStorage.getItem(localStorage.key(i)));
        recentCity.setAttribute("data-city", searchRecent[0]);
        recentSearches.appendChild(recentCity);
        recentSearches.appendChild(spaceBetween);
        recentCity.addEventListener("click", function (e) {
            e.preventDefault();
            var newCity = e.target.dataset.city
            getLatLon(newCity);
        })
    }
});

// replaces each weather icon for current day
function clearOldIcon(newIcon, oldIcon) {
    weatherIconDisplay.replaceChildren(newIcon, oldIcon);
};

// clears local storage/recent searches
clearBtn.addEventListener("click", function (e) {
    localStorage.clear();
});



