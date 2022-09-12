import { getLatLon, getHotels } from "./geonames";
import { getWeather, getWeatherForecast } from "./weatherbit";
import { getLocalImage } from "./pixabay";

const handleTripEntry = event => {
    event.preventDefault();
    // check dates are valid
    if (!validateForm()) {
        return;
    }
    resetModal();

    // set button spinner
    document.getElementById("addBtn").innerHTML = 'Loading...<i class="fa fa-spinner fa-spin"></i>';

    // ***** Create the Modal to select Hotel ***** //
    const modal = document.getElementById("save-modal");
    const cancelbtn = document.getElementById("cancelBtn");
    const savebtn = document.getElementById("saveBtn");
    const closebtn = document.getElementsByClassName("close")[0];

    // When the user clicks on the close span element or cancel button, close the modal
    closebtn.onclick = function () {
        resetForm();
    }
    cancelbtn.onclick = function () {
        resetForm();
    }

    // When user clicks outside of modal, close the modal
    window.onclick = function (event) {
        if (event.target == modal) {
            resetForm();
        }
    }

    // When user clicks on the save button, save the trip data
    savebtn.onclick = function () {
        // get the selected hotel
        const hotelSelect = document.getElementById("hotel");
        const selectedHotel = hotelSelect.options[hotelSelect.selectedIndex].value;
        tripData.selectedHotel = selectedHotel;
        // save the trip data to local storage
        saveTrip(tripData);
        // post the trip data to the server
        postData('/trip', tripData);
        // close the modal
        resetForm();
    }

    // ***** Retrieve the Data for selected city ***** //
    // api keys from .env file
    const geonamesUserName = process.env.GEONAMES_USERNAME;
    const weatherbitKey = process.env.WEATHERBIT_KEY;
    const pixabayKey = process.env.PIXABAY_KEY;

    // array to store data for trip
    let tripData = {
        city: [],
        weather: [],
        forecast: [],
        image: [],
        hotels: [],
        selectedHotel: []
    };

    // from the city, get the latitude and longitude
    const location = document.getElementById("location").value;
    getLatLon(location, geonamesUserName)
    .then(data => {
        const lat = data.geonames[0].lat;
        const lon = data.geonames[0].lng;
        const country = data.geonames[0].countryName;
        const city = data.geonames[0].name;
        tripData.city = data.geonames[0];
        console.log(data);       
        
        // from the city lat and lon, get nearby hotels
        getHotels(lat, lon)
        .then(data => {
            const hotels = data.hotels;
            const hotelSelect = document.getElementById("hotel");
            tripData.hotels = hotels;
            // add hotels to the select list
            for( const hotel of hotels) {
                const option = document.createElement("option");
                option.value = hotel.hotelName;
                option.innerHTML = hotel.hotelName;
                hotelSelect.appendChild(option);
            };

            // get the current weather for the city
            getWeather(lat, lon, weatherbitKey)
            .then(data => {
                tripData.weather = data.data;
            });

            // get forecast weather for the city
            getWeatherForecast(lat, lon, weatherbitKey)
            .then(data => {
                tripData.forecast = data.data;
            });

            // get the image for the city
            getLocalImage(city, pixabayKey)
            .then(data => {
                tripData.image = data.hits;
                // add image to the modal
                const image = document.getElementById("city-img");
                image.src = data.hits[0].webformatURL;
            });

            // Fill in the modal with the trip data and display the modal
            document.getElementById("modal-city").innerHTML = tripData.city.name + ", " + tripData.city.countryName;
            document.getElementById("departure").innerHTML = document.getElementById("start_date").value;
            document.getElementById("return").innerHTML = document.getElementById("return_date").value;
            modal.style.display = "block";
        });
    });
}

// function to validate the form data
function validateForm() {
    const location = document.getElementById("location").value;
    const startDate = document.getElementById("start_date").value;
    const endDate = document.getElementById("return_date").value;
    console.log('validating form');

    if (location == "") {
        alert("Please enter a location");
        return false;
    }
    if (startDate == "") {
        alert("Please enter a start date");
        return false;
    }
    if (endDate == "") {
        alert("Please enter an return date");
        return false;
    }

    // check that start date < return date
    const days = getDays(startDate, endDate);
    if (days < 0) {
        alert("Start date must be before return date");
        return false;
    }

    return true;
}

// function to get number of days from two dates
function getDays(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(startDate);
    const secondDate = new Date(endDate);
    const diffDays = Math.round((secondDate - firstDate) / oneDay);
    console.log('Date difference: ' + diffDays);
    return diffDays;
}

// function to reset the form data
function resetForm() {
    document.getElementById("addBtn").innerHTML = 'Add Trip';
    document.getElementById("save-modal").style.display = "none";
    resetModal();
}

// function to reset modal data
function resetModal() {
    document.getElementById("modal-city").innerHTML = "";
    document.getElementById("departure").innerHTML = "";
    document.getElementById("return").innerHTML = "";
    document.getElementById("hotel").innerHTML = '<option value="none">None</option>';
}

// function to save trip data to local storage
function saveTrip(tripData) {
    // get the trip data from local storage
    let trips = JSON.parse(localStorage.getItem('trips'));
    // if there is no trip data, create an empty array
    if (trips == null) {
        trips = [];
    }
    // add the new trip data to the array
    trips.push(tripData);
    // save the trip data to local storage
    localStorage.setItem('trips', JSON.stringify(trips));
}

// function to get the trip data from local storage
function getTrips() {
    // get the trip data from local storage
    let trips = JSON.parse(localStorage.getItem('trips'));
    // if there is no trip data, create an empty array
    if (trips == null) {
        trips = [];
    }
    return trips;
}

// function to get the trip data from the server
async function getTripData() {
    const response = await fetch('/all');
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
}

// function to post the trip data to the server
async function postData(url = '/trip', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    console.log('Posting data: ' + JSON.stringify(data));
    try {
        const newData = await response.json();
        console.log(newData)
        return newData;
    } catch (error) {
        console.log('error', error);
    }
}

export { handleTripEntry, validateForm, resetModal }