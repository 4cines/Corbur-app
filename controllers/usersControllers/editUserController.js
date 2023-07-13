const selectOnlyUserQuery = require("../../db/querys/usersQueries/selectOnlyUserQuery.js.js");
const updateUserQuery = require("../../db/querys/usersQueries/updateUserQuery.js");
const { generateError } = require("../../helpers.js");

const editUserController = async (req, res, next) => {
  try {
    const { userName, password, rol } = req.body;
    const { id: idUser } = req.params;

    const userData = await selectOnlyUserQuery(idUser);

    if (userData.length === 0) {
      return generateError(`El usuario/a no existe.`);
    }

    await updateUserQuery(userName, password, rol, idUser);

    res.send({
      status: 200,
      message: `Usuario/a se ha actualizado con éxito`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = editUserController;
