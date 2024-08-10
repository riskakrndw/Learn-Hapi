const ClientError = require("./ClientError");

//  class NotFoundError yg mewarisi class ClientError
class NotFoundError extends ClientError {
  constructor(message) {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

module.exports = NotFoundError;
