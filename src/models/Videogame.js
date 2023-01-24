/* eslint-disable new-cap */
const {DataTypes} = require('sequelize');
const {v4: uuidv4} = require('uuid');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
      'videogame',
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: () => uuidv4(),
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.STRING(1000),
          allowNull: false,
        },
        background_image: {
          type: DataTypes.STRING,

          allowNull: false,
        },
        launch_date: {
          type: DataTypes.DATEONLY,

          allowNull: false,
        },

        rating: {
          type: DataTypes.INTEGER,

          validate: {
            min: 0,
            max: 5,
          },
        },
        platforms: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false,
        },
      },
      {timestamps: false},
  );
  sequelize.models.videogame.associate = (models) => {
    sequelize.models.videogame.belongsToMany(models.Genre, {
      through: 'videogame_genres',

      as: 'genres',
      foreignKey: 'videogameId',
    });
  };
};
