
/**
 * Module dependencies.
 */

var express = require('express');
var sequelize = require("sequelize");
var controllers  = require('./controllers');
var http = require('http');
var path = require('path');
var hbs = require('hbs');
var io = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = io.listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('hbs', hbs.__express);
app.set('view engine', 'hbs');
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


// VIEW ROUTES (serve actual HTML pages)
// -> PAGES ROUTES
app.get('/', controllers.pages.welcome);
app.get('/home', controllers.pages.home);
app.get('/note', controllers.pages.note);

// JSON ROUTES (serve JSON objects)
// Checks regex for url from top entries down (for get and post individually)

// -> USERS ROUTES
// --> GET
app.get('/users', controllers.users.index);
app.get('/users/:id', controllers.users.show);

// --> POST
app.post('/users', controllers.users.create);
app.post('/users/:id', controllers.users.update);

// -> NOTES ROUTES
// --> GET
app.get('/notes', controllers.notes.index);
app.get('/notes/:id', controllers.notes.show);

// --> POST
//app.post('/notes', controllers.notes.create);
//app.post('/notes/:id', controllers.notes.update);


server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});