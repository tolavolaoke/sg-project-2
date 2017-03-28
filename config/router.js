var express = require('express');
var router = express.Router();
var moviesController = require('../controllers/movies-controller');
var reviewsController = require('../controllers/reviews-controller');

// TODO: fill in your router as required
router.get('/movies', moviesController.index);
router.get('/movies/:id', moviesController.show);
router.post('/movies', moviesController.create);
router.put('/movies/:id', moviesController.update);
router.delete('/movies/:id', moviesController.destroy);

router.post('/reviews',reviewsController.create);


module.exports = router;
