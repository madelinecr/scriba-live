/*
  This is the pages controller which serves views from views/pages/*.hbs
*/


/*
  GET note page.
*/

exports.welcome = function(req, res) {
  if(req.session.user) {
    res.render('site/welcome', { user: req.session.user });
  } else {
    res.render('site/welcome');
  }
};


/*
  GET note page.
*/

exports.home = function(req, res) {
  res.render('site/home', { title: 'Express' });
};


/*
  GET note page.
*/

exports.editor = function(req, res) {
  res.render('site/editor', { title: 'Express' });
};
