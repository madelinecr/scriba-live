module.exports = function(sequelize, DataTypes) {
  return sequelize.define("School", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
  
    title: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING, 
    country: DataTypes.STRING     

  });
}
