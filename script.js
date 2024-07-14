const apiKey = "1069dd6a282e752d58d1f1177e4c645d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    const responce = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (responce.status == 404) {
        document.getElementById("error").innerHTML = "invalid city name";
        document.querySelector(".city").innerHTML = "---";
        document.querySelector(".temp").innerHTML = "0" + "°C";
        document.querySelector(".humidity").innerHTML = "0" + "%";
        document.querySelector(".wind").innerHTML = "0" + "km/h";
        weatherIcon.src = "img/logo1.png";
    } else {
        let data = await responce.json();

        document.getElementById("error").innerHTML = "";
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "img/clouds.png";
        }

        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "img/clear.png";
        }

        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "img/rain.png";
        }

        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "img/drizzle.png";
        }

        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "img/mist.png";
        }
    }

}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
