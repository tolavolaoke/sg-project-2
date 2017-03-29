# Sparta Global Webdev4 Project 2: Movies and Reviews

## Synopsis
This project uses a rMVC approach and utilises HTTP requests. It allows the creation of new movies and reviews and also updates the database so the user can add, delete, edit their favourite movies and only create reviews.


## Motivation

This project was undertaken to solidify understand of HTTP methods and how this works server side and client side

## Installation

To use this app:
* Clone the [repository](https://github.com/tolaoke/sg-project-2.git)
* In the command line `npm install` (this will install all the necessary dependancies stored in the `package.json` file)
* To use locally you will need to run the seed file (pre-created data for movies and reviews) with this command in the terminal `npm run seed`.
* In order to spin up the server the following command must be inputted to the terminal `npm run nodemon`.

## Functions
* In order to create a movie enter a title, genre, image link from google, select the genre and release year date in the New movie form, and press create. Similar to this to create a review enter the name, comment and rating.
* The app allows the user to edit and delete their movies


##Technologies Used
* The server is running with [`node.js`](https://nodejs.org/en/)
* The database used is [`MongoDb`](https://www.mongodb.com/)
* The model is processed via `mongod`.
* The views are generated via [`AJAX`](https://developer.mozilla.org/en-US/docs/AJAX)
* The app is built with HTML and CSS
* Animations are controlled via CSS
* The apps behaviours (eg click events) are handle via [`jQuery`](https://jquery.com/) and installed via [`bower`](https://bower.io/)

## Deployment
* Deployed on heroku https://movierevs.herokuapp.com/

## Contributors

[Asma Chaima](https://github.com/achaima)
[Tola Olaoke](https://github.com/tolaoke)
