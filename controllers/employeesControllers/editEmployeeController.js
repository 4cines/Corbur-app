const selectAllEmployeesQuery = require("../../db/querys/employeesQueries/selectAllEmplyeesQuery");
const selectOnlyEmployeesQuery = require("../../db/querys/employeesQueries/selectOnlyEmployeeQuery");
const updateEmployeerQuery = require("../../db/querys/employeesQueries/updateEmployeeQuery");
const { generateError } = require("../../helpers");

const editEmployeeController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { name, lastName } = req.body;

    const employeeData = await selectOnlyEmployeesQuery(id);

    if (employeeData.length === 0) {
      return generateError(`El empleado/a no existe.`);
    }

    const employeesData = await selectAllEmployeesQuery();

    if (employeesData.find((employee) => employee.name === name)) {
      return generateError(`El empleado/a ${name} ya existe.`);
    }

    await updateEmployeerQuery(name, lastName, id);

    res.send({
      status: 200,
      message: `Empleado/a ${name} actualizado con éxito.`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = editEmployeeController;
