module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Dino", {

    department:            DataTypes.STRING,
    course:                DataTypes.STRING,
    instructor_first_name: DataTypes.STRING,
    instructor_last_name:  DataTypes.STRING,
    days:                  DataTypes.INTEGER,
    start_time:            DataTypes.FLOAT,
    end_time:              DataTypes.FLOAT

    /*
      Here is how days of the week are stored,

        S M T W R F S
        0 1 0 1 0 1 0 = 42 in binary

      So when days==42, this means that class is scheduled for MWF
    */

  });
}
/* Columns added by sequelize:
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `school_id` INTEGER
*/
