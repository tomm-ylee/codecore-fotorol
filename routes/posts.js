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
      res.redirect('/posts');
    });

});

// Posts#index PATH: /posts/ VERB: GET
// Doing a GET should on posts a listing of all the posts.
router.get('', (req, res) => {
  knex
    .select()
    .from('posts')
    .orderBy('created_at', 'DESC')
    // In this then, variable posts is the return of everything previous. ie,
    // all the returned rows from the query. NOTE, posts here is an array of objects.
    .then(posts => {
      // res.send(posts); // Good execution during developmnent
      res.render('posts/index', {posts});
    });
});

// Posts#show PATH: /posts/:id VERB: GET
// Display a single post from the db
router.get('/:id', (req, res, next) => {
  // Paths that have ':' in their name will be stored as a key value in req.params
  // 'params' is a keyword. Use it to get the 'id' of a post.
  console.log(req.params);
  const postId = req.params.id;

  if (isNaN(parseInt(postId, 10))) res.redirect('/');

  knex
    .first()
    .from('posts')
    .where({id: postId})
    .then(post => {
      res.render('posts/show', {post});
    })

});


module.exports = router;
