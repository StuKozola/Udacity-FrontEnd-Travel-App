import {getDays} from './data.js';

// function to create a card for a trip
function createCards(tripData) {
    // get today's date
    const today = new Date();
    // create the tip card
    let aTrip = `
    <div class="card" id="trip-1">
                <div class="card-header">
                    <span class="delete">&times;</span>
                </div>
                <div class="card-img">
                    <img src="" alt="City Image">
                </div>
                <div class="card-text">
                    <h2 class="card-city">${tripData.city.name} + ", " + ${tripData.city.countryName}</h2>
                    <h4 class="card-date">${tripData.dates[0]} - ${tripData.dates[1]}</h4>
                    <p><i class="fa fa-hotel"></i><i class="hotel">${tripData.selectedHotel}</i></p>
                    <p><i class="fa fa-car"></i><i class="fa fa-plane"></i>Days until departure: <i class="days">${getDays(tripData.dates[0], today)}</i>
                    </p>
                    <h1 class="curr-temp">${tripData.weather[0].temp}°C</h1>
                    <div class="sky">
                        <div class="sun"></div>
                        <div class="cloud">
                            <div class="circle-small"></div>
                            <div class="circle-tall"></div>
                            <div class="circle-medium"></div>
                        </div>
                    </div>
                    <table>
                        <tr>
                            <td>TUE</td>
                            <td>WED</td>
                            <td>THU</td>
                            <td>FRI</td>
                            <td>SAT</td>
                        </tr>
                        <tr>
                            <td>30°</td>
                            <td>34°</td>
                            <td>36°</td>
                            <td>34°</td>
                            <td>37°</td>
                        </tr>
                        <tr>
                            <td>17°</td>
                            <td>22°</td>
                            <td>19°</td>
                            <td>23°</td>
                            <td>19°</td>
                        </tr>
                    </table>
                </div>

            </div>
        `;
    // add the card to the page
    document.getElementById("trip-details").innerHTML += aTrip;
}

export { createCards }
