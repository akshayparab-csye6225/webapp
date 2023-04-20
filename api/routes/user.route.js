import express from 'express';

import logEntryPoint from '../middlewares/log.middleware.js';
import requestValidatorMiddleware from '../middlewares/requestValidator.middleware.js';
import userValidations from '../validations/user.validation.js';
import userController from '../controllers/user.controller.js';
import middleware from '../middlewares/auth.middleware.js';

const router = express.Router();
const path = '/v6/user';

router.route('')
  .post(logEntryPoint, requestValidatorMiddleware(userValidations.create), userController.create);

router.route('/:userId')
  .get(logEntryPoint, requestValidatorMiddleware(userValidations.fetchById),middleware.basicAuth, middleware.userAuth, userController.fetchById)
  .put(logEntryPoint, requestValidatorMiddleware(userValidations.updateById),middleware.basicAuth, middleware.userAuth, userController.updateById);


export {
  router,
  path,
};
