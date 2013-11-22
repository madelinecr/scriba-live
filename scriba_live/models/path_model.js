module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Path", {

    x_pos: DataTypes.INTEGER,
    y_pos: DataTypes.INTEGER,
    value: DataTypes.TEXT,     // Under mysql, stored off table
    fill_color: DataTypes.STRING,
    fill_alpha: DataTypes.STRING,
    line_width: DataTypes.STRING,
    line_color: DataTypes.STRING
  });
}
/* Columns added by sequelize:
  `id` INTEGER PRIMARY KEY AUTOINCREMENT
  `created_at` DATETIME NOT NULL
  `updated_at` DATETIME NOT NULL
  `page_id` INTEGER
*/
