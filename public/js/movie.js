// define a globally-available object, which stores all functions related to a Game
// Note: this is a singleton, so we are following the convention of giving a singleton an init capital letter.
var Movie = {
  controller: {
    index: function () {
      var $content = $('#content');

      Movie.model.index(
        function success(data) {
          var html = Movie.view.index(data);

          $content.html(html); // set the HTML in the content div
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
    show: function () {
      // TODO: implement
    },
    new: function () {
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
        <h2>Movies</h2>
        <ul>
      `;

      for(var i = 0; i < movies.length ; i++) {
        // TODO: fill this in properly!
        // For example:
        //   - add buttons to view, edit & delete this game
        //   - on each button, you can add an `onclick` attribute that calls the relevant method on `Game.controller`
        html += `<li>${movies[i].title}</li>`;
      }

      html += `</ul>`;

      return html;
    },
    // generate the HTML to show an existing Game
    show: function () {
      // TODO: implement
    },
    // generate the HTML to create a new Game
    new: function () {
      // TODO: implement
    },
    // generate the HTML to edit an existing Game
    edit: function () {
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
