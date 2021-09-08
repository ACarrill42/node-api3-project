function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);

  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const {id} = req.params;

  if(id === req.user) {
    res.status(200).json(req.user)
  }else {
    res.status(404).json({message: 'user not found'})
  }

  next();
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC

  next();
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC

  next();
}

// do not forget to expose these functions to other modules
module.exports = {logger, validateUser, validateUserId, validatePost};