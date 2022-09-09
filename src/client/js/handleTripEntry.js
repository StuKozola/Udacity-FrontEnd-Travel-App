import { getLatLon, getHotels } from "./geonames";

const handleTripEntry = event => {
    event.preventDefault();
    resetModal();

    // api keys from .env file
    const geonamesKey = process.env.GEONAMES_KEY;
    const weatherbitKey = process.env.WEATHERBIT_KEY;
    const pixabayKey = process.env.PIXABAY_KEY;
    
    // ***** Show the Modal to select Hotel ***** //
    const modal = document.getElementById("save-modal");
    const addbtn = document.getElementById("addBtn");
    const cancelbtn = document.getElementById("cancelBtn");
    const savebtn = document.getElementById("saveBtn");
    const closebtn = document.getElementsByClassName("close")[0];

    // from the city, get the latitude and longitude
    const location = document.getElementById("location").value;
    getLatLon(location, geonamesKey)
    .then(data => {
        const lat = data.geonames[0].lat;
        const lon = data.geonames[0].lng;
        const country = data.geonames[0].countryName;
        const city = data.geonames[0].name;
        console.log(data);
    }); 
        
    
    // from the city, get nearby hotels
    getHotels(location, geonamesKey)
    .then(data => {
        const hotels = data.geonames;
        const hotelSelect = document.getElementById("hotel");
        hotels.forEach(hotel => {
            const option = document.createElement("option");
            option.value = hotel.name;
            option.innerHTML = hotel.name;
            hotelSelect.appendChild(option);
        });
    });


    // Fill in the modal with the trip data
    document.getElementById("modal-city").innerHTML = location;
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

    return true;
}

// function to get number of days from two dates
function getDays(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(startDate);
    const secondDate = new Date(endDate);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
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