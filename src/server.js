const Hapi = require("@hapi/hapi");
// [delete old code] const routes = require('./routes');

// import nilai notes plugin dan NotesService
const notes = require("./api/notes");
const NotesService = require("./services/inMemory/NotesService");

const init = async () => {
  // membuat instance dari NotesService
  const notesService = new NotesService();

  const server = Hapi.server({
    port: 3000,
    host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  // [delete old code] server.route(routes);

  // mendaftarkan plugin notes dengan options.service bernilai notesService
  await server.register({
    plugin: notes,
    options: {
      service: notesService,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
