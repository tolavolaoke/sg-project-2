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
    },
    {
      title: 'Avengers',
      genre: 'Action',
      imageHref: 'https://i.ytimg.com/vi/48fKIXlxaXk/maxresdefault.jpg',
      releaseYear: '2016'
    },
    {
      title: 'Passengers',
      genre: 'romance',
      imageHref: 'http://www.cbsays.com/wp-content/uploads/2017/01/passengers_banner.jpg',
      releaseYear: '2016'
    },
    {
      title: 'King Kong',
      genre: 'Action',
      imageHref: 'https://i.ytimg.com/vi/ZuYUf66Bpi0/maxresdefault.jpg',
      releaseYear: '2017'
    },
    {
      title: 'Batman The Dark Knight',
      genre: 'Action',
      imageHref: 'http://screencrush.com/files/2012/07/1920_action_bat.jpg',
      releaseYear: '2008'
    },
    {
      title: 'The Martian',
      genre: 'Comedy',
      imageHref: 'http://thegeekypress.com/wp-content/uploads/2016/10/martian-9.jpg',
      releaseYear: '2016'
    },
    {
      title: 'Captain Phillips',
      genre: 'Action',
      imageHref: 'https://amonymousblog.files.wordpress.com/2013/08/richards.jpg',
      releaseYear: '2013'
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

    review1.name = 'Hotstuffz';
    review1.comment = 'Blending race-savvy satire with horror to especially potent effect, this bombshell social critique from first-time director Jordan Peele proves positively fearless';
    review1.rating = '4';
    review1.save(function (err, review1Saved) {
      var review2 = new Review();

      if (err) {
        console.log('could not create review1: err:', err);
        process.exit(1);
      }
      console.log('review1 saved:', review1Saved);

      review2.name = 'Catperson';
      review2.comment = 'Funny, scary, and thought-provoking, Get Out seamlessly weaves its trenchant social critiques into a brilliantly effective and entertaining horror/comedy thrill ride.';
      review2.rating = '5';
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
