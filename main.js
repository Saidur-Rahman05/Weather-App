const apiKey = "8952766e3d4233635e5d50729e1dc367";
const apiUrlByCity = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiUrlByLocation = "https://api.openweathermap.org/data/2.5/weather?units=metric&lat=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const locationBtn = document.getElementById("location-btn"); // Get the "Current Location" button
const weatherIcon = document.querySelector(".weather-icon");

// Function to update the background class based on weather
function updateBackground(weatherCondition) {
    document.body.className = ""; // Clear any existing class
    if (weatherCondition === "Clouds") {
        document.body.classList.add("clouds");
    } else if (weatherCondition === "Clear") {
        document.body.classList.add("clear");
    } else if (weatherCondition === "Rain") {
        document.body.classList.add("rain");
    } else if (weatherCondition === "Drizzle") {
        document.body.classList.add("drizzle");
    } else if (weatherCondition === "Snow") {
        document.body.classList.add("snow");
    } else if (weatherCondition === "Thunderstorm") {
        document.body.classList.add("thunderstorm");
    } else if (weatherCondition === "Smoke") {
        document.body.classList.add("smoke");
    } else if (weatherCondition === "Haze") {
        document.body.classList.add("haze");
    } else {
        document.body.classList.add("default"); // Optional: add a default background
    }
}

async function checkWeather(city) {
    const response = await fetch(apiUrlByCity + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.getElementById("city").innerText = data.name;
        document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerText = data.main.humidity + "%";
        document.querySelector(".wind").innerText = data.wind.speed + "km/h";

        const weatherCondition = data.weather[0].main;
        updateBackground(weatherCondition); // Update background based on weather
        setWeatherIcon(weatherCondition);   // Update the weather icon

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

function setWeatherIcon(weatherCondition) {
    if (weatherCondition === "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (weatherCondition === "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (weatherCondition === "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (weatherCondition === "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (weatherCondition === "Mist") {
        weatherIcon.src = "images/mist.png";
    } else if (weatherCondition === "Smoke") {
        weatherIcon.src = "images/smoke.jpeg";
    } else if (weatherCondition === "Haze") {
        weatherIcon.src = "images/haze.jpeg";
    }
}

// Function to get current location and fetch weather
function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const locationUrl = `${apiUrlByLocation}${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetch(locationUrl)
                .then((response) => response.json())
                .then((data) => {
                    if (Math.abs(lat - 23.8103) < 0.1 && Math.abs(lon - 90.4125) < 0.1) {
                        document.getElementById("city").innerText = "Dhaka";
                    } else {
                        document.getElementById("city").innerText = data.name;
                    }

                    document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
                    document.querySelector(".humidity").innerText = data.main.humidity + "%";
                    document.querySelector(".wind").innerText = data.wind.speed + "km/h";

                    const weatherCondition = data.weather[0].main;
                    updateBackground(weatherCondition); // Update background based on weather
                    setWeatherIcon(weatherCondition);   // Update the weather icon

                    document.querySelector(".weather").style.display = "block";
                    document.querySelector(".error").style.display = "none";
                })
                .catch((error) => {
                    console.error("Error fetching location weather: ", error);
                    document.querySelector(".error").style.display = "block";
                    document.querySelector(".weather").style.display = "none";
                });
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Search button event
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Current Location button event
locationBtn.addEventListener("click", () => {
    getCurrentLocationWeather();
});
