const getDB = require("../../getDB");

const selectOnlyEmployeesQuery = async (id) => {
  let connection;
  try {
    connection = await getDB();

    const [employeeData] = await connection.query(
      `SELECT * FROM employees WHERE id = ?`,
      [id]
    );

    return employeeData;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectOnlyEmployeesQuery;
