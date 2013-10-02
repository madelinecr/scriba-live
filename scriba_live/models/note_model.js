module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Note", {

    title: DataTypes.STRING
  });
}