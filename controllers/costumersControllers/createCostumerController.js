const insertCostumerQuery = require("../../db/querys/costumersQueries/insertCostumerQuery");
const selectAllCostumersQuery = require("../../db/querys/costumersQueries/selectAllCostumersQuery");
const { generateError } = require("../../helpers");

const createCostumerController = async (req, res, next) => {
  try {
    const { name, lastName, phone, address } = req.body;

    const cosumersData = await selectAllCostumersQuery(name);

    if (cosumersData.find((costumer) => costumer.name === name)) {
      return generateError(`El cliente/a ${name} ya existe.`);
    }

    await insertCostumerQuery(name, lastName, phone, address);

    res.send({
      status: "ok",
      message: `Cliente/a ${name} creado con éxito`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = createCostumerController;
