/* eslint-disable camelcase */
const {Videogame} = require('..//db.js');

const axios = require('axios');
const {API_KEY} = process.env;

const getGames = async (page = 1) => {
  try {
    const responseDb = await Videogame.findAll();

    let totalApi = [];
    let pagenumber = 1;
    while (pagenumber < 8) {
      const responseApi = await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&page=${pagenumber}`,
      );
      const gamesApi = responseApi.data.results.map(
          ({
            id,
            name,
            background_image = 'https://i.pinimg.com/originals/3e/5b/31/3e5b31543f93a24ef48e52bc4b55d68c.gif',
            genres,
            rating,
          }) => ({
            id,
            name: name,
            background_image,
            genres: genres.map((genres) => genres.name),
            rating: parseInt(rating),
          }),
      );
      totalApi = [...totalApi, ...gamesApi];
      pagenumber++;
    }
    const videogamesWithGenres = await Promise.all(
        responseDb.map(async (videogame) => {
          const genres = await videogame.getGenres();
          const genresId = genres.map((genre) => genre.name);
          videogame.dataValues.genres = genresId;
          return {
            id: videogame.id,
            name: videogame.name,
            background_image: videogame.background_image,
            genres: videogame.dataValues.genres,
            rating: videogame.rating,
          };
        }),
    );

    const responseToClient = [...videogamesWithGenres, ...totalApi];

    return responseToClient;
  } catch (error) {
    return error.message;
  }
};

module.exports = getGames;
