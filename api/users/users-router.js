const express = require('express');
const User = require('./users-model');
const middleware = require('../middleware/middleware');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get(req.query)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => next({err}))
});

router.get('/:id', middleware.validateUserId , (req, res,next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id

  User.getById(req.params.id)
    .then(user => {
      if(user) {
        res.status(200).json(user)
      }else {
        res.status(404).json({message: 'user not found'});
      }
    })
    .catch(err => next({err}))
});

router.post('/', middleware.validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid

  User.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(err => next({err}))
});

router.put('/:id', middleware.validateUserId, middleware.validatePost, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  User.update(req.params.id, req.body)
  .then(user => {
    if(user) {
      res.status(200).json(user)
    } else {
      res.status(400).json({message: 'error'})
    }
  })
  .catch(err => next({err}))
});

router.delete('/:id', middleware.validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id

  User.remove(req.params.id)
  .then(user => {
    if (!user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({message: 'error'})
    }
  })
  .catch(err => next({err}))
});

router.get('/:id/posts', middleware.validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id

  User.getUserPosts(req.params.id)
  .then()
  .catch(err => next({err}))
});

router.post('/:id/posts', middleware.validateUser, middleware.validateUserId, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  User.getUserPosts(req.params.id, req.body)
  .then()
  .catch(err => next({err}))
});

// do not forget to export the router
module.exports = router;