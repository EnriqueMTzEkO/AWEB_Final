/**
 * @fileoverview Sets Movie's fields.
 */
export interface IPoster {
  alt: string;
  images: Array<string>;
};

export interface IDescription {
  id: string;
  description: string;
  title: string;
  year: number;
  country: string;
  subtitles: boolean;
  starring: Array<string>;
  director: string;
  producer: string;
  distributor: string;
  rating: number;
  length: number;
  score: number;
  genre: Array<string>;
};

export interface IMovie {
  poster: IPoster;
  info: IDescription;
};