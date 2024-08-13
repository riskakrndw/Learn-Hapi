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

  postNoteHandler(request, h) {
    // validator
    this._validator.validateNotePayload(request.payload);

    // mendapatkan value dari body request
    const { title = "untitled", body, tags } = request.payload;

    // call function addNote
    const noteId = this._service.addNote({ title, body, tags });

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

  getNotesHandler() {
    console.log("aaaaa 1");
    const notes = this._service.getNotes();
    console.log("aaaaa 2==", notes);
    return {
      status: "success",
      data: {
        notes,
      },
    };
  }

  getNoteByIdHandler(request, h) {
    // get value id note dari path parameter
    const { id } = request.params;

    const note = this._service.getNoteById(id);

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

  putNoteByIdHandler(request, h) {
    // validator
    console.log("tesss 1");
    this._validator.validateNotePayload(request.payload);

    console.log("tesss 2");
    const { id } = request.params;

    console.log("tesss 3");
    this._service.editNoteById(id, request.payload);

    console.log("tesss 4");
    return {
      status: "success",
      message: "Catatan berhasil diperbarui",
    };
    //
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

  deleteNoteByIdHandler(request, h) {
    const { id } = request.params;
    this._service.deleteNoteById(id);
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
