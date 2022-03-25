const conf = require('../configs');
const mongoose = require('mongoose');

mongoose
  .connect(conf.dbUrl)
  .then(() => {
    console.log(
      '[DATABASE_CONNECTION]: Server connected to mongodb successfully ...'
    );
  })
  .catch((err) => {
    console.error(err);
  });
