module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Path", {

    x_pos: DataTypes.INTEGER,
    y_pos: DataTypes.INTEGER,
    value: DataTypes.TEXT     // Under mysql, stored off table
  });
}
