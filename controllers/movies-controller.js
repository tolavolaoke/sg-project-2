var Movie = require('../models/movie-model');

// Action: index
function indexMovies(req, res) {
  Movie.find({}, function (err, movies) {
    if (err) {
      console.log('Could not get list of movies:', err.message);
      // A little bit lazy, but not going to implement
      // anything more complex at this point in time:
      res.status(500).send('Could not get list of movies');
      return;
    }
    res.json(movies);
  });
}

// Action: destroy
function destroyMovie(req, res) {
  var movieId = req.params.id;

  Movie.deleteOne({ _id: movieId }, function (err) {
    if (err) {
      console.log('Could not get movie to delete:', err.message);
      res.status(404).json({ message: 'Could not get movie to delete' });
      return;
    }
    res.status(200).json({ message: 'Movie successfully deleted' });
  });
}

module.exports = {
  index: indexMovies,
  destroy: destroyMovie
};
