const selectOnlyCostumerQuery = require("../../db/querys/costumersQueries/selectOnlyCostumerQuery");
const insertWorkPlaceQuery = require("../../db/querys/workplacesQueries/insertWorkplaceQuery");
const selectAllWorkPlacesQuery = require("../../db/querys/workplacesQueries/selectAllworkplacesQuery");
const { generateError } = require("../../helpers");

const createWorkplaceController = async (req, res, next) => {
  try {
    const {
      idCostumer,
      name,
      adress,
      totalBudgeted,
      totalBilled,
      totalPaid,
      financialGain,
    } = req.body;

    if (!idCostumer || !name) {
      return generateError(
        "Debe ingresar nombre del cliente y nombre del trabajo todos los campos"
      );
    }

    const costumerData = await selectOnlyCostumerQuery(idCostumer);

    if (costumerData.length === 0) {
      return generateError(`El cliente/a no existe.`);
    }

    //workplace name not exists
    const workplacesData = await selectAllWorkPlacesQuery();

    if (
      workplacesData.find(
        (workplace) =>
          workplace.name === name && workplace.idCostumer === idCostumer
      )
    ) {
      return generateError(
        `El trabajo ${name} para el cliente/a con id ${idCostumer} ya existe.`
      );
    }

    await insertWorkPlaceQuery({
      idCostumer,
      name,
      adress,
      totalBudgeted,
      totalBilled,
      totalPaid,
      financialGain,
    });

    res.send({
      status: 200,
      message: `Trabajo ${name} creado con éxito`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = createWorkplaceController;
