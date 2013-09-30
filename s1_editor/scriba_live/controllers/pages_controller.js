/*
 * This is the pages controller which serves views from views/pages/*.hbs
 */


/*
 * GET note page.
 */

exports.welcome = function(req, res) {
  res.render('pages/welcome', { title: 'Express' });
};


/*
 * GET note page.
 */

exports.home = function(req, res) {
  res.render('pages/home', { title: 'Express' });
};


/*
 * GET note page.
 */

exports.note = function(req, res) {
  res.render('pages/note', { title: 'Express' });
};