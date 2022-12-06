import express from 'express';
import hallController from '../controllers/hallController';

const router = express.Router();

router.route('/show/:show')
  .get(hallController.getShows);

router.route('/movie/:movie')
  .get(hallController.getMovie);

router.route('/show/seat/:show')
  .get(hallController.getSeats);

module.exports = router;