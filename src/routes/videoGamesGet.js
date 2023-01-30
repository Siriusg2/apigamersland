/* eslint-disable new-cap */

const express = require('express');
const {
  getGames,
  getGamesByName,
  getGamesById,
} = require('../controllers/index.js');

const videoGamesGet = express.Router();

videoGamesGet.get('/', async (req, res) => {
  const {name} = req.query;
  if (!name) {
    try {
      const result = await getGames();

      return result.length ?
        res.status(200).send(result) :
        res.status(404).send('No games to display');
    } catch (error) {
      return error.message;
    }
  } else {
    try {
      const result = await getGamesByName(name);

      return result.length ?
        res.status(200).send(result) :
        res.status(404).send('No games to display');
    } catch (error) {
      return error.message;
    }
  }
});
videoGamesGet.get('/:id', async (req, res) => {
  const {id} = req.params;

  try {
    const result = await getGamesById(id);
    return Object.keys(result).length ?
      res.status(200).send(result) :
      res.status(404).send('Juego no encontrado');
  } catch (error) {
    return error.message;
  }
});
module.exports = {
  videoGamesGet,
};
