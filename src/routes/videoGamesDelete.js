/* eslint-disable new-cap */
const express = require('express');
const {

  deleteGame,

} = require('../controllers/index.js');

const videoGamesDelete = express.Router();


videoGamesDelete.delete('/delete/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const result = await deleteGame(id);
    return result ? res.status(200)
        .send('Game deleted successfully') :
       res.status(404)
           .send('Game not found');
  } catch (error) {
    return error.message;
  }
});

module.exports = {
  videoGamesDelete,
};

