import React from 'react';
import axios, { isCancel, AxiosError } from 'axios';
import { IHall } from '../model/Seat';

const Hall: React.FC<IHall> = (hall) => {
  const SEATS = axios.get('localhost:8008/shows/')
  return(
    <>
    </>
  );
}

export default Hall;