// const ClientError = require("../../exceptions/ClientError");

class NotesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  async postNoteHandler(request, h) {
    // validator
    this._validator.validateNotePayload(request.payload);

    // mendapatkan value dari body request
    const { title = "untitled", body, tags } = request.payload;

    // call function addNote
    const noteId = await this._service.addNote({ title, body, tags });

    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId,
      },
    });

    response.code(201);
    return response;

    // rm try catch karena implementasi onPreResponse untuk Custom Error
    // try {
    // } catch (error) {
    //   if (error instanceof ClientError) {
    //     const response = h.response({
    //       status: "fail",
    //       message: error.message,
    //     });
    //     response.code(error.statusCode);
    //     return response;
    //   }

    //   // Server ERROR!
    //   const response = h.response({
    //     status: "error",
    //     message: "Maaf, terjadi kegagalan pada server kami.",
    //   });
    //   response.code(502);
    //   return response;
    // }

    // handling error lama
    // catch (error) {
    //   console.log("errrrr==", error);
    //   const response = h.response({
    //     status: "fail",
    //     message: error.message,
    //   });
    //   response.code(400);
    //   return response;
    // }
  }

  async getNotesHandler() {
    const notes = await this._service.getNotes();

    return {
      status: "success",
      data: {
        notes,
      },
    };
  }

  async getNoteByIdHandler(request, h) {
    // get value id note dari path parameter
    const { id } = request.params;

    const note = await this._service.getNoteById(id);

    return {
      status: "success",
      data: {
        note,
      },
    };

    // rm try catch karena implementasi onPreResponse untuk Custom Error
    // try {
    // } catch (error) {
    //   if (error instanceof ClientError) {
    //     const response = h.response({
    //       status: "fail",
    //       message: error.message,
    //     });
    //     response.code(error.statusCode);
    //     return response;
    //   }

    //   // Server ERROR!
    //   const response = h.response({
    //     status: "error",
    //     message: "Maaf, terjadi kegagalan pada server kami.",
    //   });
    //   response.code(500);
    //   console.error(error);
    //   return response;
    // }

    // handling error lama
    // catch (error) {
    //   const response = h.response({
    //     status: "fail",
    //     message: error.message,
    //   });
    //   response.code(404);
    //   return response;
    // }
  }

  async putNoteByIdHandler(request, h) {
    // validator
    this._validator.validateNotePayload(request.payload);

    const { id } = request.params;

    await this._service.editNoteById(id, request.payload);

    return {
      status: "success",
      message: "Catatan berhasil diperbarui",
    };

    // rm try catch karena implementasi onPreResponse untuk Custom Error
    // try {
    // } catch (error) {
    //   // handling error menggunakan custom error
    //   if (error instanceof ClientError) {
    //     const response = h.response({
    //       status: "fail",
    //       message: error.message,
    //     });
    //     response.code(error.statusCode);
    //     return response;
    //   }

    //   // Server ERROR!
    //   const response = h.response({
    //     status: "error",
    //     message: "Maaf, terjadi kegagalan pada server kami.",
    //   });
    //   response.code(500);
    //   console.error(error);
    //   return response;
    // }

    // handling error lama
    // catch (error) {
    //   const response = h.response({
    //     status: "fail",
    //     message: error.message,
    //   });
    //   response.code(404);
    //   return response;
    // }
  }

  async deleteNoteByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteNoteById(id);

    return {
      status: "success",
      message: "Catatan berhasil dihapus",
    };

    // rm try catch karena implementasi onPreResponse untuk Custom Error
    // try {
    // } catch (error) {
    //   if (error instanceof ClientError) {
    //     const response = h.response({
    //       status: "fail",
    //       message: error.message,
    //     });
    //     response.code(error.statusCode);
    //     return response;
    //   }

    //   // Server ERROR!
    //   const response = h.response({
    //     status: "error",
    //     message: "Maaf, terjadi kegagalan pada server kami.",
    //   });
    //   response.code(500);
    //   console.error(error);
    //   return response;
    // }

    // handling error lama
    // catch (error) {
    //   const response = h.response({
    //     status: "fail",
    //     message: error.message,
    //   });
    //   response.code(404);
    //   return response;
    // }
  }
}

module.exports = NotesHandler;
