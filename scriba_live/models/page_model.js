module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Page", {

    page_index: DataTypes.INTEGER
  });
}
