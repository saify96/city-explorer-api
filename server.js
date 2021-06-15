const express = require('express'); // require the express package
const app = express(); // initialize your express app instance
const cors = require('cors');
const axios = require('axios');
app.use(cors()); // after you initialize your express app instance
require('dotenv').config();
const port = process.env.port;

class Forecast {
  constructor(date, desc) {
    this.date = date;
    this.desc = desc;
  }
}
app.get('/weather', (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=f049d01cee5c4a2dacd05a3c14d82f61&lat=${lat}&lon=${lon}`)
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
});
app.listen(port); // kick start the express server to work


