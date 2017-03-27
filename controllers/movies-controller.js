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
//
// function createMovie(req, res) {
//   var newMovie = new Movie();
//
//   newMovie.title = req.body.title;
//   newMovie.genre = req.body.genre;
//   newMovie.releaseYear = req.body.releaseYear;
//
//   newMovie.save(function (err) {
//     var errorJson = [];
//
//     if (err) {
//       for (var path in err.errors) {
//         errorJson.push({
//           path: path,
//           message: err.errors[path].message
//         });
//         console.log('Could not create new movie: error:', err.errors[path].message);
//       }
//       res.status(400).json(errorJson);
//       return;
//     }
//   });
// }

// =========================Action: update==================================//
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

// ==========================Action: show==================================//
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
  destroy: destroyMovie
  // create: createMovie
};
