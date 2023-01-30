/* eslint-disable max-len */
/* eslint-disable camelcase */
const {Videogame, videogame_genres} = require('..//db.js');


const updateGame = async (id, game) => {
  try {
    const responseDb = await Videogame.findByPk(id);
    if (!game.name) return 'You must set a game name';
    if (!game.description) return 'You must set a game description';
    if (!game.launch_date) return 'You must set a release date';
    if (!game.rating || game.rating < 1 || game.rating > 5) {
      return 'You must set a rating between 1 and 5 for this game';
    }
    if (!game.platforms.length) {
      return 'You must set at least one genre for this game';
    }
    if (!game.genres.length) {
      return 'You must set at least one genre for this game';
    }

    if (responseDb) {
      await Videogame.update({name: game.name, description: game.description,
        launch_date: game.launch_date,
        rating: game.rating, platforms: game.platforms}, {
        where: {
          id: responseDb.dataValues.id,
        },
      });

      await videogame_genres.destroy({where: {videogameId: responseDb.dataValues.id}});

      game.genres.forEach(async (element) => {
        await videogame_genres.create({
          videogameId: responseDb.dataValues.id,
          genreId: element,
        });
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error.message;
  }
};
module.exports = updateGame;
