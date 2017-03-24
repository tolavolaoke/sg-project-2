var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validationRules = {
  name: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true
  }
};
var PlayerSchema = new Schema(validationRules);
var Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;
