// Function to get the latitude and longitude from Geonames API
// URL: ''http://api.geonames.org/searchJSON?q=<City and Country>&maxRows=1&username=<username>'

const getLatLon = async (cityName, username) => {
    const baseUrl = 'https://api.geonames.org/searchJSON';
    const response = await fetch(baseUrl + '?q=' + cityName + '&username=' + username);
    try {
        const data = await response.json();
        //console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

// Function to get Hotels from Geonames API
// URL: ''http://www.geonames.org/findNearbyHotelsJSON?lat=<LAT>&lon=<LON>''

const getHotels = async (lat, lon) => {
    const baseUrl = 'https://www.geonames.org/findNearbyHotelsJSON';
    const response = await fetch(baseUrl + '?lat=' + lat + '&lon=' + lon);
    try {
        const data = await response.json();
        //console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

export { getLatLon, getHotels }