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
module.exports.User   = sequelize.import(__dirname + '/user_model');
module.exports.Dino   = sequelize.import(__dirname + '/dino_model');
module.exports.School = sequelize.import(__dirname + '/school_model');
module.exports.Note   = sequelize.import(__dirname + '/note_model');
module.exports.Page   = sequelize.import(__dirname + '/page_model');
module.exports.Text   = sequelize.import(__dirname + '/text_model');
module.exports.Path   = sequelize.import(__dirname + '/path_model');
module.exports.Oval   = sequelize.import(__dirname + '/oval_model');
module.exports.Rect   = sequelize.import(__dirname + '/rect_model');


/*
  describe relationships here, automatically adds foriegn key but may also
  be added with m.Model.relation(m.Relative, { foreignKey: "relative_id"});
*/


(function(m) {
  // User
  m.User.hasMany(m.Note);
  m.User.hasMany(m.Dino);
  m.User.hasMany(m.School);

  // Dino (this is a class ex: CSCI430)
  m.Dino.hasMany(m.User);

  // School 
  m.School.hasMany(m.User);

  // Note
  m.Note.belongsTo(m.User);
  m.Note.hasMany(m.Page);

  // Page
  m.Page.belongsTo(m.Note);
  m.Page.hasMany(m.Text);
  m.Page.hasMany(m.Path);
  m.Page.hasMany(m.Oval);
  m.Page.hasMany(m.Rect);

  // Drawing Objects
  m.Text.belongsTo(m.Page);
  m.Path.belongsTo(m.Page);
  m.Oval.belongsTo(m.Page);
  m.Rect.belongsTo(m.Page);

})(module.exports);

// export connection
module.exports.sequelize = sequelize;
