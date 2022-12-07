import axios from '../api/axios';

export const getShows = async (id: string) => {
  try {
    const response = await axios.get(`/resources/show/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getShowsById = async (id: string) => {
  try {
    const response = await axios.get(`/resources/sh/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const fullShow = async (id: string, fc: boolean) => {
  if (typeof id !== "string") return undefined;
  const temp: {
    shows: [{
    id: string;
    start: number;
    end: number;
    hall: number;
  }]} = fc ? await getShows(id) : await getShowsById(id);

  interface IShow {
    id: string;
    start: Date;
    end: Date;
    hall: number;
  };

  const shows: Array<Array<IShow>> = Array.from({length: 8}, () => []);

  temp.shows.forEach(e => {
    let s: IShow = {
      id: e.id,
      start: new Date(e.start * 1000),
      end: new Date(e.end * 1000),
      hall: e.hall
    };
    let temp = new Date(s.start);
    let day = new Date(temp.setHours(0,0,0,0));
    let today = new Date(new Date().setHours(0,0,0,0));
    let index = (day.getTime()-today.getTime()) / 24 / 60 / 60 / 1000;
    shows[index].push(s);
  });
  return shows;
};