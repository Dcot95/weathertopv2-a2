"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const uuid = require('uuid');
const stationCollection= require("../models/station-store.json").stationCollection;


const stationAnalytics = {

  getLatestReading(station) {

    let latestReading = null;
    if (station.readings.length > 0) {
      latestReading = station.readings[station.readings.length - 1];
    }
    else{
      return latestReading;
    }
    return latestReading;
  },

  getWeatherCode(code) {

    if (code === 100) {
      return "Clear";
    } else if (code === 200) {
      return "Partial Clouds";
    } else if (code === 300) {
      return "Cloudy";
    } else if (code === 400) {
      return "Light Showers";
    } else if (code === 500) {
      return "Heavy Showers";
    } else if (code === 600) {
      return "Rain";
    } else if (code === 700) {
      return "Snow";
    } else if (code === 800) {
      return "Thunder";
    }
    return "Unknown";
  },

  getConvertToFarenheit(temperature){
    if(temperature>=0){
      return ((temperature*9/5)+32);
    }
  },
  getBeaufortConvert(windSpeed) {
    if (windSpeed === 1) {
      return "0 bft";
    } else if (windSpeed > 1 && windSpeed <= 5) {
      return "1 bft";
    } else if (windSpeed >= 6 && windSpeed <= 11) {
      return "2 bft";
    } else if (windSpeed >= 12 && windSpeed <= 19) {
      return "3 bft";
    } else if (windSpeed >= 20 && windSpeed <= 28) {
      return "4 bft";
    } else if (windSpeed >= 29 && windSpeed <= 38) {
      return "5 bft";
    } else if (windSpeed >= 39 && windSpeed <= 49) {
      return "6 bft";
    } else if (windSpeed >= 50 && windSpeed <= 61) {
      return "7 bft";
    } else if (windSpeed >= 62 && windSpeed <= 74) {
      return "8 bft";
    } else if (windSpeed >= 75 && windSpeed <= 88) {
      return "9 bft";
    } else if (windSpeed >= 89 && windSpeed <= 102) {
      return "10 bft";
    } else if (windSpeed >= 103 && windSpeed <= 117) {
      return "11 bft";
    }
    return "Day After Tomorrow Type Of Weather";
  },
  getWindCompass(windDirection) {
    if (windDirection > 348.75 || windDirection < 11.25) {
      return "North";
    } else if (windDirection >= 11.25 && windDirection < 33.75) {
      return "North North East";
    } else if (windDirection >= 33.75 && windDirection < 56.25) {
      return "North East";
    } else if (windDirection >= 56.25 && windDirection < 78.75) {
      return "East North East";
    } else if (windDirection >= 78.75 && windDirection < 101.25) {
      return "East";
    } else if (windDirection >= 101.25 && windDirection < 123.75) {
      return "East South East";
    } else if (windDirection >= 123.75 && windDirection < 146.25) {
      return "South East";
    } else if (windDirection >= 146.25 && windDirection < 168.75) {
      return "South South East";
    } else if (windDirection >= 168.75 && windDirection < 191.25) {
      return "South";
    } else if (windDirection >= 191.25 && windDirection < 213.75) {
      return "South South West";
    } else if (windDirection >= 213.75 && windDirection < 236.25) {
      return "South West";
    } else if (windDirection >= 236.25 && windDirection < 258.75) {
      return "West South West";
    } else if (windDirection >= 258.75 && windDirection < 281.25) {
      return "West";
    } else if (windDirection >= 281.25 && windDirection < 303.75) {
      return "West North West";
    } else if (windDirection >= 303.75 && windDirection < 326.25) {
      return "North West";
    } else if (windDirection >= 326.25 && windDirection < 348.75) {
      return "North North West";
    }
    return "Incorrect Wind Direction";
  },
  getWindChill(temperature,windSpeed) {
    return (13.12 + (0.6215 * (temperature)) - (11.37 * (Math.pow(windSpeed,0.16))) + ((0.3965 * (temperature)) * (Math.pow(windSpeed,0.16))));
  },


};
module.exports = stationAnalytics;