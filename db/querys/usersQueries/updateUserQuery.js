const getDB = require("./../../getDB");

const updateUserQuery = async (name, password, rol) => {
  let connection;

  try {
    connection = await getDB();

    if (name) {
      await connection.query(`UPDATE users SET name = ?`);
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateUserQuery;
