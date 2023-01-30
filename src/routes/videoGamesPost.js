/* eslint-disable camelcase */
/* eslint-disable new-cap */
const express = require('express');
const {
  createGame,

} = require('../controllers/index.js');

const videoGamesPost = express.Router();


videoGamesPost.post('/', async (req, res) => {
  const {name, description, rating, platforms, launch_date, genres} =
      req.body;
  try {
    const result = await createGame(
        name,
        description,
        rating,
        platforms,
        launch_date,
        genres,
    );
    return typeof result !== 'string' ?
        res.status(201).send(result) :
        res.status(200).send(result);
  } catch (error) {
    return error.message;
  }
});


module.exports = {
  videoGamesPost,
};
