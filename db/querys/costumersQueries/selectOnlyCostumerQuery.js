const getDB = require("../../getDB");

const selectOnlyCostumerQuery = async (idCostumer) => {
  let connection;

  try {
    connection = await getDB();

    const [costumerData] = await connection.query(
      `SELECT * FROM costumers WHERE id = ?`,
      [idCostumer]
    );

    return costumerData;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectOnlyCostumerQuery;
