"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const uuid = require('uuid');
const stationAnalytics=require("../utils/station-analytics");
const { read } = require("fs-extra");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug("Station id = ", stationId);

    const station= stationStore.getStation(stationId)
    const latestReading= stationAnalytics.getLatestReading(station);
    console.log(latestReading);
    const weatherCode= stationAnalytics.getWeatherCode(Number(latestReading?.code));
    console.log(weatherCode);
    const convertToFarenheit= stationAnalytics.getConvertToFarenheit(latestReading?.temperature);
    console.log(convertToFarenheit);
    const beaufortConvert= stationAnalytics.getBeaufortConvert(latestReading?.windSpeed);
    console.log(beaufortConvert);
    const windCompass= stationAnalytics.getWindCompass(latestReading?.windDirection);
    console.log(windCompass);
    const windChill= stationAnalytics.getWindChill(Number(latestReading?.temperature.windSpeed));
    console.log(windChill);
    const viewData = {
      title: "Station",
      station: stationStore.getStation(stationId),
      latestReading: latestReading,
      weatherCode: weatherCode,
      convertToFarenheit: convertToFarenheit,
      beaufortConvert: beaufortConvert,
      windCompass: windCompass,
      windChill: windChill,
    };
    response.render("station", viewData);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },
  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      windDirection: request.body.windDirection,
      pressure: request.body.pressure,
    };
    logger.debug('New Reading = ', newReading);
    stationStore.addReading(stationId, newReading);
    response.redirect('/station/' + stationId);
  },
};

module.exports = station;
