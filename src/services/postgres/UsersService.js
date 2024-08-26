const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ username, password, fullname }) {
    console.log("pg 1");
    await this.verifyNewUsername(username);
    console.log("pg 2");

    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10); // Nilai 10 merupakan standar dari saltRounds

    console.log("pg 3");

    const query = {
      text: "INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id",
      values: [id, username, hashedPassword, fullname],
    };

    console.log("pg 4");

    const result = await this._pool.query(query);

    console.log("pg 5");

    if (!result.rows.length) {
      throw new InvariantError("User gagal ditambahkan");
    }

    console.log("pg 6");
    return result.rows[0].id;
  }

  async verifyNewUsername(username) {
    console.log("ssss 1", username);
    const query = {
      text: "SELECT username FROM users WHERE username = $1",
      values: [username],
    };
    console.log("ssss 2");

    const result = await this._pool.query(query);
    console.log("ssss 3===", result.rows);

    if (result.rows.length > 0) {
      console.log("ssss 3.2");
      throw new InvariantError(
        "Gagal menambahkan user. Username sudah digunakan."
      );
    }
    console.log("ssss 4");
  }

  async getUserById(userId) {
    console.log("get db 1");
    const query = {
      text: "SELECT id, username, fullname FROM users WHERE id = $1",
      values: [userId],
    };

    console.log("get db 2");

    const result = await this._pool.query(query);

    console.log("get db 3", result.rows);

    if (!result.rows.length) {
      console.log("get db 4");
      throw new NotFoundError("User tidak ditemukan");
    }
    console.log("get db 5");

    return result.rows[0];
  }
}

module.exports = UsersService;
