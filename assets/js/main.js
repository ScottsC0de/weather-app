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

// targetting html elements
var currentCity = document.getElementById('current-city');
var fiveDay = document.getElementById('five-day');
var searchBtn = document.getElementById('search-button');
var userInput = document.getElementById('user-input');

weatherApiKey = "api.openweathermap.org/data/2.5/forecast?q=hartford&appid=43eade946f6708f970e3b3d38a9999a2";
console.log(fetch(weatherApiKey));

var userCity = userInput.value;
// button function, onclick, api is called for current city and 5 day weather
searchBtn.addEventListener('click', function () {
    // user input value
    // var myOldAPIKey = "7ca750f76d7298a802e4a755c967f18d";
    var myAPIKey = "43eade946f6708f970e3b3d38a9999a2";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&appid=" + myAPIKey;
    fetch(queryURL);
    currentCity.innerHTML;
    fiveDay.innerHTML;
    saveSearch();
});

function saveSearch() {
    // saves user recent searches to page
    // local storage
    // display on page and have it stay there   
}

// need function when you click recent city, runs search button function