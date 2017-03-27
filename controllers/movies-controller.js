var Movie = require('../models/movie-model');

require('../models/review-model');

// Action: index
function indexMovies(req, res) {
  Movie.find({}, function (err, movies) {
    if (err) {
      console.log('Could not get list of movies:', err.message);
      // A little bit lazy, but not going to implement
      // anything more complex at this point in time:
      res.status(500).json({ message: 'Could not get list of movies' });
      return;
    }
    res.json(movies);
  });
}

// Action: update
function updateMovie(req, res) {
  var movieId = req.params.id;
  var updatedMovie = {
    title: req.body.title,
    genre: req.body.genre,
    releaseYear: req.body.releaseYear
  };

  Movie.findOneAndUpdate({ _id: movieId }, updatedMovie, function (err) {
    if (err) {
      console.log('Could not get existing movie to update:', err.message);
      // ditto comment above re. keeping complexity to a minimum:
      res.status(404).json({ message: 'Could not get existing movie to update' });
      return;
    }
    res.status(200).json(updatedMovie);
  });
}

// Action: show
function showMovie(req, res) {
  var movieId = req.params.id;

  Movie.findOne({ _id: movieId }).populate('reviews').exec(
    function (err, movie) {
      if (err) {
        console.log('Could not get movie:', err.message);
        // ditto comment above re. keeping complexity to a minimum:
        res.status(404).json({ message: 'Could not get movie' });
        return;
      }
      res.status(200).json(movie);
    }
  );
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
  update: updateMovie,
  show: showMovie,
  destroy: destroyMovie
};
