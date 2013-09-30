/*
 * This is the users controller which controls user-related data
 */


/*
 * GET list of (multiple) users in JSON.
 */

exports.index = function(req, res){
  // try $.get('/users', { ids: [1,2,3] }, function(response) {console.log(response)})
  // you can use req.body.ids to get the passed ids

  // users
  var users = [
    { id: 1,
      name: 'Joe',
      email: 'joe@gmail.com' },
    { id: 2,
      name: 'Sally',
      email: 'sally@gmail.com' },
    { id: 3,
      name: 'Matt',
      email: 'matt@gmail.com' }
  ];

  // place users in data object with success set to true
  var data = {
    users: users,
    success: true
  }

  res.send(data);
};

/*
 * GET (single) user in JSON
 */

exports.show = function(req, res){
 // try $.get('/users/1', function(response) {console.log(response)}) in javascript console

  // this is a single object containing user info
  var user = {
    id: req.params.id,
    name: 'Joe',
    email: 'joe@gmail.com'
  }

  // place user in data object with success set to true
  var data = {
    user: user,
    success: true
  }

  res.send(data);
};

/*
 * POST create new user & return result
 */

exports.create = function(req, res) {
  // try $.post('/users', { name: 'mike', email: 'mike@gmail.com'}, function(response) {console.log(response)}) in javascript console
  // you can use req.body.name / req.body.email to get passed name / email.

  // create placeholder user object
  var user = {
    name: req.body.name,
    email: req.body.email
  }

  // validate & save new user to db

  // return user data w/ success set to true
  var data = {
    user: user,
    success: true
  }

  res.send(data);
}

exports.update = function(req, res) {
  // try $.post('/users', { name: 'mike', email: 'mike@gmail.com'}, function(response) {console.log(response)}) in javascript console
  // you can use req.body.name / req.body.email to get passed name / email.

  // create placeholder user
  var user = {
    name: req.body.name,
    email: req.body.email
  }

  // validate placeholder & update user in db

  // return user data w/ success set to true
  var data = {
    user: user,
    success: true
  }

  res.send(data);
}