import httpStatus from 'http-status';
import validator from 'validator';
import _ from 'lodash';
import UserModel from '../models/user.model.js';
// import AppError from '../utils/AppError.js';
import bcrypt from 'bcrypt';
/**
 * Create user
 * @param {Object} userInfo: user info to be saved to create user
 */
const create = async (userInfo) => {
  const columns = Object.keys(userInfo);
  const createAllowedColumns = ['first_name', 'last_name', 'password', 'username'];
  if (!_.difference(columns, createAllowedColumns).length && _.intersection(columns, createAllowedColumns).length === createAllowedColumns.length) {
    userInfo.password = await bcrypt.hash(userInfo.password, 10);
    await UserModel.insertOne(userInfo);
    delete userInfo.password;
    return userInfo;
  } else {
    throw {
      message: "Bad Request",
      code: 400
    };
  }
}

/**
 * Fetch user
 * @param {String} _id: user identifier
 * returns user info
 */
const fetchById = async (_id) => {
  // if (!validator.isEmail(_id)) throw new Error("Invalid Email Format, Please Check Your Email!");
  const dbRes = await UserModel.findOne(_id);
  console.log(new Date(dbRes.account_updated));
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
    throw { message: "Bad Request", code: 400 };
  }
};

export default {
  create,
  fetchById,
  updateById,
};
