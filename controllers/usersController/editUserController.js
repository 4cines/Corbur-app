const updateUserQuery = require("../../db/querys/usersQueries/updateUserQuery");

const editUserController = async (req, res, next) => {
  try {
    const { userName, password, rol } = req.body;

    let hashedPassword;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
      await updateUserQuery(userName, hashedPassword, rol);
    }

    await updateUserQuery(userName, hashedPassword, rol);

    res.send({
      status: 200,
      message: `Usuario/a ${userName} se ha actualizado con éxito`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = editUserController;
