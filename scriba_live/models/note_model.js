module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Note", {

    title: DataTypes.STRING,
    date: DataTypes.DATE
  });
}
/* Columns added by sequelize:
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `created_at` DATETIME NOT NULL, `updated_at` DATETIME NOT NULL,
  `user_id` INTEGER,
  `dino_id` INTEGER
*/
