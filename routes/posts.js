const express = require('express');
const router = express.Router();
// Note, when requiring a directory, node will look for a file named 'index.js'
// inside of it and require that instead.
const knex = require('../db');


// Posts#new PATH: /posts/new VERB: GET
// This route has the responsibility of serving a form for creating new posts
router.get('/new', (req, res) => {
  res.render('posts/new')
});

// Posts#create PATH: /posts/create VERB: POST
// This route has the responsibility of creating posts in the post table
router.post('', (req, res) => {
  const description = req.body.description;
  const pictureUrl = req.body.pictureUrl;
  const username = req.cookies.username;

  knex
    .insert({
      description, pictureUrl, username
    })
    .into('posts')
    .then(() => {
      // Database queries with knex are asynchronous, like setTimeout and
      // setInterval. If you want to write ANY CODE that depends on results
      // from a query, you must do it inside of the callback for 'then'.
      res.redirect('/');
    });

});

// Posts#index PATH: /posts/ VERB: GET
// Doing a GET should on posts a listing of all the posts.
router.get('', (req, res) => {
  knex
    .select()
    .from('posts')
    // In this then, variable posts is the return of everything previous. ie,
    // all the returned rows from the query.
    .then(posts => {
      res.send(posts); // Good execution during developmnent
    });
});


module.exports = router;
