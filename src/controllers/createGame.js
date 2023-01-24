/* eslint-disable camelcase */
const {Videogame, videogame_genres, Op} = require('../db.js');

const createGame = async (
    name,
    description,
    rating,
    platforms,
    launch_date,
    genres,
    background_image = 'https://i.pinimg.com/originals/3e/5b/31/3e5b31543f93a24ef48e52bc4b55d68c.gif',
) => {
  try {
    const responseDb = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    if (responseDb.length) return 'There is already a game with that name';

    await Videogame.create({
      name: name,
      description: description,
      launch_date: launch_date,
      background_image: background_image,
      rating: rating,
      platforms: platforms,
    });

    const findGamebyName = await Videogame.findAll({
      where: {name: name},
    });

    genres.forEach(async (element) => {
      await videogame_genres.create({
        videogameId: findGamebyName[0].id,
        genreId: element,
      });
    });
    const findGamebyPk = await Videogame.findByPk(findGamebyName[0].id);
    const gameGenres = await findGamebyPk.getGenres();

    const responseToClient = {...findGamebyPk.dataValues};
    responseToClient.genres = gameGenres.map((genre) => genre.id);
    return responseToClient;
  } catch (error) {
    return error.message;
  }
};

module.exports = createGame;
