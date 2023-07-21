const getDB = require("../../getDB");

const insertWorkPlaceQuery = async ({
  idCostumer,
  name,
  adress,
  totalBudgeted,
  totalBilled,
  totalPaid,
  financialGain,
}) => {
  let connection;
  try {
    connection = await getDB();

    await connection.query(
      `INSERT INTO workplaces (idCostumer, name, adress, totalBudgeted, totalBilled, totalPaid, financialGain) VALUES (?,?,?,?,?,?,?)`,
      [
        idCostumer,
        name,
        adress,
        totalBudgeted,
        totalBilled,
        totalPaid,
        financialGain,
      ]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertWorkPlaceQuery;
