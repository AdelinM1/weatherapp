const APIkey = '1227eb2a2ec13a3d2e19e76ec8c3128c';
const cityForm = document.getElementById('cityForm');
const cityInput = document.getElementById('cityInput');
const currentWeather = document.getElementById('currentWeather');
const forecast = document.getElementById('forecast');

cityForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const city = cityInput.value.trim();

    // Call function to fetch weather data
    getWeatherData(city);
});

function getWeatherData(city) {
    // Use the OpenWeatherMap API to fetch weather data
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}`)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            displayForecast(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayCurrentWeather(data) {
    const currentWeatherData = data.list[0];
    const cityName = data.city.name;
    const date = new Date(currentWeatherData.dt * 1000).toLocaleDateString();
    const icon = currentWeatherData.weather[0].icon;
    const temperatureCelsius = (currentWeatherData.main.temp - 273.15).toFixed(2);;
    const humidity = currentWeatherData.main.humidity;
    const windSpeed = currentWeatherData.wind.speed;

    // Update the DOM with current weather information
    currentWeather.innerHTML = `
        <h2>${cityName} - ${date}</h2>
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
        <p>Temperature: ${temperatureCelsius} °C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
}

function displayForecast(data) {
    const forecastData = data.list.slice(0, 40);
    let forecastHTML = '<h2>5-Day Forecast</h2>';

    for (let i = 0; i < forecastData.length; i += 8) {
        const dayData = forecastData[i];
        const date = new Date(dayData.dt * 1000).toLocaleDateString();
        const icon = dayData.weather[0].icon;
        const temperatureCelsius = (dayData.main.temp - 273.15).toFixed(2);
        const humidity = dayData.main.humidity;
        const windSpeed = dayData.wind.speed;

        
        forecastHTML += `
            <div class="forecast-item">
                <p>Date: ${date}</p>
                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">
                <p>Temperature: ${temperatureCelsius} °C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
            </div>
        `;
    }

    // Update the DOM with forecast information
    forecast.innerHTML = forecastHTML;
}

