/*// http://sequelizejs.com/heroku modified
if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize');
  var sequelize = null;

  // the application is executed on the local machine ... use mysql
  sequelize = new Sequelize('development', 'username', null, {
    dialect: 'sqlite',
    storage: __dirname + '/../db/development.db' // path to sqlite database file
  });

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,

    // add models here, define each in a name_model.js file
    User: sequelize.import(__dirname + '/user_model'),
    Note: sequelize.import(__dirname + '/note_model')
  }


  //  Associations can be defined here. E.g. like this:
  //  global.db.User.hasMany(global.db.SomethingElse)

}

module.exports = global.db*/

// ref: http://architects.dzone.com/articles/sequelize-javascript-orm

var Sequelize = require('sequelize');
//var config    = require('config').database;  // we use node-config to handle environments

// initialize database connection
var sequelize = new Sequelize('development', 'username', null, {
  dialect: 'sqlite',
  storage: __dirname + '/../db/development.sqlite3', // path to sqlite database file

  define: {
    underscored: true
  }
});

// load models
module.exports.User = sequelize.import(__dirname + '/user_model');
module.exports.Note = sequelize.import(__dirname + '/note_model');

/*
  describe relationships here, automatically adds foriegn key but may also
  be added with m.Model.relation(m.Relative, { foreignKey: "relative_id"});
*/


(function(m) {
  // User
  m.User.hasMany(m.Note);

  // Note
  m.Note.belongsTo(m.User);

})(module.exports);

// export connection
module.exports.sequelize = sequelize;