const insertUserQuery = require("../../db/querys/usersQueries/insertUserQuery");

const bcrypt = require("bcrypt");

const { generateError } = require("../../helpers");
const selecAlltUsersQuery = require("../../db/querys/usersQueries/selectAllUsersQuery");

const createUserController = async (req, res, next) => {
  try {
    const { userName, password, rol } = req.body;

    if (!userName || !password || !rol) {
      generateError("Debe ingresar un nombre, una contraseña y el rol");
    }

    const usersData = await selecAlltUsersQuery();

    if (usersData.find((user) => user.name === userName)) {
      return generateError(`El usuario/a ${userName} ya existe.`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await insertUserQuery(userName, hashedPassword, rol);

    res.send({
      status: 200,
      message: `Usuario/a ${userName} creado con éxito`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = createUserController;
