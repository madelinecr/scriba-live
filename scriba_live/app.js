
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var jade = require('jade');

var app = express();

var server = http.createServer(app);

app.set('db', require('./models'));
app.set('controllers', require('./controllers'));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('jade', jade.__express);
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// VIEW ROUTES (serve actual HTML site)
// -> SITE ROUTES
app.get('/', app.get('controllers').site.welcome);
app.get('/home', app.get('controllers').site.home);
app.get('/editor', app.get('controllers').site.editor);


// JSON ROUTES (serve JSON objects)
// Checks regex for url from top entries down (for get and post individually)

// app.http_verb('/model', app.get('controllers').model.action)
// -> USERS ROUTES
// --> GET
app.get('/users', app.get('controllers').users.index);
app.get('/users/:id', app.get('controllers').users.show);

// --> POST
app.post('/users', app.get('controllers').users.create);
app.post('/users/:id', app.get('controllers').users.update);

// --> DELETE
app.delete('/users/:id', app.get('controllers').users.destroy);

// -> NOTES ROUTES
// --> GET
app.get('/notes', app.get('controllers').notes.index);
app.get('/notes/:id', app.get('controllers').notes.show);

// --> POST
//app.post('/notes', app.get('controllers').notes.create);
//app.post('/notes/:id', app.get('controllers').notes.update);

// socket io
app.get('controllers').io.listen(server);

// DATABASE
app.get('db').sequelize.sync().complete(function(err) {
  if (err) {
    throw err
  } else {
    server.listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'))
    })
  }
});

