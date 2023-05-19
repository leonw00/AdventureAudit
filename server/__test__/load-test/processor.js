const { faker } = require('@faker-js/faker');

function createUserData(requestParams, ctx, ee, next) {
  ctx.vars.email = faker.internet.email();
  ctx.vars.name = faker.name.fullName();
  ctx.vars.country_id = faker.datatype.bigInt({ min: 1, max: 100 });
  return next();
}

function generateTripData(requestParams, ctx, ee, next) {
  ctx.vars.trip_name = `Trip ${faker.word.adjective()}`;
  ctx.vars.trip_budget = faker.datatype.float({ max: 10000 });
  ctx.vars.country_id = faker.datatype.bigInt({ min: 1, max: 100 });
  ctx.vars.startDateTime = '2023-01-01';
  ctx.vars.endDateTime = '2023-02-02';
  return next();
}

module.exports = {
  createUserData,
  generateTripData,
};
