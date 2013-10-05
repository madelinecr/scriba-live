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
module.exports.Page = sequelize.import(__dirname + '/page_model');
module.exports.Text = sequelize.import(__dirname + '/text_model');

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