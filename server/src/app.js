/* eslint-disable no-console */
/* istanbul ignore file */
const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { config } = require('./config/config');
const appError = require('./middleware/appError');
const routes = require('./routes');

const appUrl = config.APP_URL;
const port = config.PORT || 8000;

const app = express();

app.options('*', cors());
app.use(cors());

app.use(
  // eslint-disable-next-line no-unused-vars
  morgan('combined', { skip: (req, res) => process.env.NODE_ENV === 'test' }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, async () => {
    console.log(`Server is up on port ${appUrl}:${port}`);
    try {
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });
}

app.use(appError);

module.exports = app;
