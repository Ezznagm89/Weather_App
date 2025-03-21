document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "25789802b56b46f185f00534250603";
    let defaultCity = "Cairo";

    const searchInput = document.querySelector(".footer-input");
    const searchButton = document.querySelector(".footer-btn");

    const todayName = document.getElementById("today_date_day_name");
    const todayLocation = document.getElementById("today_location");
    const todayTemp = document.getElementById("today_temp");
    const todayCondition = document.getElementById("today_condition");
    const todayWind = document.getElementById("today_wind");
    const todayWeatherIcon = document.getElementById("today_weather_icon");

    const nextDayName = document.getElementById("next_day_name");
    const nextDayTemp = document.getElementById("next_day_temp");
    const nextDayCondition = document.getElementById("next_day_condition");
    const nextDayWind = document.getElementById("next_day_wind");
    const nextDayWeatherIcon = document.getElementById("next_day_weather_icon");

    const dayAfterName = document.getElementById("day_after_name");
    const dayAfterTemp = document.getElementById("day_after_temp");
    const dayAfterCondition = document.getElementById("day_after_condition");
    const dayAfterWind = document.getElementById("day_after_wind");
    const dayAfterWeatherIcon = document.getElementById("day_after_weather_icon");

    async function fetchWeather(city) {
        try {
            const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`;
            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                updateWeatherUI(data);
            } else {
                alert("Error: " + data.error.message);
            }
        } catch (error) {}
    }

    function updateWeatherUI(data) {
        const forecast = data.forecast.forecastday;

        todayName.textContent = new Date(forecast[0].date).toLocaleDateString("en-US", { weekday: "long" });
        todayLocation.textContent = data.location.name + ", " + data.location.country;
        todayTemp.textContent = Math.round(forecast[0].day.avgtemp_c);
        todayCondition.textContent = forecast[0].day.condition.text;
        todayWind.textContent = forecast[0].day.maxwind_kph + " km/h";
        todayWeatherIcon.src = "https:" + forecast[0].day.condition.icon;

        nextDayName.textContent = new Date(forecast[1].date).toLocaleDateString("en-US", { weekday: "long" });
        nextDayTemp.textContent = Math.round(forecast[1].day.avgtemp_c);
        nextDayCondition.textContent = forecast[1].day.condition.text;
        nextDayWind.textContent = forecast[1].day.maxwind_kph + " km/h";
        nextDayWeatherIcon.src = "https:" + forecast[1].day.condition.icon;

        dayAfterName.textContent = new Date(forecast[2].date).toLocaleDateString("en-US", { weekday: "long" });
        dayAfterTemp.textContent = Math.round(forecast[2].day.avgtemp_c);
        dayAfterCondition.textContent = forecast[2].day.condition.text;
        dayAfterWind.textContent = forecast[2].day.maxwind_kph + " km/h";
        dayAfterWeatherIcon.src = "https:" + forecast[2].day.condition.icon;
    }

    function searchCity() {
        const cityInput = searchInput.value.trim();
        if (cityInput) {
            fetchWeather(cityInput);
        } else {
            alert("Please enter a valid city name.");
        }
    }

    searchButton.addEventListener("click", searchCity);

    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            searchCity();
        }
    });

    fetchWeather(defaultCity);
});