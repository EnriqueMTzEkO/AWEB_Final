export interface ISeat {
  id: string;
  hall: number;
  row: number;
  slot: number;
};

export interface IShow {
  id: string;
  hall: number;
  time: Date;
  movie: string;
  free: number;
  seats: Array<ISeat>;
};

export interface IHall {
  id: string;
  shows: Array<IShow>;
};