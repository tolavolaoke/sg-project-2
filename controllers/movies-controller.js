var Movie = require('../models/movie-model');

// Action: index
function indexMovies(req, res) {
  Movie.find({}, function (err, movies) {
    if (err) {
      console.log('Could not get list of movies:', err);
      // A little bit lazy, but not going to implement
      // anything more complex at this point in time:
      res.status(500).send('Could not get list of movies');
      return;
    }
    res.json(movies);
  });
}

module.exports = {
  index: indexMovies
};
