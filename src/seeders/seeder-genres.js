/* eslint-disable linebreak-style */
const {Genre} = require('../db');

const genres = [
  {name: 'Racing'},
  {name: 'Shooter'},
  {name: 'Adventure'},
  {name: 'Action'},
  {name: 'RPG'},
  {name: 'Fighting'},
  {name: 'Puzzle'},
  {name: 'Strategy'},
  {name: 'Arcade'},
  {name: 'Simulation'},
  {name: 'Sports'},
  {name: 'Card'},
  {name: 'Family'},
  {name: 'Board Games'},
  {name: 'Educational'},
  {name: 'Casual'},
  {name: 'Indie'},
  {name: 'Platformer'},
  {name: 'Massively Multiplayer'},
];

module.exports = async function() {
  return await Genre.bulkCreate(genres);
};
