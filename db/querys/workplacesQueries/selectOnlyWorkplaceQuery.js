const getDB = require("../../getDB");

const selectOnlyWorkPlaceQuery = async (id) => {
  let connection;
  try {
    connection = await getDB();

    const [workplaceData] = await connection.query(
      `SELECT * FROM workplaces WHERE id = ?`,
      [id]
    );

    return workplaceData;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectOnlyWorkPlaceQuery;
