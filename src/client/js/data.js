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
    console.log('Posting data to server');
    try {
        const newData = await response.json();
        //console.log(newData)
        return newData;
    } catch (error) {
        console.log('error', error);
    }
}

// function to get number of days from two dates
function getDays(startDate, endDate) {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(startDate);
    const secondDate = new Date(endDate);
    const diffDays = Math.round((secondDate.getTime() - firstDate.getTime()) / oneDay );
    return diffDays;
}

// function to format the date
function formatDate(date) {
    const d = new Date(date.split('-'));
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const newDate = d.toLocaleDateString('en-US', options);
    return newDate;
}

// function to format the date short
function formatDateShort(date) {
    const d = new Date(date.split('-'));
    const options = { month: 'numeric', day: 'numeric' };
    const newDate = d.toLocaleDateString('en-US', options);
    return newDate;
}

export { saveTrip, getTrips, postData, getTripData, getDays, formatDate, formatDateShort }