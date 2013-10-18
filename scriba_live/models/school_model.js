module.exports = function(sequelize, DataTypes) {
  return sequelize.define("School", {

    title: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING, 
    country: DataTypes.STRING     

  });
}
