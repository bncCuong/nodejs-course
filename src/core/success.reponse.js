/** @format */
"use strict";
//Dựa theo ngữ cảnh- context của 1 team, 1 bussines doanh nghiệp mà thiết kế ra 1 succsess response

const _statusCode = {
  OK: 200,
  CREATED: 201,
};

const _reasonStatusCode = {
  OK: "Success",
  CREATED: "Created",
};

class succsessReponse {
  constructor({
    message,
    statusCode = _statusCode.OK,
    reasonStatusCode = _reasonStatusCode.OK,
    metadata = {},
  }) {
    this.message = !message ? reasonStatusCode : message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res, headers = {}) {
    return res.status(this.status).json(this);
  }
}

class OK extends succsessReponse {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}

class CREATED extends succsessReponse {
  constructor({
    message,
    statusCode = _statusCode.CREATED,
    reasonStatusCode = _reasonStatusCode.CREATED,
    metadata,
    options = {},
  }) {
    super({ message, statusCode, reasonStatusCode, metadata });
    this.options = options;
  }
}

module.exports = { OK, CREATED, succsessReponse };
