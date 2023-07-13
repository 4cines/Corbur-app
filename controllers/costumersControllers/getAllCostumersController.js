const selectAllCostumersQuery = require("../../db/querys/costumersQueries/selectAllCostumersQuery");

const getAllCostumersController = async (req, res, next) => {
  try {
    const costumers = await selectAllCostumersQuery();
    res.send({
      status: "ok",
      data: costumers,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getAllCostumersController;
