import express from "express";
import moviesController from "../controllers/moviesController";

const router = express.Router();

router.route('/')
  .get(moviesController.getAllMovies);

module.exports = router;