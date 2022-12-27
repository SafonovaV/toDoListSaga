const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Case extends Model {
    static associate({ User }) {
      Case.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  Case.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Case',
    }
  );
  return Case;
};
