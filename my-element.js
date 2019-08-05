import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";

/**
 * `my-element`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */

class WeatherWidget extends PolymerElement {
  static get properties() {
    return {
      coordinates: {
        type: Object,
        notify: true,
        reflectToAttribute: true,
        value: {},
        observer: "_activeChanged",
      },
      currentDate: {
        value: new Date().toLocaleDateString(),
      },
      currentTime: {
        value: new Date().toLocaleTimeString(),
      },
      currentLocation: {
        value: "Nepal",
      },
      temp: {
        value: "",
      },
      weatherIcon: {
        value: "",
      },
    };
  }
  static get template() {
    return html`
      <style>

        @font-face {
          font-family: 'Montserrat', sans-serif;
          src: url("./Montserrat/Montserrat-Regular)
        }
        :host {
          display: inline-block;
        }
        .widgetWrapper {
          background-color: #4bc3da;
          font-family: 'Montserrat', sans-serif;
          position: relative;
          width: 200px;
          height: 200px;
          box-sizing: border-box;
          border-radius: 3px;
          margin: 5px;
        }
        .weatherIcon {
          width: 100px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%)
        }
        .tempWrapper {
          position: absolute;
          top: 10px;
          right: 20px;
          color: #ffffff;
          font-size: 22px;
          font-weight: bold;
        }
        .locationWrapper {
          color: #ffffff;
          left: 20px;
          top: 15px;
          position: absolute;
          font-size: 15px;
        }
        .timeWrapper {
          position: absolute;
          top: 75%;
          text-align: center;
          width: 100%;
          color: #ffffff;
          font-size: 16px;
        }
        .dateWrapper {
          position: absolute;
          bottom: 10px;
          text-align: center;
          width: 100%;
          color: #ffffff;
          font-size: 14px;
        }
      </style>
      <div class="widgetWrapper" id="widgetWrapperID">
        <img
          src="http://openweathermap.org/img/wn/[[weatherIcon]]@2x.png"
          class="weatherIcon"
        />
        <div class="tempWrapper" id="tempWrapperID">[[temp]]&deg;C</div>
        <div class="locationWrapper" id="locationWrapperID">
          [[currentLocation]]
        </div>
        <div class="timeWrapper" id="timeWrapperID">[[currentTime]]</div>
        <div class="dateWrapper" id="dateWrapperID">[[currentDate]]</div>
      </div>
    `;
  }

  constructor() {
    super();
    this.updateDateTime();
  }
  _activeChanged(newValue, oldValue) {
    this.getGeoLocation();
  }
  updateDateTime() {
    setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString();
    }, 1000);
  }
  getGeoLocation() {
    let latitude = this.coordinates.lat;
    let longitude = this.coordinates.lon;
    let APIKEY = "460aa9fb3b4ece57fb5d94dc910417fa";
    let weatherData;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}&units=metric`
    )
      .then(response => {
        return response.json();
      })
      .then(myJSON => {
        weatherData = myJSON;
        this.temp = Math.floor(weatherData.main.temp);
        this.currentLocation = weatherData.name;
        this.weatherIcon = weatherData.weather[0].icon;
      });
  }
}
window.customElements.define("weather-widget", WeatherWidget);
