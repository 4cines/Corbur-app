const getDB = require("../../getDB");

const insertCostumerQuery = async (name, lastName, phone, address) => {
  let connection;

  try{
      connection = await getDB();

      await connection.query(
          `INSERT INTO costumers (name, lastName, address, phone) VALUES (?, ?, ?, ?)`, [name, lastName, address, phone]
      )
  }finally{
      if(connection) connection.release();
  }
};

module.exports = insertCostumerQuery;
