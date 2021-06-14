const express = require('express'); // require the express package
const app = express(); // initialize your express app instance
const cors = require('cors');
app.use(cors()); // after you initialize your express app instance
require('dotenv').config();
const weatherData= require('./data/weather.json');
const port= process.env.port;

class Forecast {
  constructor(date,desc){
    this.date=date;
    this.desc=desc;
  }
}

// a server endpoint
app.get('/', // our endpoint name
  function (req, res) { // callback function of what we should do with our request
    res.send('Hello World'); // our endpoint function response
  });
app.get('/weather',(req,res)=>{
//   let weatherLat = req.query.lat;
//   let weatherLon = req.query.lon;
  const weatherArr=[];
  weatherData.data.forEach((obj)=>{
    let descOfDay = `Low of ${obj.low_temp}, high of ${obj.high_temp} with ${obj.weather.description}`;
    let weatherDay = new Forecast (obj.valid_date,descOfDay);
    weatherArr.push(weatherDay);
  });
  res.send(weatherArr);

});

app.listen(port); // kick start the express server to work


