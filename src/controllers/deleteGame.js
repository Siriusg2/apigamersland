/* eslint-disable camelcase */
const {Videogame} = require('..//db.js');


const deleteGames = async (id) => {
  try {
    const responseDb = await Videogame.findByPk(id);


    if (responseDb) {
      await Videogame.destroy({where: {id: responseDb.dataValues.id}});
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error.message;
  }
};
module.exports = deleteGames;
