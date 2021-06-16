const Movie =require('../models/movies.model');
const axios = require('axios');
require('dotenv').config();

const moviesController = (req, res) => {
  let cityName = req.query.city;
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.Movies_API_Key}&query=${cityName}`)
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
};

module.exports = moviesController;
