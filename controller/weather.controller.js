const Forecast = require('../models/weather.model');
const axios = require('axios');
require('dotenv').config();

const weatherController = (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.Weather_API_Key}&lat=${lat}&lon=${lon}`)
    .then(response => {
      const weatherArr = [];
      response.data.data.map((obj) => {
        let descOfDay = `Low of ${obj.low_temp}, high of ${obj.high_temp} with ${obj.weather.description}`;
        let weatherDay = new Forecast(obj.valid_date, descOfDay);
        weatherArr.push(weatherDay);
      });
      res.send(weatherArr);
    })
    .catch((error) => res.send(error.message));
};

module.exports = weatherController;
