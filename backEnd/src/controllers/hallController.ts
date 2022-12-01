// @ts-nocheck
import conn from '../config/Connector';

// @ts-ignore: req, res
const getSeats = async (req, res) => {
  const showId = req.params.show;
  const connection = await conn();
  const seats = await connection.query('CALL sp_show(UNHEX(?), UNHEX(?))',
    [process.env.DB_CUSTOMER_AUTH_KEY, showId]);
  connection.end();
  // @ts-ignore: Fuck off
  res.json({ "seats": seats[0][0]});
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
  movie[0][0][0].id = newId.toString('hex');
  connection.end();
  res.json({
    "movie": movie[0][0][0],
    "actors": actors[0][0],
    "companies": companies[0][0]
  });
};

export default {
  getSeats,
  getMovie
}