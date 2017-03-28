var mongoose = require('mongoose');
var Movie = require('../models/movie-model');
var Review = require('../models/review-model');
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/sg-webdev4-project2';

function seedData() {
//MOVIE
  var movie = new Movie();

  movie.title = 'Get out';
  movie.genre = 'Thriller';
  movie.imageHref = 'https://i.ytimg.com/vi/sRfnevzM9kQ/maxresdefault.jpg';
  movie.releaseYear = '1987';
  movie.save(function (err, movieSaved) {
    var review1 = new Review();

    if (err) {
      console.log('COULD not create movieSaved: err:', err);
      process.exit(1);
    }
    console.log('movie saved:', movieSaved);

    //REVIEWS

    review1.name = 'hotstuffz';
    review1.content = 'Not bad';
    review1.rating = '3';
    review1.save(function (err, review1Saved) {
      var review2 = new Review();

      if (err) {
        console.log('could not create review1: err:', err);
        process.exit(1);
      }
      console.log('review1 saved:', review1Saved);

      review2.name = 'catperson';
      review2.content = 'Putting out fire';
      review2.rating = '2';
      review2.save(function (err, review2Saved) {
        if (err) {
          console.log('could not create review2: err:', err);
          process.exit(1);
        }
        console.log('review2 saved:', review2Saved);

        movieSaved.reviews.push(review1._id);
        movieSaved.reviews.push(review2._id);
        movieSaved.save(function (err, movieWithReviewsSaved) {
          if (err) {
            console.log('could not save movie with reviews: err:', err);
            process.exit(1);
          }
          console.log('movie saved with reviews:', movieWithReviewsSaved);
          mongoose.connection.close();
        });
      });
    });
  });
}


//----------------------------------------------------------------------------
function initDb() {
  mongoose.connect(MONGODB_URI, {}, function (err) {
    if (err) {
      console.log('could not connect to db: err:', err);
      process.exit(1);
    }
    console.log('connected to', mongoose.connection.name);
    Movie.remove({}, function(err) {
      if (err) {
        console.log('could not drop Movie collection: err:', err);
        process.exit(1);
      }
      console.log('emptied Movie collection');
      Review.remove({}, function(err) {
        if (err) {
          console.log('could not drop Review collection: err:', err);
          process.exit(1);
        }
        console.log('emptied Review collection');
        seedData();
      });
    });
  });
}

initDb();
