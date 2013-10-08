module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Oval", {

    x_pos: DataTypes.INTEGER
    y_pos: DataTypes.INTEGER
    x_size: DataTypes.INTEGER
    y_size: DataTypes.INTEGER
  });
}
