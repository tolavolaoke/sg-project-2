/* global Movie */

  var Review = {
    controller: {
      create: function (form) {
        var newReview = {
          name: form.name.value,
          comment: form.comment.value,
          rating: form.rating.value,
          movieId: form.movieId.value
        };

        Review.model.create(
        newReview,
        function success() {
          Movie.controller.show(form.movieId.value);
        },
  function error() {

  }
);
      }
    },

    model: {

      create: function (data, success, error) {
        $.ajax({
          method: 'POST',
          dataType: 'json',
          url: '/reviews',
          data: data,
          success: success,
          error: error
        });
      }
    }
  };
