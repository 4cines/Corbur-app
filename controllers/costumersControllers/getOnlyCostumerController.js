const selectOnlyCostumerQuery = require("../../db/querys/costumersQueries/selectOnlyCostumerQuery");
const { generateError } = require("../../helpers");

const getOnlyCostumerController = async (req, res, next) => {
  try {
    const idCostumer = req.params.id;

    const costumerData = await selectOnlyCostumerQuery(idCostumer);

    if (costumerData.length === 0) {
      return generateError(`El cliente/a no existe.`);
    }

    res.send({
      status: 200,
      message: "Costumer data",
      data: [costumerData],
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getOnlyCostumerController;
