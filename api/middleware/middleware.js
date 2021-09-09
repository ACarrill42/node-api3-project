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
  const user = req.body;

  if (user) {
    res.status(201).json(user)
  } else if (!user.name) {
    res.status(400).json({message: 'missing required name field'});
  }

  next();
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  req.body = req.query.body
  if(!req.body.text) {
    res.status(400).json({message: 'missing required text field'});
  }
  
  next();
}

// do not forget to expose these functions to other modules
module.exports = {logger, validateUser, validateUserId, validatePost};