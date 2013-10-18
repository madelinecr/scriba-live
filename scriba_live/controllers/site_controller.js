/*
  This is the pages controller which serves views from views/pages/*.hbs
*/


/*
  GET welcome page.
*/

exports.welcome = function(req, res) {
  if(req.session.user) {
    res.render('site/welcome', { user: req.session.user });
  } else {
    res.render('site/welcome');
  }
};

/*
  GET profile page.
*/

exports.profile = function(req, res) {
  req.app.get("db").User.find(req.params.id).success(function(user){
    
    res.render('site/profile', { user: user, title: 'Express' } );
  }).error(function(error){

  });
};

/*
  GET editor page.
*/

exports.editor = function(req, res) {
  res.render('site/editor', { title: 'Express' });
};

/*
  GET note page.
*/

exports.note = function(req, res) {
  res.render('site/note', { title: 'Express' });
};
