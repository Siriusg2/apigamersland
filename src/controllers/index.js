const getGames = require('.//getGames');
const getGamesById = require('.//getGamesById');
const getGamesByName = require('.//getGamesByName');
const createGame = require('.//createGame');
const getGenres = require('.//genresController');
const deleteGame = require('.//deleteGame');
const updateGame = require('.//updateGame');

module.exports = {
  getGames,
  getGamesById,
  getGamesByName,
  createGame,
  getGenres, deleteGame, updateGame,
};
