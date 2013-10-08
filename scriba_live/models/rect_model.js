module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Rect", {

    x_pos: DataTypes.INTEGER
    y_pos: DataTypes.INTEGER
    x_size: DataTypes.INTEGER
    y_size: DataTypes.INTEGER
  });
}
