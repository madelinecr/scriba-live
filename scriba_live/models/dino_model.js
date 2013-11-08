module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Dino", {
    //school_id:             DataTypes.INTEGER,
    semester:              DataTypes.STRING,
    department:            DataTypes.STRING, 
    course:                DataTypes.STRING, 
    instructor_first_name: DataTypes.STRING,
    instructor_last_name:  DataTypes.STRING,
  });
}
