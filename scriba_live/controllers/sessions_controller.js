var crypto = require('crypto');

exports.show = function(req, res) {
  if(req.session.user) {
    res.send(200);
  } else {
    res.send(400);
  }
}

exports.create = function(req, res) {
  if(req.body.signin_email) {
    req.app.get('db').User.find({
      where: {
        email: req.body.signin_email
      }
    }).success(function(user) {
      if(verifyPassword(req.body.signin_password, user.password)) {
        res.cookie('email', user.email);
        res.cookie('pass', user.password);
        req.session.user = user;
        res.send(user, 200);
      } else {
        res.send(400);
      }
    }).error(function(error) {
      res.send({
        success: false,
        error: error
      })
    });
  } else {
    res.send(400);
  }
};

exports.destroy = function(req, res) {
  if(!req.session.user) {
    res.send(400);
  } else {
    req.session.user = null;
    res.cookie('email',  null);
    res.cookie('password', null);
    res.send(200);
  }
};

// Private functions for user management actions

var md5 = function(string) {
  return crypto.createHash('md5').update(string).digest('hex');
}

var verifyPassword = function(password, hashed_pass) {
  var salt = hashed_pass.substr(0, 10);
  var valid_hash = (salt + md5(password + salt));
  if(hashed_pass === valid_hash) {
    return true;
  } else {
    return false;
  }
}
