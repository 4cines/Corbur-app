const getDB = require("../../getDB");

const selectAllCostumersQuery = async () => {
  let connection;
  try {
    connection = await getDB();
    const [costumers] = await connection.query(`SELECT * FROM costumers`);
    return costumers;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllCostumersQuery;
