var crypto = require('crypto');

/*
  This is the users controller which controls user-related data
*/


/*
  GET list of (multiple) users in JSON.
*/


exports.index = function(req, res){
  // try $.get('/users', { ids: [1,2,3] }, function(response) {console.log(response)})
  // you can use req.body.ids to get the passed ids

  // query database for user
  req.app.get('db').User.findAll().success(function(users){
    // if no errors, send users (users == zero length array if no matches)

    res.send({
      users: users
    });

  }).error(function(error){
    // if error, send error w/ request params

    res.send({
      success: false,
      error: error
    });
  });

};

/*
  GET (single) user in JSON
*/

exports.show = function(req, res){
 // try $.get('/users/1', function(response) {console.log(response)}) in javascript console

  // query database for user
  req.app.get('db').User.find(req.params.id).success(function(user){
    // if no errors, send user (user == null if it doesn't exist)
    res.send({
      success: true,
      user: user
    });

  }).error(function(error){
    // if error, send error w/ request params

    res.send({
      success: false,
      error: error
    });
  });

}

/*
  POST create new user & return result
*/

exports.create = function(req, res) {
  // try $.post('/users', { username: 'ajgilzean', password: 'hello', first_name: 'Adam', last_name: 'Gilzean', email: 'ajgilzean@gmail.com'}, function(response) {console.log(response)}) in javascript console
  // you can use req.body.name / req.body.email to get passed name / email.

  // To create a user you must get the db out of the app object "req.app.get('db')"
  // you then reference the User model and call .create({ paramaters})
  // .success( function(user) { ... }) is called on a success and the created user is passed
  // .error(funciton(error) { ... }) is called when an error occurs and the error is passed

  // Check whether password and confirmation match before proceeding
  if(req.body.password != req.body.password_confirmation) {
    res.send({
      success: false,
      error: "Your passwords did not match"
    })
  }

  var new_user;
  new_user = req.app.get('db').User.build({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hashAndSalt(req.body.password)
  });
  
  // Runs through validations as well
  new_user.save().success(function(user) {
    // if successfully inserted into database
    res.send({
      success: true,
      user: user
    });
  }).error(function(error){
    // if an error occurs
    res.send({
      success: false,
      error: error
    });
  });
}


/*
  POST update existing (single) user
*/

exports.update = function(req, res) {
  // try $.post('/users/1', { first_name: 'Mike', last_name: 'Jones', email: 'mikejones@gmail.com'}, function(response) {console.log(response)}) in javascript console
  // you can use req.body.name / req.body.email to get passed name / email.

  // fetch user
  req.app.get('db').User.find(req.params.id).success(function(user) {

    // if user exists
    if (user) {

      // try to update user
      user.updateAttributes({
        //ask Blaine to help with these
        //username: req.body.username,
        //password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
      }).success(function(user) {
        // if successfully updated in database
        res.send({
          success: true,
          user: user
        });

      }).error(function(error){
        // if an error occurs

        res.send({
          success: false,
          error: error
        });

      });
    }
  }).error(function(error){
    // in the error / failure callback function return error

    res.send({
      success: false,
      error: error
    });
  });
}


/*
  DELETE destroy existing (single) user
*/

exports.destroy = function(req, res) {
  // try: $.ajax({ url: '/users/1', type: 'DELETE' }, function(response){ console.log(response)}) in the javascript console
  // in the url: '/users/1' the '1' is the id of the user to be destroyed, if he doesn't exist anymore then it will throw
  // an error. Try creating a user then deleting him.

  // fetch user
  req.app.get('db').User.find(req.params.id).success(function(user) {

    // if user exists
    if (user) {

      // attempt to destroy user
      user.destroy().success(function(user) {
        // if successfully deleted

        res.send({
          success: true,
          user: user
        });

      }).error(function(error){
        // if an error occurs

        res.send({
          success: false,
          error: error
        });

      });
    }

  }).error(function(error){
    // in the error / failure callback function return error

    res.send({
      success: false,
      error: error
    });
  });
}

// Private functions for user management actions

var md5 = function(string) {
  return crypto.createHash('md5').update(string).digest('hex');
}

var generateSalt = function() {
  var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
  var salt = '';

  for(var i = 0; i < 10; i++) {
    var p = Math.floor(Math.random() * set.length);
    salt += set[p];
  }
  return salt;
}

var hashAndSalt = function(password) {
  var salt = generateSalt();
  return (salt + (md5(password + salt)));
}
