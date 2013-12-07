// Define what a user is, perform various validation tasks

module.exports = function(sequelize, DataTypes) {
  var UserModel = sequelize.define("User", {

    first_name: {
      type: DataTypes.STRING,
      validate: {
        notNull: true
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notNull: true
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
        notNull: { args: true, msg: "Email cannot be blank" },
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: true
      }
    }
  });
  return UserModel;
}
/* Columns added by sequelize:
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL
*/
