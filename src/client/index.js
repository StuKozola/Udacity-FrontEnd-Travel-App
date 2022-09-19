import { handleTripEntry } from './js/handleTripEntry.js';
import { getTrips } from './js/data.js';
import { createCards } from './js/cards.js';
import './styles/resets.scss';
import './styles/base.scss';
import './styles/form.scss';
import './styles/header.scss';
import './styles/modal.scss';
import './styles/cards.scss';
import './styles/footer.scss';
import './img/logo-no-background.png';
import './img/sun-pattern.webp';
import './img/favicon.ico';

// load saved trips from local storage and create cards
let trips = getTrips();
if (trips.length > 0) {
    trips.forEach(trip => {
        //console.log(trip)
        createCards(trip);
    });
}

export {
    handleTripEntry,
    getTrips
}