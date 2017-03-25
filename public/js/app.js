/* global Movie, Review */

$(function () {
  console.log('document loaded');
  console.log('Movie:', Movie);
  console.log('Review:', Review);
  // default screen:
  Movie.controller.index();
});
