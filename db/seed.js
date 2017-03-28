var mongoose = require('mongoose');
var Movie = require('../models/movie-model');
var Review = require('../models/review-model');
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/sg-webdev4-project2';

function seedData() {
//MOVIE
  var movies = [
    {
      title: 'Get out',
      genre: 'Thriller',
      imageHref: 'https://i.ytimg.com/vi/sRfnevzM9kQ/maxresdefault.jpg',
      releaseYear: '1987'
    },
    {
      title: 'Shutter Island',
      genre: 'Action',
      imageHref: 'https://moviesandmadness.files.wordpress.com/2012/01/shutter_island_wallpaper_1600x1200_03.jpg',
      releaseYear: '2010'
    },
    {
      title: 'Central Intelligence',
      genre: 'Action',
      imageHref: 'http://www.cavsconnect.com/wp-content/uploads/2016/11/Central-Intelligence-Movie-Review.jpg',
      releaseYear: '2016'
    }
  ];

  Movie.create(movies, function (err, moviesSaved) {
    var review1 = new Review();

    if (err) {
      console.log('COULD not create movies: err:', err);
      process.exit(1);
    }
    console.log('movies saved:', moviesSaved);

    //REVIEWS

    review1.name = 'hotstuffz';
    review1.comment = 'Not bad';
    review1.rating = '3';
    review1.save(function (err, review1Saved) {
      var review2 = new Review();

      if (err) {
        console.log('could not create review1: err:', err);
        process.exit(1);
      }
      console.log('review1 saved:', review1Saved);

      review2.name = 'catperson';
      review2.comment = 'Putting out fire';
      review2.rating = '2';
      review2.save(function (err, review2Saved) {
        if (err) {
          console.log('could not create review2: err:', err);
          process.exit(1);
        }
        console.log('review2 saved:', review2Saved);

        moviesSaved[0].reviews.push(review1._id);
        moviesSaved[0].reviews.push(review2._id);
        moviesSaved[0].save(function (err, movieWithReviewsSaved) {
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
