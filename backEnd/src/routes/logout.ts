import express from 'express';
import logoutController from '../controllers/logoutController';

const router = express.Router();

router.get('/', logoutController.handleLogOut);

module.exports = router;