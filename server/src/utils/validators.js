/* eslint-disable newline-per-chained-call */
const Joi = require('joi').extend(require('@joi/date'));

// Request path/body validator
const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });

// Category Body validator
const categoryBodySchema = Joi.object({
  trip_id: Joi.number().integer().min(1).required(),
  name: Joi.string().max(30).required(),
  colour: Joi.string().max(30).required(),
  icon: Joi.string().max(30).required(),
});

// Trip Put Body validator
const tripPutBodySchema = Joi.object({
  name: Joi.string().max(30).required(),
  budget: Joi.number().min(0).required(),
  country_id: Joi.number().integer().min(1).max(252).required(),
  startDateTime: Joi.date().format('YYYY-MM-DD').required(),
  endDateTime: Joi.date().format('YYYY-MM-DD').required(),
});

// Trip Post Body validator
const tripPostBodySchema = Joi.object({
  name: Joi.string().max(30).required(),
  budget: Joi.number().min(0).required(),
  country_id: Joi.number().integer().min(1).max(252).required(),
  startDateTime: Joi.date().format('YYYY-MM-DD').required(),
  endDateTime: Joi.date().format('YYYY-MM-DD').required(),
  user_id: Joi.number().integer().min(1).required(),
});

// User Body validator, used for put and post
const userBodySchema = Joi.object({
  name: Joi.string().max(30).required(),
  country_id: Joi.number().integer().min(1).required(),
  email: Joi.string().email().required(),
});

// Transaction Post Body validator
const transactionPostBodySchema = Joi.object({
  trip_id: Joi.number().integer().min(1).required(),
  name: Joi.string().max(30).required(),
  amount: Joi.number().min(0).required(),
  category_id: Joi.number().integer().min(1).required(),
  transaction_date: Joi.date().iso().required(),
  description: Joi.string().allow('').max(255).required(),
  user_id: Joi.number().integer().min(1).required(),
});

// trip_id path parameter validator
const tripIDPathSchema = Joi.object({
  trip_id: Joi.number().integer().min(1).required(),
});

// category_id path parameter validator
const categoryIDPathSchema = Joi.object({
  category_id: Joi.number().integer().min(1).required(),
});

// user_id path parameter validator
const userIDPathSchema = Joi.object({
  user_id: Joi.number().integer().min(1).required(),
});

// email address path parameter validator
const emailPathSchema = Joi.object({
  address: Joi.string().email().required(),
});

// transaction_id path parameter validator
const transactionIDPathSchema = Joi.object({
  transaction_id: Joi.number().integer().min(1).required(),
});

// Debt query parameter validator
const debtQuerySchema = Joi.object({
  user_id: Joi.number().integer().min(1).required(),
  trip_id: Joi.number().integer().min(1).required(),
});

// Group and delete invite Body validator
const groupInviteBodySchema = Joi.object({
  trip_id: Joi.number().integer().min(1).required(),
  user_id: Joi.number().integer().min(1).required(),
});

// Payer Body validator
const payerBodySchema = Joi.object({
  transaction_id: Joi.number().integer().min(1).required(),
  user_id: Joi.number().integer().min(1).required(),
});

// Post invite validator
const invitePostSchema = Joi.object({
  trip_id: Joi.number().integer().min(1).required(),
  user_id: Joi.number().integer().min(1).required(),
  inviter_id: Joi.number().integer().min(1).required(),
});

// Trip start and end date query validator
const tripDateQuerySchema = Joi.object({
  start_date_time: Joi.date().format('YYYY-MM-DD'),
  end_date_time: Joi.date().format('YYYY-MM-DD'),
});

module.exports = {
  validateCategoryBody: validator(categoryBodySchema),
  validateTripPostBody: validator(tripPostBodySchema),
  validateTripPutBody: validator(tripPutBodySchema),
  validateUserBody: validator(userBodySchema),
  validateCategoryIdPath: validator(categoryIDPathSchema),
  validateTripIdPath: validator(tripIDPathSchema),
  validateUserIdPath: validator(userIDPathSchema),
  validateGroupBody: validator(groupInviteBodySchema),
  validateDeleteInviteBody: validator(groupInviteBodySchema),
  validatePostInviteBody: validator(invitePostSchema),
  validateEmailPath: validator(emailPathSchema),
  validateTransactionPostBody: validator(transactionPostBodySchema),
  validateTransactionIdPath: validator(transactionIDPathSchema),
  validatePayerBody: validator(payerBodySchema),
  validateDebtQuery: validator(debtQuerySchema),
  validateTripDateQuery: validator(tripDateQuerySchema),
};
