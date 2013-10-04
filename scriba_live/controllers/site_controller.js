/*
  This is the pages controller which serves views from views/pages/*.hbs
*/


/*
  GET note page.
*/

exports.welcome = function(req, res) {
  res.render('site/welcome', { title: 'Express' });
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

exports.note = function(req, res) {
  res.render('site/note', { title: 'Express' });
};