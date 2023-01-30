/* eslint-disable max-len */
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
          type: DataTypes.STRING(60),
          allowNull: false,
          unique: true,
          validate: {
            len: [4, 60]},
        },
        description: {
          type: DataTypes.STRING(1000),
          allowNull: false,
          validate: {
            len: [8, 1000]},
        },
        background_image: {
          type: DataTypes.STRING,

          allowNull: false,
        },
        launch_date: {
          type: DataTypes.DATEONLY,

          allowNull: false,
          validate: {
            isDate: true,
          },
        },

        rating: {
          type: DataTypes.INTEGER,

          validate: {
            min: 1,
            max: 5,
          },
        },
        platforms: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false, validate: {
            isArray: true,
            len: [1],
            isStringArray: (value) => {
              for (let i = 0; i < value.length; i++) {
                if (typeof value[i] !== 'string') {
                  throw new Error(`Element at index ${i} is not a string`);
                }
              }
            },

          },
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
