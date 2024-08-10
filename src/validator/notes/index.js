const InvariantError = require("../../exceptions/InvariantError");
const { NotePayloadSchema } = require("./schema");

const NotesValidator = {
  // untuk melakukan validasi dan mengevaluasi berhasil atau tidak
  validateNotePayload: (payload) => {
    // call function NotePayloadSchema
    const validationResult = NotePayloadSchema.validate(payload);
    // check apakah validationResult return error
    if (validationResult.error) {
      // menggunakan custom error
      // throw new Error(validationResult.error.message);
      throw new InvariantError(validationResult.error.message);
    }
  },
};

// ekspor objek NotesValidator agar dapat digunakan pada file lain
module.exports = NotesValidator;
