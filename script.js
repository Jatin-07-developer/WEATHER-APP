const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const Weather_image = document.querySelector('.Weather-image');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city){
    const api_key = "52ddeeab52c7f35c38e8581ffddbe3b4";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod == '404'){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        return;
    }

    weather_body.style.display = "flex";

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    switch(weather_data.weather[0].main){
        case 'Clouds':
            Weather_image.src = "/assets/cloud.png";
            break;
        case 'Clear':
            Weather_image.src = "/assets/clear.png";
            break;
        case 'Rain':
            Weather_image.src = "/assets/rain.png";
            break;
        case 'Mist':
            Weather_image.src = "/assets/mist.png";
            break;
        case 'Snow':
            Weather_image.src = "/assets/snow.png";
            break;
    }        
}

searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value)
})