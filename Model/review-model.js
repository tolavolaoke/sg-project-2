var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validationRules = {
  movieName: {
    type: String,
    required: true
  },
  movieReview: {
    type: String,
    required: true
  },
  movieRating: {
    type: String,
    required: true
  }
};
var ReviewSchema = new Schema(validationRules);
var Review = mongoose.model('Book', ReviewSchema);

module.exports = Review;
