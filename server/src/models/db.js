const mysql = require('mysql2');
const { configure } = require('../config/config');

const dbConfig = async () => {
  const result = await configure();
  let pool;
  if (global.poolObject === undefined) {
    pool = mysql.createPool({
      host: result.dbHost,
      password: result.dbPassword,
      user: result.dbUsername,
      database: result.dbName,
      port: result.dbPort,
    });
    global.poolObject = pool;
  } else {
    pool = global.poolObject;
  }
  return pool;
};

module.exports = { dbConfig };
