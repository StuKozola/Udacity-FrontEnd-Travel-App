// Function to get the weather from pixabay API
// URL: ''https://pixabay.com/api/?category=travel&q=<city>&key=API_KEY'
const getLocalImage = async (cityName, apiKey) => {
    const baseUrl = 'https://pixabay.com/api/';
    const response = await fetch(baseUrl + '?category=travel&q='+ cityName +'&key=' + apiKey);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

export { getLocalImage }