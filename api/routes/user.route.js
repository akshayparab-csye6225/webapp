import express from 'express';
import userController from '../controllers/user.controller.js';
import authmiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();
const path = '/v1/user';

router.route('')
  .post(userController.create);

router.route('/:userId')
  .get(authmiddleware ,userController.fetchById)
  .put(authmiddleware, userController.updateById);


export {
  router,
  path,
};
