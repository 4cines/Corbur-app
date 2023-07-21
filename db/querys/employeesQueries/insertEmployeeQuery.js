const getDB = require("../../getDB");

const insertEmployeeQuery = async (name, lastname) => {
  let connection;
  try {
    connection = await getDB();

    await connection.query(
      `INSERT INTO employees (name, lastname) VALUES (?, ?)`,
      [name, lastname]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertEmployeeQuery;
