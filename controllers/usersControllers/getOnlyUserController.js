const { generateError } = require("../../helpers");

const selectAllUsersQuery = require("../../db/querys/usersQueries/selectAllUsersQuery");

const getOnlyUserController = async (req, res, next) => {
  try {
    const userInfo = req.user;
    res.send({
      status: 200,
      data: userInfo,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getOnlyUserController;
