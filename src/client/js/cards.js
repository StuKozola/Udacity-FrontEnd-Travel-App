import { getDays, formatDate, formatDateShort } from './data.js';

// function to create a card for a trip
function createCards(tripData) {
    // get today's date
    const today = new Date();
    // get days from today to trip start date
    const days = getDays(Date.parse(tripData.dates[0]),today)+1;
    // if the trip start date is greater than 16 days from tody, don't show the weather
    let tripForecast = 'No Weather Forecast Available for Trip';
    if (days < 16) {
        tripForecast = '';
        let tripDate = '<tr>';
        let tripIcon = '<tr>';
        let tripHigh = '<tr>';
        let tripLow = '<tr>';
        // for each day of the trip, get the weather forecast
        for (let i = days; i < (days+5); i++) {
            // add a table column for each day of the trip
            tripDate += `<td>${formatDateShort(tripData.forecast[i].datetime)}</td>`;
            tripIcon += `<td><img class="weather-icon-small" src="https://www.weatherbit.io/static/img/icons/${tripData.forecast[i].weather.icon}.png" alt="${tripData.forecast[i].weather.description}"></td>`;
            tripHigh += `<td>${tripData.forecast[i].high_temp}°</td>`;
            tripLow += `<td>${tripData.forecast[i].low_temp}°</td>`;
        }
        // close the table row
        tripDate += '</tr>';
        tripIcon += '</tr>';
        tripHigh += '</tr>';
        tripLow += '</tr>';

        // add the weather forecast to the card
        tripForecast = tripDate + tripIcon + tripHigh + tripLow;
    }

    // create the tip card
    let aTrip = `
    <div class="card" id="trip-1">
                <div class="card-header">
                    <span class="delete">&times;</span>
                </div>
                <div class="card-img">
                    <img src="${tripData.image[0].webformatURL}" alt="${tripData.image[0].tags}">
                </div>
                <div class="card-text">
                    <h2 class="card-city">${tripData.city.name}, ${tripData.city.countryName}</h2>
                    <h4 class="card-date">${formatDate(tripData.dates[0])} - ${formatDate(tripData.dates[1])}</h4>
                    <p><i class="fa fa-hotel"></i><i class="hotel">${tripData.selectedHotel}</i></p>
                    <p><i class="fa fa-car"></i><i class="fa fa-plane"></i>Days until departure: <i class="days">${days}</i>
                    </p>
                    <h1 class="curr-temp">${tripData.weather[0].temp}°C</h1>
                    <div class="current-weather">
                        <img id="weather-icon" src="https://www.weatherbit.io/static/img/icons/${tripData.weather[0].weather.icon}.png" alt="${tripData.weather[0].weather.description}">
                    </div>
                    <table>
                        ${tripForecast}
                    </table>
                </div>

            </div>
        `;
    // add the card to the page
    document.getElementById("trip-details").innerHTML += aTrip;

    // add an event listener to the delete button
    const deleteBtn = document.getElementsByClassName("delete");
    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", function () {
            this.parentElement.parentElement.remove();
        });
    }
}

export { createCards }
