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

class Movie {
  constructor(title, overview, averageVotes, totalVotes, imgUrl, popularity, releasedOn) {
    this.title = title;
    this.overview = overview;
    this.average_votes = averageVotes;
    this.total_votes = totalVotes;
    this.image_url = imgUrl;
    this.popularity = popularity;
    this.released_on = releasedOn;
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

app.get('/movies', (req, res) => {
  let cityName = req.query.city;
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=4cf59ae5d301baaf281b133f1bf0fdda&query=${cityName}`)
    .then(response => {
      const moviesArr = [];
      response.data.results.map((item) => {
        let imageURL = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        let newMovie = new Movie(item.title, item.overview, item.vote_average, item.vote_count, imageURL, item.popularity, item.release_date);
        moviesArr.push(newMovie);
      });
      res.send(moviesArr);
    })
    .catch((error) => res.send(error.message));
});

app.listen(port);


