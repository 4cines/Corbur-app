const insertEmployeeQuery = require("../../db/querys/employeesQueries/insertEmployeeQuery");
const selectAllEmployeesQuery = require("../../db/querys/employeesQueries/selectAllEmplyeesQuery");
const { generateError } = require("../../helpers");

const createEmployeeController = async (req, res, next) => {
  try {
    const { name, lastName } = req.body;

    if (!name) {
      return generateError("Debe ingresar un nombre");
    }

    const employeesData = await selectAllEmployeesQuery();

    if (employeesData.find((employee) => employee.name === name)) {
      return generateError(`El empleado/a ${name} ya existe.`);
    }

    await insertEmployeeQuery(name, lastName);

    res.send({
      status: 200,
      message: `Empleado/a ${name} creado con éxito`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = createEmployeeController;
