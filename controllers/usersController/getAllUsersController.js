const { generateError } = require("../../helpers");

const getAllUsersController = async (req, res, next) => {
  try {
    const users = await selectAllUsersQuery();
    res.send({
      status: 200,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getAllUsersController;
