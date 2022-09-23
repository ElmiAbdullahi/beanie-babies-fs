/* Imports */
import { getBeanies, getAstroSigns } from './fetch-utils.js';
import { renderAstroSignOption, renderBeanie } from './render-utils.js';

/* Get DOM Elements */
const notificationDisplay = document.getElementById('notification-display');
const searchForm = document.getElementById('search-form');
const astroSignSelect = document.getElementById('astro-sign-select');
const beanieList = document.getElementById('beanie-list');

/* State */
let error = null;
let count = 0;
let astroSigns = [];
let beanies = [];
/* Events */

/* Display Functions */

async function findBeanies(name, astroSign) {
    const response = await getBeanies(name, astroSign);

    error = response.error;
    beanies = response.data;
    count = response.count;
    displayNotifications();
    if (!error) {
        displayBeanies();
    }
}

// (don't forget to call any display functions you want to run on page load!)
window.addEventListener('load', async () => {
    findBeanies();
    displayBeanies();

    const response = await getAstroSigns();

    error = response.error;

    astroSigns = response.data;

    displayNotifications();

    if (!error) {
        displayAstroSignOptions(astroSigns);
    }
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);
    findBeanies(formData.get('name'), formData.get('astroSign'));
});

function displayBeanies() {
    beanieList.innerHTML = '';

    for (const beanie of beanies) {
        const beanieEl = renderBeanie(beanie);
        beanieList.append(beanieEl);
    }
}

function displayNotifications() {
    if (error) {
        notificationDisplay.classList.add('error');
        notificationDisplay.textContent = error.message;
    } else {
        notificationDisplay.textContent = `Showing ${beanies.length} of ${count} matching beanies`;
    }
}

function displayAstroSignOptions(astroSigns) {
    for (const astroSign of astroSigns) {
        const astroSignEl = renderAstroSignOption(astroSign);

        astroSignSelect.append(astroSignEl);
    }
}
