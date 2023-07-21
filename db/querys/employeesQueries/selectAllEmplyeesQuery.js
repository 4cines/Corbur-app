const getDB = require("../../getDB");

const selectAllEmployeesQuery = async () => {
  let connection;
  try {
    connection = await getDB();

    const [employeesData] = await connection.query(`SELECT * FROM employees`);

    return employeesData;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllEmployeesQuery;
