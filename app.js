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

async function findBeanies(title, astroSign) {
    const response = await getBeanies(title, astroSign);

    error = response.error;
    beanies = response.data;
    return response;
}

// (don't forget to call any display functions you want to run on page load!)
window.addEventListener('load', async () => {
    await findBeanies();
    displayBeanies();
});

function displayBeanies() {
    beanieList.innerHTML = '';

    for (const beanie of beanies) {
        console.log(beanie);
        const beanieEl = renderBeanie(beanie);
        beanieList.append(beanieEl);
    }
}
