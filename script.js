document.addEventListener('DOMContentLoaded', function() {
    const getWeather = async (city) => {
        const cityName = document.getElementById('cityName'); 
        cityName.innerHTML = city;

        const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '70cf32b606msh451645bef78a648p1f9e29jsn6bf0a76c37b0',
                'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            
            document.getElementById('temp').textContent = data.temp;
            document.getElementById('min_temp').textContent = data.min_temp;
            document.getElementById('max_temp').textContent = data.max_temp;
            document.getElementById('cloud_pct').textContent = data.cloud_pct;
            document.getElementById('feels_like').textContent = data.feels_like;
            document.getElementById('humidity').textContent = data.humidity;
            document.getElementById('wind_speed').textContent = data.wind_speed;

            
            document.getElementById('sunrise').textContent = unixTimestampToTime(data.sunrise);
            document.getElementById('sunset').textContent = unixTimestampToTime(data.sunset);
        } catch (error) {
            console.error(error);
        }
    }

    function unixTimestampToTime(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000); 
        const hours = date.getHours().toString().padStart(2, '0'); 
        const minutes = date.getMinutes().toString().padStart(2, '0'); 
        const seconds = date.getSeconds().toString().padStart(2, '0'); 
        return `${hours}:${minutes}:${seconds}`; 
    }

    document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();
        const cityInput = document.getElementById("city");
        if (cityInput) {
            const cityValue = cityInput.value;
            getWeather(cityValue);
        } else {
            console.error("City input element not found.");
        }
    });
    
    // Initial call to get weather for Delhi
    getWeather("Delhi");
});