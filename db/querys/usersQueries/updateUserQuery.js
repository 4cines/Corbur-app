const getDB = require("./../../getDB");
const bcrypt = require("bcrypt");

const updateUserQuery = async (name, password, rol, id) => {
  let connection;

  try {
    connection = await getDB();

    if (name) {
      await connection.query(`UPDATE users SET name = ? WHERE id = ?`, [
        name,
        id,
      ]);
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await connection.query(`UPDATE users SET password = ? WHERE id = ?`, [
        hashedPassword,
        id,
      ]);
    }
    if (rol) {
      await connection.query(`UPDATE users SET rol = ? WHERE id = ?`, [
        rol,
        id,
      ]);
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateUserQuery;
