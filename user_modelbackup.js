// Define what a user is, perform various validation tasks

module.exports = function(sequelize, DataTypes) {
  return sequelize.define("User", {

    username: {
      type: DataTypes.STRING,
//      allowNull: true,
//      validate: {
//        len: [5, 30],
//        is: ["[a-z0-9_]", 'i']
//      }
    },
    first_name: {
      type: DataTypes.STRING,
//      allowNull: true,
//      validate: {
//        len: [2, 20],
//        is: ["[A-Za-z]", 'i']
//      }
    },
    last_name: {
      type: DataTypes.STRING,
//      allowNull: true,
//      validate: {
//        len: [2, 20],
//        is: ["[A-Za-z]", 'i']
//      }
    },
    email: {
      type: DataTypes.STRING,
//      allowNull: true,
//      validate: {
//        isEmail: true,
//      }
    }
  }
);}
 /*, {
    validate: {
      nameValid: function() {
        if ((this.first_name === null) || (this.last_name === null)) {
          throw new Error('Validate failure: Invalid first_name or last_name ')
        }
    /k  },
      usernameValid: function() {
        // check if this username fits the validation requirements
        if (this.username === null) {
          throw new Error('Validate failure: Invalid username')
        }
        // query database to check if this username already exists
        //app.get('db').User.find( { where: {username: this.username} } ).success(function(existing_username){
        sequelize.query("SELECT * FROM Users WHERE username = '" + this.username + "'" ).success(function(existing_username){
          if(existing_username.length > 0){
            throw new Error('This username already exists');
          }
        })
      },
      emailValid: function() {
        // check if this username fits the validation requirements
        if (this.email === null) {
          throw new Error('Validate failure: Invalid email address')
        }
        // query database to check if this email already exists
        //app.get('db').User.find( { where: {email: this.email} } ).success(function(existing_email){
        sequelize.query("SELECT * FROM Users WHERE email = '" + this.email + "'" ).success(function(existing_email){
          if(existing_email.length > 0){
            throw new Error('This email already exists');
          }
        })
      }
    } // end validate  */
//  });

//}
