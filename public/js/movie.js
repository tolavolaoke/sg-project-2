// define a globally-available object, which stores all functions related to a Movies
// Note: this is a singleton, so we are following the convention of giving a singleton an init capital letter.
var Movie = {
  controller: {
    index: function () {
      var $content = $('#content');

      Movie.model.index(
        function success(data) {
          var indexHtml = Movie.view.index(data);

          // set the HTML in the content div
          $content.html(indexHtml);
        },
        function error() {
          // TODO: what will you do when an error occurs?
          // Display a message somewhere?
          // What parameters are passed to this anonymous function?
          //   - read the jQuery docs
          //   - use console.log() to confirm
          // See: https://api.jquery.com/jQuery.ajax/
        }
      );
    },

    new: function () {
      // TODO: implement
    },

    show: function () {
      // TODO: implement
    },
    edit: function () {
      // TODO: implement
    },
    destroy: function () {
      // TODO: implement
    }
  },
  // the following object contains methods related to generating the View - ie, the HTML:
  view: {
    // this maps directly to the `index` route (remember the 7 RESTful routes?)
    index: function (movies) {
      var html = `
        <h1>Movies</h1>
        <ul>
      `;
      console.log(movies);

      for(var i = 0; i < movies.length ; i++) {
        // TODO: fill this in properly!
        // For example:
        //   - add buttons to view, edit & delete this movie
        //   - on each button, you can add an `onclick` attribute that calls the relevant method on `Movies.controller`
        html += `<li><a href="/movies/${movies[i]._id}">${movies[i].title}</a></li>`;
      }
      html += `</ul>`;

      return html;
    },
    // generate the HTML to edit an existing Movies
    edit: function () {
      // TODO: implement
    },

    new: function () {
      // TODO: implement
    }
  },

  // the following object contains model-related methods
  // ie AJAX calls to implement the relevant RESTful methods:
  model: {
    // this maps to the `index` route
    // see jQuery docs for `success` and `error` callbacks:
    //  https://api.jquery.com/jQuery.ajax/
    index: function (success, error) {
      $.ajax({
        method: 'GET',
        dataType: 'json',
        url: '/movies',
        success: success,
        error: error
      });
    },
    new: function (success, error) {
      $.ajax({
        method: 'GET',
        dataType: 'json',
        url: '/movies/new',
        success: success,
        error: error
      });
    },
    show: function (id, success, error) {
      $.ajax({
        method: 'GET',
        dataType: 'json',
        url: `/movies/${id}`,
        success: success,
        error: error
      });
    },
    create: function (data, success, error) {
      $.ajax({
        method: 'POST',
        dataType: 'json',
        url: '/movies',
        data: data,
        success: success,
        error: error
      });
    },
    update: function (data, success, error) {
      $.ajax({
        method: 'PUT',
        dataType: 'json',
        url: `/movies/${data.id}`,
        data: data,
        success: success,
        error: error
      });
    },
    destroy: function (id, success, error) {
      $.ajax({
        method: 'DELETE',
        url: `/movies/${id}`,
        success: success,
        error: error
      });
    }
  }
};
