const { generateError } = require("../../helpers");
const selectOnlyWorkPlaceQuery = require("../../db/querys/workplacesQueries/selectOnlyWorkplaceQuery");

const getOnlyWorkplacesController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const workplaceData = await selectOnlyWorkPlaceQuery(id);

    if (workplaceData.length === 0) {
      return generateError(`El trabajo con id ${id} no existe`);
    }

    res.send({
      status: 200,
      data: workplaceData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getOnlyWorkplacesController;
