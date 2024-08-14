const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const { mapDBToModel } = require("../../utils/index");

class NotesService {
  constructor() {
    // inisialisasi properti this._pool dengan instance dari package pg.Pool.
    this._pool = new Pool();
  }

  // fungsi dan parameter sama persis seperti yang ada pada inMemory -> NotesService
  // ditambah async karena fungsi query() berjalan secara asynchronous
  async addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    // objek query untuk memasukan notes baru ke database
    const query = {
      text: "INSERT INTO notes VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
      values: [id, title, body, tags, createdAt, updatedAt],
    };

    // Untuk mengeksekusi query yang sudah dibuat
    const result = await this._pool.query(query); // ditambah await karena fungsi query() berjalan secara asynchronous

    // untuk make sure apakah sudah berhasil dimasukan ke db
    if (!result.rows[0].id) {
      throw new InvariantError("Catatan gagal ditambahkan");
    }

    return result.rows[0].id;
  }

  async getNotes() {
    // query get all
    const result = await this._pool.query("SELECT * FROM notes");

    // Kembalikan nilai result.rows yang telah di mapping dengan fungsi mapDBToModel
    return result.rows.map(mapDBToModel);
  }

  async getNoteById(id) {
    const query = {
      text: "SELECT * FROM notes WHERE id = $1",
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Catatan tidak ditemukan");
    }

    return result.rows.map(mapDBToModel)[0];
  }

  async editNoteById(id, { title, body, tags }) {
    const updatedAt = new Date().toISOString();

    // query untuk mengubah note di dalam database berdasarkan id yang diberikan
    const query = {
      text: "UPDATE notes SET title = $1, body = $2, tags = $3, updated_at = $4 WHERE id = $5 RETURNING id",
      values: [title, body, tags, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Gagal memperbarui catatan. Id tidak ditemukan");
    }
  }

  async deleteNoteById(id) {
    console.log("pg 1");
    const query = {
      text: "DELETE FROM notes WHERE id = $1 RETURNING id",
      values: [id],
    };
    console.log("pg 2");

    const result = await this._pool.query(query);
    console.log("pg 3==", result.rows.length);

    if (!result.rows.length) {
      console.log("masuk ke not found");
      throw new NotFoundError("Catatan gagal dihapus. Id tidak ditemukan");
    }
  }
}

module.exports = NotesService;
