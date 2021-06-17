const express = require('express'); // require the express package
const app = express(); // initialize your express app instance
const cors = require('cors');
app.use(cors()); // after you initialize your express app instance
require('dotenv').config();
const PORT = process.env.PORT;
const weatherController = require('./controller/weather.controller');
const moviesController = require('./controller/movies.controller');

app.get('/weather', weatherController );
app.get('/movies', moviesController );

app.listen(PORT);


