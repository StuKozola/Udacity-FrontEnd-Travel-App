import { getLatLon, getHotels } from "./geonames";
import { getWeather } from "./weatherbit";

const handleTripEntry = event => {
    event.preventDefault();
    // check dates are valid
    if (!validateForm()) {
        return;
    }
    resetModal();

    // api keys from .env file
    const geonamesUserName = process.env.GEONAMES_USERNAME;
    const weatherbitKey = process.env.WEATHERBIT_KEY;
    const pixabayKey = process.env.PIXABAY_KEY;

    // array to store data for trip
    let tripData = {
        city: [],
        weather: [],
        image: [],
        hotels: []
    };

    // ***** Show the Modal to select Hotel ***** //
    const modal = document.getElementById("save-modal");
    const addbtn = document.getElementById("addBtn");
    const cancelbtn = document.getElementById("cancelBtn");
    const savebtn = document.getElementById("saveBtn");
    const closebtn = document.getElementsByClassName("close")[0];

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
            // add hotels to the select list
            for( const hotel of hotels) {
                const option = document.createElement("option");
                option.value = hotel.hotelName;
                option.innerHTML = hotel.hotelName;
                hotelSelect.appendChild(option);
            };
        });

        // get the weather for the city and dates
        const startDate = document.getElementById("start_date").value;
        const endDate = document.getElementById("return_date").value;
        getWeather(lat, lon, weatherbitKey, startDate, endDate)
        .then(data => {
            tripData.weather = data.data;
        });

    });

    // Fill in the modal with the trip data
    document.getElementById("modal-city").innerHTML = tripData.city.name + ", " + tripData.city.countryName;
    document.getElementById("departure").innerHTML = document.getElementById("start_date").value;
    document.getElementById("return").innerHTML = document.getElementById("return_date").value;
    modal.style.display = "block";


    // When the user clicks on the close span element or cancel button, close the modal
    closebtn.onclick = function () {
        modal.style.display = "none";
    }
    cancelbtn.onclick = function () {
        modal.style.display = "none";
    }

    // When user clicks outside of modal, close the modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
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

// function to reset modal data
function resetModal() {
    document.getElementById("modal-city").innerHTML = "";
    document.getElementById("departure").innerHTML = "";
    document.getElementById("return").innerHTML = "";
    document.getElementById("hotel").innerHTML = '<option value="none">None</option>';
}

export { handleTripEntry, validateForm, resetModal }