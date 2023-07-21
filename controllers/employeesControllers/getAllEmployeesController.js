const selectAllEmployeesQuery = require("../../db/querys/employeesQueries/selectAllEmplyeesQuery");
const { generateError } = require("../../helpers");

const getAllEmployeesController = async (req, res, next) => {
  try {
    const employeesData = await selectAllEmployeesQuery();

    if (employeesData.length === 0) {
      return generateError(`Lista de empleados vacia`);
    }
    res.send({
      status: 200,
      message: `Lista de empleados`,
      data: employeesData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getAllEmployeesController;
