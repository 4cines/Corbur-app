const getDB = require("./../../getDB");

const updateCostumerQuery = async (
  name,
  lastName,
  address,
  phone,
  idCostumer
) => {
  let connection;

  try {
    connection = await getDB();

    if (name) {
      await connection.query(`UPDATE costumers SET name = ? WHERE id = ?`, [
        name,
        idCostumer,
      ]);
    }

    if (lastName) {
      await connection.query(`UPDATE costumers SET lastName = ? WHERE id = ?`, [
        lastName,
        idCostumer,
      ]);
    }

    if (address) {
      await connection.query(`UPDATE costumers SET address = ? WHERE id = ?`, [
        address,
        idCostumer,
      ]);
    }

    if (phone) {
      await connection.query(`UPDATE costumers SET phone = ? WHERE id = ?`, [
        phone,
        idCostumer,
      ]);
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateCostumerQuery;
