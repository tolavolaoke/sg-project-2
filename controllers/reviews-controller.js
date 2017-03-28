
var Movie = require('../models/movie-model');
var Review = require('../models/review-model');

//========================Action: Create =====================================//

function createReview(req, res) {

  var newReview = new Review();

  var movieId = req.body.movieId;

  newReview.name = req.body.name;
  newReview.comment = req.body.comment;
  newReview.rating = req.body.rating;

  newReview.save(function (err, savedReview) {
    if (err) {
      res.status(404).json({ message: 'Could not add review to the the movie'});
      return;
    }
    Movie.findOne({ _id: movieId }, function(err, movie) {
      if(err){
        console.log('Could not find movie');
      }
      movie.reviews.push(savedReview._id);

      movie.save(function (err) {
        if(err){
          console.log('Could not update movie with new review: error:');
        }
        res.json({ message: 'Review successfully added to movie'});
      });
    });
  });
}


module.exports = {
  create: createReview
};
