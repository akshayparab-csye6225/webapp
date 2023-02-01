import httpStatus from 'http-status';
import _ from 'lodash';
// import UserModel from '../models/user.model.js';
// import AppError from '../utils/AppError.js';
import bcrypt from 'bcrypt';
/**
 * Create user
 * @param {Object} userInfo: user info to be saved to create user
 */
const create = async (userInfo) => {
 return {};
};

/**
 * Fetch user
 * @param {String} _id: user identifier
 * returns user info
 */
const fetchById = async (_id) => {
  return {};
};

/**
 * Update user
 * @param {String} _id: user identifier
 * @param {Object} userInfo: user info to be updated
 * @return {Object} updatedUserInfo
 */
const updateById = async (_id, userInfo) => {
  return {}
};

export default {
  create,
  fetchById,
  updateById,
};
