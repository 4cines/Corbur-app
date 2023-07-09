const getDB = require("../../getDB");
const { generateError } = require("../../../helpers");

const insertUserQuery = async (name, password, rol) => {
  let connection;

  try {
    connection = await getDB();

    let [users] = await connection.query(`SELECT * FROM users`);

    if (users.length !== 0) {
      return generateError(`El usuario ${name} ya existe.`);
    }

    await connection.query(
      `INSERT INTO users (name, password, rol) VALUES (?, ?, ?)`,
      [name, password, rol]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertUserQuery;
