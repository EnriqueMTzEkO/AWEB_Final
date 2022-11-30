import express from 'express';
import refreshController from '../controllers/refreshController';

const router = express.Router();

router.get('/', refreshController.handleRefresh);

module.exports = router;