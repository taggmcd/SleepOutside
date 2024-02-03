import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();
const checkoutProcess = new CheckoutProcess("so-cart", "#summary");
checkoutProcess.init();
document.querySelector("#zip").addEventListener("blur", checkoutProcess.calculateOrdertotal.bind(checkoutProcess));
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();
    const formElement = document.forms["checkout"];
    const isValid = formElement.checkValidity()
    formElement.reportValidity()
    if(isValid) {
        checkoutProcess.checkout();
    }

});