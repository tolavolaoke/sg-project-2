// define a globally-available object, which stores all functions related to a Movies
// Note: this is a singleton, so we are following the convention of giving a singleton an init capital letter.
var Movie = {

 //=============================CONTROLLER================================//
  controller: {

//------------------------------------------------------------------------
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
        imageHref: form.imageHref.value,
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

    show: function (movieId) {
      Movie.model.show(
      movieId,
      function success(data) {
        var showHtml = Movie.view.show(data);

        $('#content').html(showHtml);
      },
      function error(err) {
        $('#error-message').html(err.responseJSON.message);
      }
    );
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

//----------------------------------------------------------------------------
    update: function (form) {
      var updatedMovie = {
        id: form.movieId.value,
        title: form.title.value,
        genre: form.genre.value,
        imageHref: form.imageHref.value,
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
// this maps directly to the `index` route (remember the 7 RESTful routes?)
  view: {
//VIEW
    index: function (movies) {
      var html = `
        <h1>Movies</h1>
        <button id="" onclick="Movie.controller.new()" type="button">Add new</button>
        <ul>`;


      for(var i = 0; i < movies.length ; i++) {
        html += `
          <li>
            <a href="#" class="title" onclick="Movie.controller.show('${movies[i]._id}')">${movies[i].title}<br><img class="movieThumbnail" src="${movies[i].imageHref}"></a>
            <br>
            <button id="button1" onclick="Movie.controller.edit('${movies[i]._id}')" type="button">Edit</button>
            <button id="button2" onclick="Movie.controller.destroy('${movies[i]._id}')" type="button">Delete</button>
          </li>
        `;
      }
      html += `</ul>`;

      return html;
    },

//EDIT
    edit: function (movie) {
      return `
        <h1>Edit movie</h1>
        <button id="back" onclick="Movie.controller.index()" type="button">Back</button>

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

          <label for="image">Image</label>
          <input id="image" name="imageHref" value="${movie.imageHref}">

          <label for="releaseYear">Release year</label>
          <input id="releaseYear" name="releaseYear" value="${movie.releaseYear}">

          <button onclick="Movie.controller.update(editMovie)" type="button">Update</button>
        </form>
      `;
    },

//SHOW
    show: function(movie) {
      var html = `
          <h2>Show Movie</h2>
          <button id="back" onclick="Movie.controller.index()" type="button">Back</button>

          <p><strong>Title:</strong> ${movie.title}</p>
          <img class="movieThumbnail" src="${movie.imageHref}">
          <p><strong>Genre:</strong> ${movie.genre}</p>
          <p><strong>Release:</strong> ${movie.releaseYear}</p>

          <p><strong>Reviews:</strong></p>
          <ul>
        `;

      for (var i = 0; i < movie.reviews.length; i++) {
        html += `
            <li>
              <em>${movie.reviews[i].name}<em>
              ${movie.reviews[i].comment}<br>
               ${movie.reviews[i].rating}
            </li>
          `;
      }


      html += `  <h1>Add Review</h1>

        <form name="addReview">
          <input type="hidden" name="movieId" value="${movie._id}">

          <label for="name">Name</label>
          <input id="name" name="name">

          <label for="comment">Comment</label>
          <input id="comment" name="commentt">

          <label for="rating">Rating</label>
          <select id=rating name="rating">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <button onclick="Review.controller.create(addReview)" type="button">Create</button>
        </form>`;

      return html;
    },



//NEW
    new: function () {
      var newHtml =  `
      <h1>Add movie</h1>
        <button id="back" onclick="Movie.controller.index()" type="button">Back</button>

      <form name="newMovie">
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


        <label for="imageHref">Image</label>
        <input id="imageHref" name="imageHref">

        <label for="releaseYear">Release year</label>
        <input id="releaseYear" name="releaseYear">

        <button onclick="Movie.controller.create(newMovie)" type="button">Create</button>
      </form>
    `;

      return newHtml;
    }
  },


    //================================MODEL=================================//


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
