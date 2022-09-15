import { getLatLon, getHotels } from "./geonames";
import { getWeather, getWeatherForecast } from "./weatherbit";
import { getLocalImage } from "./pixabay";
import { createCards } from "./cards";
import { saveTrip, getTrips, postData, getTripData, getDays } from "./data.js";

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
        id: [],
        city: [],
        weather: [],
        forecast: [],
        image: [],
        hotels: [],
        selectedHotel: [],
        dates: []
    };

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

    // When user clicks on the save button, save the trip data and create the cards
    savebtn.onclick = function () {
        // get the selected hotel
        const hotelSelect = document.getElementById("hotel");
        const selectedHotel = hotelSelect.options[hotelSelect.selectedIndex].value;
        tripData.selectedHotel = selectedHotel;
        // save the trip data to local storage
        saveTrip(tripData);
        // post the trip data to the server
        postData('/trip', tripData);
        // create the cards
        createCards(tripData);
        // close the modal
        resetForm();
    }

    // ***** Retrieve the Data for selected city ***** //
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
                    for (const hotel of hotels) {
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
                            // if no image found, use a default image of the country
                            if (data.totalHits == 0) {
                                getLocalImage(country, pixabayKey)
                                .then(stateData => {
                                    image.src = stateData.hits[0].webformatURL;
                                    });
                            } else {
                                image.src = data.hits[0].webformatURL;
                            }
                        });

                    // Fill in the modal with the trip data and display the modal
                    tripData.dates = [document.getElementById("start_date").value, document.getElementById("return_date").value];
                    document.getElementById("modal-city").innerHTML = tripData.city.name + ", " + tripData.city.countryName;
                    document.getElementById("departure").innerHTML = tripData.dates[0];
                    document.getElementById("return").innerHTML = tripData.dates[1];
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

    // check that start date is not in the past
    const today = new Date();
    const start = new Date(startDate);
    if (start < today) {
        alert("Unless you have a time machine, start date must be today or in the future");
        return false;
    }

    return true;
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
export { handleTripEntry, validateForm, resetModal }