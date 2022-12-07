// @ts-nocheck
import conn from '../config/Connector';

const util = async (sql: string, params: string[]) => {
  const connection = await conn();
  const gottem = await connection.query(sql, params);
  connection.end();
  return gottem[0][0];
};

const getShows = async (req, res) => {
  const shows = await util('CALL sp_show(UNHEX(?), UNHEX(?))',
    [process.env.DB_CUSTOMER_AUTH_KEY, req.params.show]);

  return res.json({ "shows": shows});
};

// @ts-ignore: req, res
const getSeats = async (req, res) => {
  const seats = await util('CALL sp_seats(UNHEX(?), UNHEX(?))',
    [process.env.DB_CUSTOMER_AUTH_KEY, req.params.show]);
    
  // @ts-ignore: Fuck off
  res.json({ "seats": seats});
}

// @ts-ignore: req, res
const getMovie = async (req, res) => {
  const movieId = req.params.movie;
  const connection = await conn();
  const movie = await connection.query('CALL sp_movie_full(UNHEX(?), UNHEX(?))',
    [process.env.DB_CUSTOMER_AUTH_KEY, movieId]);

  const actors = await connection.query('CALL sp_get_actors(UNHEX(?), ?)',
  // @ts-ignore: req, res
    [process.env.DB_CUSTOMER_AUTH_KEY, movie[0][0][0].title]);

  const companies = await connection.query('CALL sp_get_company(UNHEX(?), ?)',
  // @ts-ignore: req, res
    [process.env.DB_CUSTOMER_AUTH_KEY, movie[0][0][0].title]);

  const newId = Buffer.from(movie[0][0][0].id);
  movie[0][0][0].id = newId.toString('hex').toUpperCase();
  connection.end();
  res.json({
    "movie": movie[0][0][0],
    "people": actors[0][0],
    "companies": companies[0][0]
  });
};

const getMovieShowsId = async (req, res) => {
  const shows = await util('CALL sp_show_show(UNHEX(?), UNHEX(?))',
    [process.env.DB_CUSTOMER_AUTH_KEY, req.params.show]);

  return res.json({ "shows": shows});
};

export default {
  getSeats,
  getMovie,
  getShows,
  getMovieShowsId
}