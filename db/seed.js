// TODO: implement seedData()
console.warn('NOTE! This is where you will seed your database.');
console.warn('NOTE! Remember to change Game & Player to your primary & secondary model names... and the comments too!');

var mongoose = require('mongoose');
var Movie = require('../models/movie-model');
var Review = require('../models/review-model');
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/sg-webdev4-project2'; //DO we change this?

function seedData() {
  console.warn('NOTE! seedData() needs to be implemented');
  mongoose.connection.close();
}

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
