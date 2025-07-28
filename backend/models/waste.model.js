module.exports = (sequelize, DataTypes) => {
  const Waste = sequelize.define('Waste', {
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Waste;
};

