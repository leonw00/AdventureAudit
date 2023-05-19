/* istanbul ignore file */
const AppError = require('../errors');

// eslint-disable-next-line no-unused-vars
const appError = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      type: 'Validator Error',
      errorCode: 400,
      message: error.details,
    });
  }

  if (error.code === 'ER_DUP_ENTRY') {
    return res.status(400).json({
      type: 'Duplicate Entry Error',
      errorCode: 400,
      message: error.sqlMessage,
    });
  }

  if (error.code === 'ER_NO_REFERENCED_ROW_2') {
    return res.status(400).json({
      type: 'Foreign Key Constraint Error',
      errorCode: 400,
      message: error.sqlMessage,
    });
  }

  if (error instanceof AppError) {
    return res.status(400).json({
      errorCode: 400,
      message: error.message,
    });
  }

  return res.status(500).send({ error: 'something went wrong' });
};

module.exports = appError;
