/* eslint-disable camelcase */
const {Videogame} = require('..//db.js');

const axios = require('axios');
const {API_KEY} = process.env;

const getGamesById = async (arg) => {
  if (arg.length < 36) {
    try {
      const responseApi = await axios.get(
          `https://api.rawg.io/api/games/${arg}?key=${API_KEY}`,
      );
      const {
        id,
        name,
        description,
        background_image,
        released,
        rating,
        platforms,
        genres,
      } = responseApi.data;
      const game = {};
      game.id = id;
      game.name = name;
      game.description = description.replace(/<(?:.|\n)*?>/gm, '');
      game.background_image = background_image;
      game.launch_date = released;
      game.rating = parseInt(rating);
      game.platforms = platforms.map((platform) => platform.platform.name);
      game.genres = genres.map((genres) => genres.name);

      return game;
    } catch (error) {
      return error.message;
    }
  } else {
    try {
      const responseDb = await Videogame.findByPk(arg);
      if (responseDb) {
        const genres = await responseDb.getGenres();
        const genresId = genres.map((genre) => genre.name);
        responseDb.dataValues.genres = genresId;
        return responseDb;
      }
      return 'Game not found';
    } catch (error) {
      return error.message;
    }
  }
};

module.exports = getGamesById;
