const selectUserQuery = require("../../db/querys/usersQueries/selectUserQuery");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { generateError } = require("../../helpers");

const loginUserController = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      generateError("Debe ingresar un nombre y una contraseña");
    }

    const [user] = await selectUserQuery(userName);

    if (user.length === 0) {
      generateError("No existe el/la usuario/a", 401);
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      generateError("Contraseña incorrecta", 401);
    }

    const userInfo = {
      id: user.id,
      name: user.name,
      role: user.rol,
    };

    const token = jwt.sign(userInfo, process.env.SECRET, {
      expiresIn: "7d",
    });

    res.send({
      status: 200,
      message: token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = loginUserController;
