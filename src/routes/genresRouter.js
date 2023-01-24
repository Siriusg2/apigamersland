/* eslint-disable new-cap */
const express = require('express');
const getGenres = require('../controllers/genresController');
const genresRouter = express.Router();

genresRouter.get('/', async (req, res) => {
  try {
    const result = await getGenres();
    res.status(200).send(result);
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = {
  genresRouter,
};
