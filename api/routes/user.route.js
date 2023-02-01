import express from 'express';
import userController from '../controllers/user.controller.js';
// import requestValidatorMiddleware from '../middlewares/requestValidator.middleware.js';
// import userValidations from '../validations/user.validations.js';

const router = express.Router();
const path = '/v1/user';

router.route('/:userId')
    .get(userController.fetchById)
    .post(userController.create)
    .put(userController.updateById);

export {
  router,
  path,
};
