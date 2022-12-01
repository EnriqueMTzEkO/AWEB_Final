import express from 'express';
import hallController from '../controllers/hallController';

const router = express.Router();

router.route('/show/:show')
  .get(hallController.getSeats);

router.route('/movie/:movie')
  .get(hallController.getMovie);

module.exports = router;