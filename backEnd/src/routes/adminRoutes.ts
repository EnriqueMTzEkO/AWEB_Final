import express from 'express';
import adminController from '../controllers/adminController';

const router = express.Router();

router.route('/function/populate')
  .post(adminController.populateShows);

module.exports = router;