var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validationRules = {
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Player'
    }
  ]
};
var GameSchema = new Schema(validationRules);
var Game = mongoose.model('Game', GameSchema);

module.exports = Game;
