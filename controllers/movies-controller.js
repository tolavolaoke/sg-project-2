var Movie = require('../models/movie-model');

require('../models/review-model');


// Action: new
function newMovie(req, res) {
  res.render('movies/new', {
    title: 'New movie'
  });
}

// Action: create
function createMovie(req, res) {
  var newMovie = new Movie();

  newMovie.title = req.body.title;
  newMovie.genre = req.body.genre;
  newMovie.year = req.body.year;
  newMovie.image = req.body.image;

  newMovie.save(function (err) {
    var errorJson = [];

    if (err) {
      for (var path in err.errors) {
        errorJson.push({
          path: path,
          message: err.errors[path].message
        });
        console.log('Could not create new movie: error:', err.errors[path].message);
      }
      res.status(400).json(errorJson);
      return;
    }

  });
}

module.exports = {
  new: newMovie,
  create: createMovie
  // edit: editMovie,
  // update: updateMovie,
  // destroy: destroyMovie
};
