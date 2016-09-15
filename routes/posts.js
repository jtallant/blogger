const express = require('express');
const router = express.Router();

// Holds all of our models as keys inside model object
// models.users, models.posts, etc.
const models  = require('../models');

// GET /posts
// show all posts
router.get('/', function(request, response, next) {
  models.posts.findAll({
    include: [models.users]
  }) // default order: modifiedAt
    .then(function(posts) {
      console.log(posts);
      response.render('index', { posts: posts });
    });
});

// GET /posts/new
// create post
router.get('/new', function(request, response, next) {
  response.render('new_post', { post: {} });
});

router.post('/new', function(request, response, next) {
  // We don't have authentication yet and every post
  // requires a userId.
  // Let's find the first user and use the ID of that user
  // for the association.
  models.users.findOne().then(function(user) {
    models.posts.create({
      userId: user.id,
      title: request.body.title,
      body: request.body.body
    }).then(function saved(post) {
      response.redirect('../posts/' + post.id); // GET /posts/:id
    });
  });
});

// GET /posts/:id
// show post
router.get('/:id', function(request, response, next) {
  models.posts.findById(request.params.id)
  .then(function(post) {
    response.render('post', { post: post });
  })
  .catch(function(error) {
    next(error);
  });
});

// GET /posts/:id/edit
// render edit post form
router.get('/:id/edit', function(request, response) {
  models.posts.findById(request.params.id).then(function(post) {
    response.render('edit_post', {
      post: post
    });
  });
});

// POST /posts/:id
// edit post
router.post('/:id/edit', function(request, response) {
  models.posts.findById(request.params.id)
  .then(function(post){
    post.title = request.body.title;
    post.body = request.body.body;
    post.save()
      .then(function(){
        response.redirect('../'); // GET /posts
    });
  });
});


module.exports = router;
