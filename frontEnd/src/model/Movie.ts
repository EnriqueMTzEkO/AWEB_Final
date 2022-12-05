/**
 * @fileoverview Sets Movie's fields.
 */
import IntrinsicAttributes from 'react';

export interface IMovie {
  movie: {
    id: string;
    title: string;
    description: string;
    year: number;
    subtitles: boolean;
    rating: number;
    genre: string;
    length: number;
    country: string;
    score: number;
    teaser: string;
    trailer: string;
  }
  people: {
    name: string;
    role: string;
  }[];
  companies: {
    name: string;
    role: string;
  }[];
};