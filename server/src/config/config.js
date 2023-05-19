/* istanbul ignore file */
const testEnv = process.env.NODE_ENV === 'test';
const dbHost = testEnv ? process.env.DB_TEST_HOST : process.env.DB_HOST;
const dbUsername = testEnv
  ? process.env.DB_TEST_USERNAME
  : process.env.DB_USERNAME;
const dbPassword = testEnv
  ? process.env.DB_TEST_PASSWORD
  : process.env.DB_PASSWORD;
const dbName = testEnv ? process.env.DB_TEST_NAME : process.env.DB_NAME;
const dbPort = testEnv ? process.env.DB_TEST_PORT : process.env.DB_PORT;

const config = {
  APP_URL: process.env.APP_URL,
  PORT: process.env.PORT,
};

async function configure() {
  return {
    dbHost,
    dbPort,
    dbUsername,
    dbPassword,
    dbName,
  };
}

module.exports = {
  config,
  configure,
};
