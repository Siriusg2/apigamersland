/* eslint-disable new-cap */
const {DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
      'genre',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING(60),
          allowNull: false, validate: {
            len: [1, 60],
          },
        },
      },
      {timestamps: false},
  );
  sequelize.models.genre.associate = (models) => {
    sequelize.models.genre.belongsToMany(models.videogame, {
      through: 'videogame_genres',

      as: 'videogames',
      foreignKey: 'genreId',
    });
  };
};
