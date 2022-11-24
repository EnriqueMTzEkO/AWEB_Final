import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.route('/')
  .get(userController.getUsers)
  .post(userController.createUsers)
  .patch(userController.updateUsers)
  .delete(userController.deleteUsers);

export default router;