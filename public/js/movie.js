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

        }
      );
    },


//-------------------------------------------------------------------------
    new: function () {
      var $content = $('#content');
      var newHtml = Movie.view.new();

      $content.html(newHtml);

    },

//----------------------------------------------------------------------
    create: function (form) {
      var createdMovie = {
        title: form.title.value,
        genre: form.genre.value,
        releaseYear: form.releaseYear.value
      };

      Movie.model.create(
        createdMovie,
        function success() {
          Movie.controller.index();
        },
        function error(err) {
          console.log('ERROR: err:', err);
          $('#error-message').html(err.responseJSON.message);
        }
      );
    },


//--------------------------------------------------------------------------

    show: function () {
      // TODO: implement
    },


//---------------------------------------------------------------------------
    edit: function (movieId) {
      var $content = $('#content');

      Movie.model.show(
        movieId,
        function success(data) {
          var showHtml = Movie.view.edit(data);

          // set the HTML in the content div
          $content.html(showHtml);
        },
        function error(err) {
          $('#error-message').html(err.responseJSON.message);
        }
      );
    },
    update: function (form) {
      var updatedMovie = {
        id: form.movieId.value,
        title: form.title.value,
        genre: form.genre.value,
        releaseYear: form.releaseYear.value
      };

      Movie.model.update(
        updatedMovie,
        function success() {
          Movie.controller.index();
        },
        function error(err) {
          console.log('ERROR: err:', err);
          $('#error-message').html(err.responseJSON.message);
        }
      );
    },

  //------------------------------------------------------------------------
    destroy: function (movieId) {
      Movie.model.destroy(
        movieId,
        function success() {
          Movie.controller.index();
        },
        function error(err) {
          $('#error-message').html(err.responseJSON.message);
        }
      );
    }
  },

  //===========================VIEW=======================================//

  // the following object contains methods related to generating the View - ie, the HTML:
  view: {
    // this maps directly to the `index` route (remember the 7 RESTful routes?)
    index: function (movies) {
      var html = `
        <h1>Movies</h1>
        <ul>

      `;

      html += `<button onclick="Movie.controller.new()" type="button">Add new</button>`;

      for(var i = 0; i < movies.length ; i++) {
        // TODO: fill this in properly!
        // For example:
        //   - add buttons to view, edit & delete this movie
        //   - on each button, you can add an `onclick` attribute that calls the relevant method on `Movies.controller`
        html += `
          <li>
            <a href="/movies/${movies[i]._id}">${movies[i].title}</a>
            <button onclick="Movie.controller.edit('${movies[i]._id}')" type="button">edit</button>
            <button onclick="Movie.controller.destroy('${movies[i]._id}')">delete</button>
          </li>
        `;
      }
      html += `</ul>`;



      return html;
    },
    // generate the HTML to edit an existing Movies
    edit: function (movie) {
      return `
        <h1>Edit movie</h1>

        <form name="editMovie">
          <input type="hidden" name="movieId" value="${movie._id}">

          <label for="title">Title</label>
          <input id="title" name="title" value="${movie.title}">


          <label for="genre">Genre</label>
          <select name="genre" id=genre value="${movie.genre}">
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="thriller">Thriller</option>
            <option value="romance">Romance</option>
          </select>

          <label for="releaseYear">Release year</label>
          <input id="releaseYear" name="releaseYear" value="${movie.releaseYear}">

          <button onclick="Movie.controller.update(editMovie)" type="button">Update</button>
        </form>
      `;
    },

//--------------------------------------------------------------------------------
    new: function () {
      var newHtml =  `
      <h1>Add movie</h1>

      <form name="editMovie">
        <input type="hidden" name="movieId">

        <label for="title">Title</label>
        <input id="title" name="title">


        <label for="genre">Genre</label>
        <select name="genre" id=genre>>
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="thriller">Thriller</option>
          <option value="romance">Romance</option>
        </select>

        <label for="releaseYear">Release year</label>
        <input id="releaseYear" name="releaseYear">

        <button onclick="Movie.controller.update(editMovie)" type="button">Update</button>
      </form>
    `;

      return newHtml;
    }
    //------------------------------------------------------------------------
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
