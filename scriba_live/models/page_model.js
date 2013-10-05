module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Page", {

    order: DataTypes.INTEGER
  });
}
