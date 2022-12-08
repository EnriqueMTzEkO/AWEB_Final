import express from 'express';
import hallController from '../controllers/hallController';
import saleController from '../controllers/saleController';

const router = express.Router();

router.route('/show/:show')
  .get(hallController.getShows);

router.route('/sh/:show')
  .get(hallController.getMovieShowsId);

router.route('/movie/:movie')
  .get(hallController.getMovie);

router.route('/show/seat/:show')
  .get(hallController.getSeats);

router.route('/sale')
  .post(saleController.sale);

module.exports = router;