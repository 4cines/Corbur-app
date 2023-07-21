const getDB = require("./../../getDB");

const updateEmployeerQuery = async (name, lastName, id) => {
  let connection;

  try {
    connection = await getDB();

    await connection.query(
      `UPDATE employees SET name = ?, lastName = ? WHERE id = ?`,
      [name, lastName, id]
    );

    // if (name) {
    //   await connection.query(`UPDATE employee SET name = ? WHERE id = ?`, [
    //     name,
    //     idCostumer,
    //   ]);
    // }

    // if (lastName) {
    //   await connection.query(`UPDATE employee SET lastName = ? WHERE id = ?`, [
    //     lastName,
    //     idCostumer,
    //   ]);
    // }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateEmployeerQuery;
