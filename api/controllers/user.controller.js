import _ from 'lodash';

import userService from '../services/user.service.js';
import responseHandler from '../utils/responseHandler.js';


const fetchById = async (req, res) => {
  const _id = req.params.userId;
  const userInfo = await userService.fetchById(_id);
  responseHandler(res, userInfo);
};

const create = async (req, res) => {
    const userInfo = req.body;
    if(_.isEmpty(userInfo)) return responseHandler(res, null, 204);
    try{
      const dbResponse = await userService.create(userInfo);
      responseHandler(res, dbResponse);
    } catch(error){
      let errorCode = error.code ? error.code : 500;
      responseHandler(res, null, errorCode);
    }  
  };

const updateById = async (req, res) => {
  const _id = req.params.userId;
  const userInfo = req.body;
  if(_.isEmpty(userInfo)) return responseHandler(res, null, 204);
  try{
    await userService.updateById(_id, userInfo);
    responseHandler(res, null, 200);
  } catch(error) {
    console.log('error',error);
    let errorCode = error.code ? error.code : 500;
    responseHandler(res, null, errorCode);
  }
};

export default {
  fetchById,
  create,
  updateById,
};
