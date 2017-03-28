var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validationRules = {
  name: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  }
};
var ReviewSchema = new Schema(validationRules);
var Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
