/*
  This is the pages controller which serves views from views/pages/*.hbs
*/


/*
  GET welcome page.
*/

exports.welcome = function(req, res) {
  if(req.session.user !== undefined) {
    res.render('site/welcome', { user: req.session.user });
  } else {
    res.render('site/welcome');
  }
};

/*
  GET profile page.
*/

exports.profile = function(req, res) {
  console.log("USER999: "+req.session.user.id);
  if (req.session.user !== undefined) {
    res.render('site/profile', { user: req.session.user, title: 'Express' } );
  }
  else {
    console.log('ANON USER ATTEMPTED TO ACCESS SITE WITHOUT CREDENTIALS');
    res.redirect('/');
  }
};

/*
  GET preference page
*/

exports.preferences = function(req, res) {
  if (req.session.user !== undefined) {
    res.redirect('/profile/'+req.session.user.id);
  }
  else {
    console.log('ANON USER ATTEMPTED TO ACCESS SITE WITHOUT CREDENTIALS');
    res.redirect('/');
  }
  //res.render('site/preferences', { user: req.session.user, title: 'Express' });
};


/*
  GET editor page.
*/

exports.editor = function(req, res) {
  if (req.session.user !== undefined) {
    res.render('site/editor', { title: 'Express', dino_id: req.params.dino_id, user: req.session.user });
  }
  else {
    console.log('ANON USER ATTEMPTED TO ACCESS SITE WITHOUT CREDENTIALS');
    res.redirect('/');
  }
};

/*
  GET note page.
*/

exports.note = function(req, res) {
  res.render('site/note', { title: 'Express' });
};
