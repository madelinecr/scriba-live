module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Page", {

    page_index: DataTypes.INTEGER
  });
}
/* Columns added by sequelize:
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `note_id` INTEGER
*/
