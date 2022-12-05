import conn from "../config/Connector";
import {Request, Response } from 'express';


const getAllMovies = async (req: Request, res: Response) => {
  /**
   * Gets movies' ids to the client.
   * @return {JSON}
   */
  try {
    const connection = await conn();
    const list: any = await connection.query('CALL sp_movie_init(UNHEX(?))',
      [process.env.DB_CUSTOMER_AUTH_KEY]);
    connection.end();

    // Validates if the query has results, probably a tautology, check
    // later.
    if (!list[0][0]) return res.sendStatus(404).json({ message: "Resource is empty."});

    // If list has elements, returns results to client.
    return res.json({
      movies: list[0][0]
    });

  } catch (err) {
    // Not actual error handling, someone should fix this. Not me doe.
    console.log(err);
  }
};

export default {
  getAllMovies
};