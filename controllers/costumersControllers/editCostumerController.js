const selectOnlyCostumerQuery = require("../../db/querys/costumersQueries/selectOnlyCostumerQuery.js");
const updateCostumerQuery = require("../../db/querys/costumersQueries/updateCostumerQuery.js");
const { generateError } = require("../../helpers.js");

const editCostumerController = async (req, res, next) => {
  try {
    const { name, lastName, address, phone } = req.body;
    const { id: idCostumer } = req.params;

    const [costumerData] = await selectOnlyCostumerQuery(idCostumer);

    if (costumerData.length === 0) {
      return generateError(`El cliente/a no existe.`);
    }

    await updateCostumerQuery(name, lastName, address, phone, idCostumer);

    res.send({
      status: 200,
      message: `Cliente/a actualizado con éxito`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = editCostumerController;
