const getDB = require("../../getDB");
const { generateError } = require("../../../helpers");

const selecAlltUsersQuery = async (userName) => {
  let connection;

  try {
    connection = await getDB();

    const [users] = await connection.query(`SELECT * FROM users`, [userName]);

    return users;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selecAlltUsersQuery;
