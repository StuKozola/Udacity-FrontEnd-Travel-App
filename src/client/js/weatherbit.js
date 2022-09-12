// Function to get the weather form Weatherbit API
// URL: 'https://api.weatherbit.io/v2.0/current?lat=<LAT>&lon=<LON>&key=API_KEY'
const getWeather = async (lat, lon, apiKey) => {
    const baseUrl = 'https://api.weatherbit.io/v2.0/current';
    console.log(baseUrl + '?lat=' + lat + '&lon=' + lon + '&key=' + apiKey)
    const response = await fetch(baseUrl + '?lat=' + lat + '&lon=' + lon + '&key=' + apiKey);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

// Function to get the forecast weather form Weatherbit API
// URL: 'https://api.weatherbit.io/v2.0/daily?lat=<LAT>&lon=<LON>&key=API_KEY'
const getWeatherForecast = async (lat, lon, apiKey) => {
    const baseUrl = 'https://api.weatherbit.io/v2.0/daily';
    console.log(baseUrl + '?lat=' + lat + '&lon=' + lon + '&key=' + apiKey);
    const response = await fetch(baseUrl + '?lat=' + lat + '&lon=' + lon + '&key=' + apiKey);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

export { getWeather, getWeatherForecast }