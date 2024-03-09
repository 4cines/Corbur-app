require("dotenv").config();

const getDB = require("./getDB");

const createTables = async () => {
  let connection;

  try {
    connection = await getDB();

    console.log("Delete tables...");
    await connection.query("DROP TABLE IF EXISTS workforces");
    await connection.query("DROP TABLE IF EXISTS fuel");
    await connection.query("DROP TABLE IF EXISTS material");
    await connection.query("DROP TABLE IF EXISTS daily_reports");
    await connection.query("DROP TABLE IF EXISTS tasks");
    await connection.query("DROP TABLE IF EXISTS proyects");
    await connection.query("DROP TABLE IF EXISTS employees");
    await connection.query("DROP TABLE IF EXISTS constumers");
    await connection.query("DROP TABLE IF EXISTS users");

    console.log("Create tables...");

    await connection.query(
      "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, password VARCHAR(255) NOT NULL, rol VARCHAR(255) NOT NULL, crated_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)"
    );
    await connection.query(
      "CREATE TABLE costumers (id INT AUTO_INCREMENT PRIMARY KEY, full_name VARCHAR(100) NOT NULL, address VARCHAR(255), phone VARCHAR(20), email VARCHAR(255), DNI VARCHAR(9), crated_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)"
    );
    await connection.query(
      "CREATE TABLE employees (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, crated_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)"
    );
    await connection.query(
      "CREATE TABLE proyects (id INT AUTO_INCREMENT PRIMARY KEY,  id_costumer INT NOT NULL, name VARCHAR(100) NOT NULL, address VARCHAR(255), initial_budget MEDIUMINT NOT NULL, budget_type ENUM(`abierto`, `cerrado`)) NOT NULL, IVA SMALLINT, extras MEDIUMINT, invoice MEDIUMINT, paid MEDIUMINT, state ENUM(`abierto`, `cerrado`) NOT NULL, crated_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, FOREIGN KEY (id_costumer) REFERENCES costumers(id))"
    );
    await connection.query(
      "CREATE TABLE tasks (id INT AUTO_INCREMENT PRIMARY KEY, id_proyect INT NOT NULL, description VARCHAR(255) NOT NULL, date DATE NOT NULL, state ENUM(`abierto`, `cerrado`), crated_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, FOREIGN KEY (id_proyect) REFERENCES proyects(id))"
    );
    await connection.query(
      "CREATE TABLE daily_reports (id INT AUTO_INCREMENT PRIMARY KEY, id_proyect INT NOT NULL, comment VARCHAR(255) NOT NULL, crated_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, FOREIGN KEY (id_proyect) REFERENCES proyects(id))"
    );
    await connection.query(
      "CREATE TABLE material (id INT AUTO_INCREMENT PRIMARY KEY, id_daily_report INT NOT NULL, description VARCHAR(255) NOT NULL, units MEDIUMINT NOT NULL, unit_price MEDIUMINT NOT NULL,crated_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, FOREIGN KEY (id_daily_report) REFERENCES daily_reports(id))"
    );
    await connection.query(
      "CREATE TABLE fuel (id INT AUTO_INCREMENT PRIMARY KEY, id_daily_report INT NOT NULL, cost MEDIUMINT NOT NULL,crated_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, FOREIGN KEY (id_daily_report) REFERENCES daily_reports(id))"
    );
    await connection.query(
      "CREATE TABLE workforces (id INT AUTO_INCREMENT PRIMARY KEY, id_employee INT NOT NULL, id_daily_report INT NOT NULL, euro_hour MEDIUMINT NOT NULL,crated_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, FOREIGN KEY (id_employee) REFERENCES employees(id), FOREIGN KEY (id_daily_report) REFERENCES daily_reports(id))"
    );

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
