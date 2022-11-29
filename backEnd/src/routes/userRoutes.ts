import express from 'express';
import userController from '../controllers/userController';
import authController from '../controllers/authController';

const router = express.Router();

router.route('/register')
  .post(userController.createUsers);

router.route('/login')
  .post(authController.handleLogin);

module.exports = router;