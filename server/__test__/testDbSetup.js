const { dbConfig } = require('../src/models/db');

async function setUpCountryDB() {
  const pool = await dbConfig();
  const statement = `
    INSERT INTO country
        (country_id, country_code, name, currency)
    VALUES
        (1, 'KR', 'Republic of Korea', '￦'),
        (2, 'CA', 'Canada', '$'),
        (3, 'ID', 'Indonesia', 'Rp');
    `;
  await pool.promise().query(statement);
}

async function setUpTransactionDB() {
  const pool = await dbConfig();
  const statement = `
    INSERT INTO transaction
        (transaction_id, trip_id, name, amount, category_id, transaction_date, description)
    VALUES
        (1, 1, 't1', 100, 1, '2022-02-01T12:00:00', 'description1'),
        (2, 2, 't2', 1000, 2, '2021-05-06T13:11:00', 'description2'),
        (3, 3, 't3',  1, 1, '2022-01-03T14:12:00', 'description3'),
        (4, 2, 't4', 50, 3, '2021-05-10T15:13:30', 'description4'),
        (5, 6, 't5', 100, 1, '2022-04-29T16:24:00', 'description5'),
        (6, 6, 't6', 10000, 2, '2022-04-30T17:25:10', 'description6'),
        (7, 6, 't7', 50, 2, '2022-05-01T18:06:00', 'description7'),
        (8, 6, 't8', 1, 2, '2022-05-02T19:47:00', 'description8'),
        (9, 6, 't9', 100, 1, '2022-05-03T20:38:00', 'description9'),
        (10, 6, 't10', 60, 1, '2022-12-06T21:59:59', 'description10');
    `;
  await pool.promise().query(statement);
}

async function setUpCategoryDB() {
  const pool = await dbConfig();
  const statement = `
    INSERT INTO category
        (category_id, trip_id, name, colour, icon)
    VALUES 
        (1, 1, 'c1', '#D6C1E7', 'icon1'),
        (2, 1, 'c2', '#EECB96', 'icon2'),
        (3, 1, 'c3', '#D6C1E7', 'icon3'),
        (4, 2, 'c4', '#EECB96', 'icon4'),
        (5, 2, 'c5', '#EECB96', 'icon5'),
        (6, 3, 'c6', '#EECB96', 'icon5');
    `;
  await pool.promise().query(statement);
}

async function setUpTripDB() {
  const pool = await dbConfig();
  const statement = `
    INSERT INTO trip 
        (trip_id, name, budget, country_id, start_date_time, end_date_time) 
    VALUES 
        (1, 'trip_1', 10, 3, '2023-01-01', '2023-04-03'),
        (2, 'trip_2', 150, 2, '2023-04-05', '2023-04-07'),
        (3, 'trip_3', 200, 3, '2023-06-01', '2023-06-15'),
        (4, 'trip_4', 150, 1, '2022-12-12', '2022-12-31'),
        (5, 'trip_5', 100000, 1, '2022-07-12', '2022-07-15'),
        (6, 'trip_6', 100000, 2, '2022-04-28', '2022-04-30'),
        (7, 'trip_7', 100000, 2, '2022-01-09', '2022-01-20');
    `;
  await pool.promise().query(statement);
}

async function setUpUserDB() {
  const pool = await dbConfig();
  const statement = `
    INSERT INTO user 
        (user_id, name, country_id, email_id) 
    VALUES 
        (1, 'name1', 1,'test1@gmail.com'),
        (2, 'name2', 2,'test2@gmail.com'),
        (3, 'name3', 3,'test3@gmail.com');
    `;
  await pool.promise().query(statement);
}

async function setUpGroupDB() {
  const pool = await dbConfig();
  const statement = `
    INSERT INTO \`group\`
        (trip_id, user_id, leader)
    VALUES
        (1, 1, 1),
        (2, 1, 1),
        (3, 1, 1),
        (4, 1, 1),
        (5, 1, 1),
        (6, 1, 1),
        (6, 3, 0),
        (7, 1, 1);
    `;
  await pool.promise().query(statement);
}

async function setUpPayerDB() {
  const pool = await dbConfig();
  const statement = `
    INSERT INTO payer
        (transaction_id, user_id, payedForTransaction)
    VALUES
        (1, 1, 1),
        (2, 1, 1),
        (2, 2, 0),
        (2, 3, 0),
        (3, 1, 1),
        (4, 1, 0),
        (4, 2, 1),
        (4, 3, 0),
        (5, 1, 1),
        (5, 2, 0),
        (5, 3, 0),
        (6, 1, 1),
        (6, 3, 0),
        (7, 1, 1),
        (8, 1, 1),
        (9, 1, 1),
        (10, 1, 1);
    `;
  await pool.promise().query(statement);
}

async function setUpInviteDB() {
  const pool = await dbConfig();
  const statement = `
    INSERT INTO invite
        (trip_id, user_id, inviter_id)
    VALUES
        (1, 2, 1),
        (2, 2, 1),
        (3, 2, 1),
        (4, 2, 1),
        (5, 2, 1),
        (5, 3, 1),
        (6, 3, 1),
        (7, 3, 1);
    `;
  await pool.promise().query(statement);
}

async function tearDownCountryDB() {
  const pool = await dbConfig();
  await pool.promise().query('DELETE FROM country');
}

async function tearDownTransactionDB() {
  const pool = await dbConfig();
  await pool.promise().query('DELETE FROM transaction');
}

async function tearDownCategoryDB() {
  const pool = await dbConfig();
  await pool.promise().query('DELETE FROM category');
}

async function tearDownTripDB() {
  const pool = await dbConfig();
  await pool.promise().query('DELETE FROM trip');
}

async function tearDownUserDB() {
  const pool = await dbConfig();
  await pool.promise().query('DELETE FROM user');
}

async function tearDownGroupDB() {
  const pool = await dbConfig();
  await pool.promise().query('DELETE FROM `group`');
}

async function tearDownPayerDB() {
  const pool = await dbConfig();
  await pool.promise().query('DELETE FROM payer');
}

async function tearDownInviteDB() {
  const pool = await dbConfig();
  await pool.promise().query('DELETE FROM invite');
}

module.exports = {
  setUpCountryDB,
  setUpTransactionDB,
  setUpCategoryDB,
  setUpTripDB,
  setUpUserDB,
  setUpGroupDB,
  setUpPayerDB,
  setUpInviteDB,
  tearDownCountryDB,
  tearDownTransactionDB,
  tearDownCategoryDB,
  tearDownTripDB,
  tearDownUserDB,
  tearDownGroupDB,
  tearDownPayerDB,
  tearDownInviteDB,
  dbConfig,
};
