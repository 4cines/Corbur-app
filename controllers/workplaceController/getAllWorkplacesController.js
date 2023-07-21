const { generateError } = require("../../helpers");
const selectAllWorkPlacesQuery = require("../../db/querys/workplacesQueries/selectAllworkplacesQuery");

const getAllWorkplacesController = async (req, res, next) => {
  try {
    const workplacesData = await selectAllWorkPlacesQuery();

    if (workplacesData.length === 0) {
      return generateError(`No hay trabajos`);
    }
    res.send({
      status: 200,
      data: workplacesData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getAllWorkplacesController;
