module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Note", {

    title: DataTypes.STRING/*,

    // foreign keys
    user_id: {
      type: DataTypes.INTEGER, // is an integer
      references: 'User', // which references a User model
      referencesKey: 'id' // where Note.user_id == User.id
    }*/
  });
}