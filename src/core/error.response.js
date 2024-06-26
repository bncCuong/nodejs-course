/** @format */

'use strict';

const { httpStatusCode } = require('../utils');

const _statusCode = {
  FORBIDDEN: 403,
  CONFLICT: 409,
};
const reasonStatusCode = {
  FORBIDDEN: 'Bad request error',
  CONFLICT: 'Conflict error',
};
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
} // kế thừa Erorr của nodejs

class ConfligRequestError extends ErrorResponse {
  constructor(
    message = reasonStatusCode.CONFLICT,
    statusCode = _statusCode.CONFLICT
  ) {
    super(message, statusCode);
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message = reasonStatusCode.CONFLICT,
    statusCode = _statusCode.CONFLICT
  ) {
    super(message, statusCode);
  }
}

class AuthFailureError extends ErrorResponse {
  constructor(
    message = httpStatusCode.ReasonPhrases.UNAUTHORIZED,
    statusCode = httpStatusCode['StatusCodes'].UNAUTHORIZED
  ) {
    super(message, statusCode);
  }
}

class NotFound extends ErrorResponse {
  constructor(
    message = httpStatusCode.ReasonPhrases.NOT_FOUND,
    statusCode = httpStatusCode.StatusCodes.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}
class ForbiddenError extends ErrorResponse {
  constructor(
    message = httpStatusCode.ReasonPhrases.FORBIDDEN,
    statusCode = httpStatusCode.StatusCodes.FORBIDDEN
  ) {
    super(message, statusCode);
  }
}
module.exports = {
  BadRequestError,
  ConfligRequestError,
  AuthFailureError,
  NotFound,
  ForbiddenError,
};
