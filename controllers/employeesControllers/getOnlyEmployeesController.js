const selectAllEmployeesQuery = require("../../db/querys/employeesQueries/selectAllEmplyeesQuery");
const selectOnlyEmployeesQuery = require("../../db/querys/employeesQueries/selectOnlyEmployeeQuery");
const { generateError } = require("../../helpers");

const getOnlyEmployeesController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employeeData = await selectOnlyEmployeesQuery(id);

    if (employeeData.length === 0) {
      return generateError(`El empleado/a no existe.`);
    }

    res.send({
      status: 200,
      data: employeeData,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getOnlyEmployeesController;
