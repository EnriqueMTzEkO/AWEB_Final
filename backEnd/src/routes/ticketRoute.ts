import express from 'express';
import saleController from '../controllers/saleController';

const router = express.Router();

router.route('/mode/:mode/id/:id')
  .get(saleController.getTicket);

router.route('/delete')
  .delete(saleController.deleteTicket);

module.exports = router;