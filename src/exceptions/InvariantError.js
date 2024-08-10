const ClientError = require("./ClientError");

// class InvariantError yg mewarisi class ClientError
class InvariantError extends ClientError {
  constructor(message) {
    super(message);
    this.name = "InvariantError";
  }
}

module.exports = InvariantError;
