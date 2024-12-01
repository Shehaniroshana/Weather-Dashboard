        const apiKey = '39c21c8c2cc6205709e7d5f8611ff421';
        const weatherIconBaseUrl = "http://openweathermap.org/img/wn/";

        
        
        async function fetchWeather() {
            let city=document.getElementById("city-search").value;
            console.log(city);
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            
            return data;
            
        }
        

        async function fetchForecast(city) {
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            return data;
        }

        function displayWeather(data) {
            const temperature = data.main.temp;
            const feelsLike = data.main.feels_like;
            const weatherCondition = data.weather[0].description;
            const iconCode = data.weather[0].icon;
            const city = data.name;
            const country = data.sys.country;
            const highTemp = data.main.temp_max;
            const lowTemp = data.main.temp_min;
            const humidity = data.main.humidity;

            document.getElementById('current-temp').textContent = `${temperature.toFixed(1)}°C`;
            document.getElementById('location').textContent = `${city}, ${country}`;
            document.getElementById('weather-condition').textContent = weatherCondition;
            document.getElementById('feels-like').textContent = `Feels like: ${feelsLike.toFixed(1)}°C`;
            document.getElementById('high-temp').textContent = `${highTemp.toFixed(1)}°C`;
            document.getElementById('low-temp').textContent = `${lowTemp.toFixed(1)}°C`;
            document.getElementById('humidity').textContent = `${humidity}%`;

            document.getElementById('weather-icon').src = `${weatherIconBaseUrl}${iconCode}@2x.png`;
        }

        function displayForecast(data) {
            const forecastContainer = document.getElementById('hourly-forecast');
            forecastContainer.innerHTML = '';

            data.list.slice(0, 8).forEach(hour => {
                const hourCard = document.createElement('div');
                hourCard.classList.add('hour-card');
                hourCard.innerHTML = `
                    <p>${new Date(hour.dt * 1000).getHours()}:00</p>
                    <img src="${weatherIconBaseUrl}${hour.weather[0].icon}@2x.png" alt="${hour.weather[0].description}" />
                    <p class="temp">${hour.main.temp.toFixed(1)}°C</p>
                `;
                forecastContainer.appendChild(hourCard);
            });
        }

        function initCharts(data) {
            const labels = data.list.map(hour => new Date(hour.dt * 1000).getHours() + ':00');
            const temperatureData = data.list.map(hour => hour.main.temp);
            const humidityData = data.list.map(hour => hour.main.humidity);
            const windSpeedData = data.list.map(hour => hour.wind.speed);
        
            new Chart(document.getElementById('weatherChart'), {
                type: 'line',
                data: {
                    labels: labels,  
                    datasets: [
                        {
                            label: 'Temperature (°C)',
                            data: temperatureData,
                            borderColor: '#4CAF50', 
                            fill: false
                        },
                        {
                            label: 'Humidity (%)',
                            data: humidityData,
                            borderColor: '#2196F3', 
                            fill: false
                        },
                        {
                            label: 'Wind Speed (m/s)',
                            data: windSpeedData,
                            borderColor: '#FF5722',
                            fill: false
                        }
                    ]
                }
            });
        }
        
        document.getElementById('city-search').addEventListener('input', async (e) => {
            const city = e.target.value;
            if (city) {
                const weatherData = await fetchWeather(city);
                const forecastData = await fetchForecast(city);

                displayWeather(weatherData);
                displayForecast(forecastData);
                initCharts(forecastData);
            }
        });
