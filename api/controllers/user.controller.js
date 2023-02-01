import userService from '../services/user.service.js';
import responseHandler from '../utils/responseHandler.js';

const fetchById = async (req, res) => {
  const _id = req.params.userId;
  const userInfo = await userService.fetchUserById(_id);
  responseHandler(res, userInfo);
};

const create = async (req, res) => {
    const userInfo = req.body;
    const dbResponse = await userService.create(userInfo);
    responseHandler(res, dbResponse);
  };

const updateById = async (req, res) => {
  const _id = req.params.userId;
  const userInfo = req.body;
  const dbResponse = await userService.updateUser(_id, userInfo);
  responseHandler(res, dbResponse);
};

export default {
  fetchById,
  create,
  updateById,
};
