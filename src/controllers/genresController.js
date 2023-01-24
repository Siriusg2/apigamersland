const {Genre} = require('..//db');

const getGenres = async () => {
  try {
    const resultDb = await Genre.findAll();

    return resultDb.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = getGenres;
