/* eslint-disable camelcase */
const {Videogame, Op} = require('..//db.js');

const axios = require('axios');
const {API_KEY} = process.env;

const getGamesbyName = async (word) => {
  try {
    let responseDb = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${word}%`,
        },
      },
    });

    const videogamesWithGenres = await Promise.all(
        responseDb.map(async (videogame) => {
          const genres = await videogame.getGenres();
          const genresId = genres.map((genre) => genre.id);
          videogame.dataValues.genres = genresId;
          return {
            id: videogame.id,
            name: videogame.name,
            background_image: videogame.background_image,
            genres: videogame.dataValues.genres,
          };
        }),
    );
    responseDb = responseDb.map((game) => {
      return {
        name: game.name,
        background_image: game.background_image,
        genres: game.genres,
      };
    });
    const responseApi = await axios.get(
        `https://api.rawg.io/api/games?search=${word}&key=${API_KEY}`,
    );
    const gamesApi = responseApi.data.results.map(
        ({id, name, background_image, genres}) => ({
          id: id,
          name: name,
          background_image,
          genres: genres.map((genres) => genres.name),
        }),
    );

    const responseToClient = [...videogamesWithGenres, ...gamesApi]
        .sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          const matchA = nameA.includes(word);
          const matchB = nameB.includes(word);
          if (matchA !== matchB) {
            return matchB - matchA;
          } else {
            return nameA > nameB ? 1 : -1;
          }
        })
        .slice(0, 15);

    return responseToClient.length ?
      responseToClient :
      'No hay juegos que contengan la palabra ingresada!';
  } catch (error) {
    return error.message;
  }
};
module.exports = getGamesbyName;
