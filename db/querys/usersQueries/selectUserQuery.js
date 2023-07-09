const getDB = require("../../getDB");
const { generateError } = require("../../../helpers");

const selectUserQuery = async (userName) => {
  let connection;

  try {
    connection = await getDB();

    const [user] = await connection.query(
      `SELECT * FROM users WHERE name = ?`,
      [userName]
    );

    return user;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserQuery;
