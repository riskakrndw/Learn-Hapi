class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
  }

  async postUserHandler(request, h) {
    console.log("tes 1");
    this._validator.validateUserPayload(request.payload);
    console.log("tes 2");
    const { username, password, fullname } = request.payload;
    console.log("tes 3");

    const userId = await this._service.addUser({
      username,
      password,
      fullname,
    });

    console.log("tes 4");

    const response = h.response({
      status: "success",
      message: "User berhasil ditambahkan",
      data: {
        userId,
      },
    });

    console.log("tes 5");
    response.code(201);
    return response;
  }

  async getUserByIdHandler(request, h) {
    console.log("get 1");
    const { id } = request.params;
    console.log("get 2");
    const user = await this._service.getUserById(id);
    console.log("get 3");

    return {
      status: "success",
      data: {
        user,
      },
    };
  }
}

module.exports = UsersHandler;
