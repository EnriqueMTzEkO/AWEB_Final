import axios from "../api/axios";

export const movieList = async () => {
  /**
   * Gets movies from server.
   * 
   * @return {id, title, alt}
   */
  try {
    const list = await axios.get("/movies");

    // Resource not found.
    if (!list.data) return [{id: 8888, title: "Not found"}];

    const data: Array<{id: string, title: string }> = list.data.movies;

    // Returns the list object.
    return data;
  } catch (err) {
    // This is not error handling.
    console.log(err);
    return [{id: 8888, title: "Not found", alt: "Poster not found"}];
  };
};

export const oneMovie = async (id: string) => {
  try {
    const container = await axios.get(`resources/movie/${id}`);

    return container.data;
  } catch (err) {
    console.log(err);
  }
};