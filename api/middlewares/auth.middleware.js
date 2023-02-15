import _ from 'lodash';
import bcrypt from 'bcrypt';

import UserModel from '../models/user.model.js';
import ProductModel from '../models/product.model.js';
import responseHandler from '../utils/responseHandler.js';


const isEmpty = (value) => {
    return _.isEmpty(value);
};

const verifyPassword = async (plainText, hash) => {
    return await bcrypt.compare(plainText, hash);
};

const sendResponse = (res, data, errorCode) => {
    return responseHandler(res, data, errorCode);
};

const verifyUserId = (id, userInfo) => {
    return (parseInt(id) === userInfo.id);
}

const verifyProductOwner = async (id, userInfo) => {
    const productInfo = await ProductModel.findOne(id);
    if(isEmpty(productInfo)) {
        return { verified: false, msg: 'NOT FOUND', code: 404 }
    };
    const verified = productInfo.owner_user_id === userInfo.id ? true : false;
    if(!verified) return { verified: false, msg: 'FORBIDDEN', code: 403 }
    return { verified };
}

const basicAuth = async (req, res, next) => {
    try{
        let base64string = req.headers && req.headers.authorization;
        if(isEmpty(base64string)) return sendResponse(res, 'UNAUTHORIZED', 401);
        base64string = base64string.split(" ")[1];
        if(isEmpty(base64string)) return sendResponse(res, 'UNAUTHORIZED', 401);
        let bufferObj = Buffer.from(base64string, "base64");
        const [username, password] = bufferObj.toString("utf8").split(':');
        const userInfo = await UserModel.findOneByUsername(username);
        if(isEmpty(userInfo) || !(await verifyPassword(password, userInfo.password))) return sendResponse(res, 'UNAUTHORIZED', 401);
        req.userInfo = { ...userInfo };
        return next();
    } catch(error){
        console.log(error);
        return sendResponse(res, 'INTERNAL SERVER ERROR', 500);
    }
};

const userAuth = async (req, res, next) => {
    const userId = req.params && req.params.userId;
    if(isEmpty(userId)) return sendResponse(res, 'UNAUTHORIZED', 401);
    if(!verifyUserId(userId, req.userInfo)) return sendResponse(res, 'FORBIDDEN', 403);
    return next();
};

const productAuth = async (req, res, next) => {
    const productId = req.params && req.params.productId;
    if(isEmpty(productId)) return sendResponse(res, 'UNAUTHORIZED', 401);
    const {verified, msg, code} = await verifyProductOwner(parseInt(productId), req.userInfo);
    if(!verified) return sendResponse(res, msg, code);
    return next();
}

export default {
    basicAuth,
    userAuth,
    productAuth,
};