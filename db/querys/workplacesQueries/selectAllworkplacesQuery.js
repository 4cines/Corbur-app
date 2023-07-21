const getDB = require("../../getDB");

const selectAllWorkPlacesQuery = async () => {
  let connection;
  try {
    connection = await getDB();

    const [workplacesData] = await connection.query(`SELECT * FROM workplaces`);

    return workplacesData;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllWorkPlacesQuery;
