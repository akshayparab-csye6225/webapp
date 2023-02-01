import _ from 'lodash';
import UserService from '../services/user.service.js';
import responseHandler from '../utils/responseHandler.js';

const authmiddleware = async (req, res, next) => {
    const base64string = req.headers && req.headers.authorization;
    console.log(base64string);
    const userId = req.params && req.params.userId;
    if (_.isEmpty(base64string) || _.isEmpty(userId)) return responseHandler(res, 'Unauthorized', 401);
    let bufferObj = Buffer.from(base64string, "base64");
    const [username, password] = bufferObj.toString("utf8").split(':');
    const userAuthSuccess = await UserService.authenticateUser(userId, username, password);
    if (userAuthSuccess) return next();  
    return responseHandler(res, 'Unauthorized', 401);
}
export default authmiddleware;