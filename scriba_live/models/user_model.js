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
      validate: {
        isEmail: true,
        notNull: { args: true, msg: "Email cannot be blank" },
        isUnique: function(value, next) {
          UserModel.find({
            where: {email: value},
            attributes: ['id']
          }).done(function(error, user) {
            if(error) {
              return next(error);
            }
            if(user) {
              return next('Email address already in use!');
            }
            next();
          });
        }
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
