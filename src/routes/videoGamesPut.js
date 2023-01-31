/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable new-cap */
const express = require('express');
const {
  updateGame,
} = require('../controllers/index.js');

const videoGamesPut = express.Router();


videoGamesPut.put('/update/:id', async (req, res) => {
  const {id} = req.params;
  const game = req.body;
  try {
    const result = await updateGame(id, game);

    if (typeof result === 'string') return res.status(400).send(result);
    if (Object.keys(result).length) return res.status(200).send(result);
    if (!result) return res.status(404).send('Game not found');
  } catch (error) {
    return error.message;
  }
});

module.exports = {
  videoGamesPut,
};
