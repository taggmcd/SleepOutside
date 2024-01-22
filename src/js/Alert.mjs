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

    buidAlerts() {

        listAlerts = getData();

        if (listAlerts.length > 0) {
          let alertsP = "";
          listAlerts.map((item) => {
            alertsP =
              alertsP +
              `<p style="background-color:${item.background} ; color: ${item.color};">${item.message}</p>`;
          });
          alertsP = "<section class='alert-list'>" + alertsP + "</section>";
          return alertsP;
        } else {
          return "";
        }
      }
}