// Your class should read the contents of the alerts.js file, 
// and if it finds anything it should create a 
// <section class="alert-list"> element then  loop through the results 
// and build a <p> for each alert and apply the background 
// and foreground colors to it specified in the alert.
export default class Alert {
    constructor(content) {
        this.content = content;
        this.path = `../public/json/alerts.json`;
    }
    getData() {
        return fetch(this.path)
            .then(convertToJson)
            .then((data) => (data));
    }


}