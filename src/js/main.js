import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
let numbVisits = Number(window.localStorage.getItem("numVisits-ls")) || 0;
const advert = document.createElement('div');
const ad = document.querySelector('#advert');
if (numbVisits == 0) {
        advert.innerHTML = `<h3>Register With Us to Earn More Sleep!</h3>
        <h4>Giveaway of an item $50 or more for all who register!</h4>`;
          ad.prepend(advert);
}
else {
    advert.innerHTML = `<h2>Welcome Back!</h2>`;
    ad.prepend(advert);
}

numbVisits++;

localStorage.setItem("numVisits-ls", numbVisits);
