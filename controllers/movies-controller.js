//Controller ties together the model and the view
//receives user input and decides what to do with it

var Movie = require('../models/movie-model');

require('../models/review-model');

//=========================== Action: index===================================//
function indexMovies(req, res) {
  Movie.find({}, function (err, movies) {
    if (err) {
      console.log('Could not get list of movies:', err.message);
      res.status(500).json({ message: 'Could not get list of movies' });
      return;
    }
    res.json(movies);
  });
}

//========================Action: Create =====================================//

function createMovie(req, res) {
  var newMovie = new Movie();

  newMovie.title = req.body.title;
  newMovie.genre = req.body.genre;
  newMovie.imageHref = req.body.imageHref;
  newMovie.releaseYear = req.body.releaseYear;

  newMovie.save(function (err) {

    if (err) {
      res.status(400).json({message: 'Sorry, we could not add your movie. Ensure all fields are completed'});
      return;
    }
    res.json({message: 'Movie successfully created'});
  });
}

// =========================Action: update==================================//
function updateMovie(req, res) {
  var movieId = req.params.id;
  var updatedMovie = {
    title: req.body.title,
    genre: req.body.genre,
    imageHref: req.body.imageHref,
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

// ==========================Action: show==================================//
function showMovie(req, res) {
  var movieId = req.params.id;

  Movie.findOne({ _id: movieId }).populate('reviews').exec(
    function (err, movie) {
      if (err) {
        console.log('Could not get movie:', err.message);
        res.status(404).json({ message: 'Could not get movie' });
        return;
      }
      res.status(200).json(movie);
    }
  );
}

//======================== Action: destroy==================================//
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

//============================EXPORT========================================//

module.exports = {
  index: indexMovies,
  update: updateMovie,
  show: showMovie,
  destroy: destroyMovie,
  create: createMovie
};
