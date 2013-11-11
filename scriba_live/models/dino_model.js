module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Dino", {
  	year:                  DataTypes.STRING,
    semester:              DataTypes.STRING,
    department:            DataTypes.STRING, 
    course:                DataTypes.STRING, 
    instructor_first_name: DataTypes.STRING,
    instructor_last_name:  DataTypes.STRING,
  });
}
