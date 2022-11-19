import { IMovie } from '../model/Movie';

const MovieList: Array<IMovie> = [
  {
    poster: {
      alt: "Poster para It's such a Beautiful Day, de Don Hertzfeldt.",
      images: [
        "60fe06c0-b350-4f1d-9eda-de3def93cc73",
        "67eee46d-6de4-49fe-9fa7-b9fe1829fad9",
        "0fc7e76a-2347-4523-8179-c164c60487e9"
      ]
    },
    info: {
      id: "b90261dc-ad12-427d-be06-fda694c3d08e",
      description: "Bill struggles to put together his shattered psyche, in this new feature film version of Don Hertzfeldt's animated short film trilogy.",
      title: "It's such a Beautiful Day",
      year: 2012,
      country: "USA",
      subtitles: false,
      starring: ["Don Hertzfeldt", "Sara Cushman"],
      director: "Don Hertzfeldt",
      producer: "Bitter Films",
      distributor: "GoDigital",
      rating: -1,
      length: 62,
      genre: [
        "Animation",
        "Comedy",
        "Drama",
        "Fantasy",
        "Horror",
        "Mystery",
        "Sci-fi",
        "Thriller"
      ],
      score: 8.2
    }
  }
]

export default MovieList;