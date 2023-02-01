import _ from 'lodash';
import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';

import emailValidator from '../utils/emailValidator.js';
/**
 * Create user
 * @param {Object} userInfo: user info to be saved to create user
 */
const create = async (userInfo) => {
  const columns = Object.keys(userInfo);
  const createAllowedColumns = ['first_name', 'last_name', 'password', 'username'];
  if (!_.difference(columns, createAllowedColumns).length && _.intersection(columns, createAllowedColumns).length === createAllowedColumns.length) {
    if (!emailValidator(userInfo.username)) throw {message: "Invalid Email Format, Please Check Your Email!", ecode: 400};
    userInfo.password = await bcrypt.hash(userInfo.password, 10);
    await UserModel.insertOne(userInfo);
    const dbRes = await UserModel.findOneByUsername(userInfo.username);
    delete dbRes.password;
    return dbRes;
  } else {
    throw {
      message: "Bad Request",
      ecode: 400
    };
  }
}

/**
 * Fetch user
 * @param {String} _id: user identifier
 * returns user info
 */
const fetchById = async (_id) => {
  const dbRes = await UserModel.findOne(_id);
  delete dbRes.password;
  return dbRes;
};

/**
 * Update user
 * @param {String} _id: user identifier
 * @param {Object} userInfo: user info to be updated
 * @return {Object} updatedUserInfo
 */
const updateById = async (_id, userInfo) => {
  const columns = Object.keys(userInfo);
  const updateAllowedColumns = ['first_name', 'last_name', 'password'];
  if (!_.difference(columns, updateAllowedColumns).length) {
    if(_.has(userInfo, 'password')) userInfo.password = await bcrypt.hash(userInfo.password, 10);
    await UserModel.updateOne(userInfo, _id);
  } else {
    throw { message: "Bad Request", ecode: 400 };
  }
};

const authenticateUser = async (userId, username, password) => {
    const userInfo = await UserModel.findOne(userId);
    if(userInfo.username !== username) return false;
    return bcrypt.compare(password, userInfo.password);
}
 
export default {
  create,
  fetchById,
  updateById,
  authenticateUser,
};
