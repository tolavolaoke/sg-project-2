var express = require('express');
var router = express.Router();
var moviesController = require('../controllers/movies-controller');

// TODO: fill in your router as required
router.get('/movies', moviesController.index);

module.exports = router;
