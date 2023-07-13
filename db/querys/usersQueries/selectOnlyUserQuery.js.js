const getDB = require("./../../getDB");

const selectOnlyUserQuery = async (idUser) => {
  let connection;

  try {
    connection = await getDB();

    const [userInfo] =  await connection.query(`SELECT * FROM users WHERE id = ?`, [idUser]);

    return userInfo;

  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectOnlyUserQuery;
