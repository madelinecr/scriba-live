/*
  This is the pages controller which serves views from views/pages/*.hbs
*/


/*
  GET welcome page.
*/

exports.welcome = function(req, res) {
  res.render('site/welcome', { title: 'Express' });
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





