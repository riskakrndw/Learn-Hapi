// impor berkas routes.js dan handler.js agar NotesHandler dapat digunakan
const NotesHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "notes",
  version: "1.0.0",
  register: async (server, { service }) => {
    // instance dari class NotesHandler
    const notesHandler = new NotesHandler(service);

    // mendaftarkan routes yang sudah dibuat pada server Hapi
    server.route(routes(notesHandler));
  },
};
