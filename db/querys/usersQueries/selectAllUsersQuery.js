const getDB = require("../../getDB");
const { generateError } = require("../../../helpers");

const selecAlltUsersQuery = async () => {
  let connection;

  try {
    connection = await getDB();

    const [users] = await connection.query(`SELECT * FROM users`);

    return users;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selecAlltUsersQuery;
