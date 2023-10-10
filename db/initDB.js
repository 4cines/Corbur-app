require("dotenv").config();

const getDB = require("./getDB");

const createTables = async () => {
  let connection;

  try {
    connection = await getDB();

    console.log("Delete tables...");
    await connection.query("SET GLOBAL sql_mode=''");
    await connection.query("DROP TABLE IF EXISTS costumers");
    await connection.query("DROP TABLE IF EXISTS employees");
    await connection.query("DROP TABLE IF EXISTS workplaces");
    await connection.query("DROP TABLE IF EXISTS users");

    console.log("Creando tablas...");

// await connection.query 

    console.log("¡Created tables!");
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();

    process.exit();
  }
};

createTables();