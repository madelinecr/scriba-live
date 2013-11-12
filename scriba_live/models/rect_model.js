module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Rect", {

    x_pos: DataTypes.INTEGER,
    y_pos: DataTypes.INTEGER,
    x_size: DataTypes.INTEGER,
    y_size: DataTypes.INTEGER
  });
}
/* Columns added by sequelize:
  `id` INTEGER PRIMARY KEY AUTOINCREMENT
  `created_at` DATETIME NOT NULL
  `updated_at` DATETIME NOT NULL
  `page_id` INTEGER
*/
