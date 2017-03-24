// TODO: implement seedData()
console.warn('NOTE! This is where you will seed your database.');
console.warn('NOTE! Remember to change Game & Player to your primary & secondary model names... and the comments too!');

var mongoose = require('mongoose');
var Game = require('../models/game-model');
var Player = require('../models/player-model');
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/sg-webdev4-project2';

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
    Game.remove({}, function(err) {
      if (err) {
        console.log('could not drop Game collection: err:', err);
        process.exit(1);
      }
      console.log('emptied Game collection');
      Player.remove({}, function(err) {
        if (err) {
          console.log('could not drop Player collection: err:', err);
          process.exit(1);
        }
        console.log('emptied Player collection');
        seedData();
      });
    });
  });
}

initDb();
