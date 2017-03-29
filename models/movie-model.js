//Holds raw data
//defines the main components of the Movie properties and the objects



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
  imageHref: {
    type: String,
    required: true
  },
  releaseYear: {
    type: String,
    required: true
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
};
var MovieSchema = new Schema(validationRules);
var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
