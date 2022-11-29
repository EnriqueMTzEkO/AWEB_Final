import React from 'react';
import axios, { isCancel, AxiosError } from 'axios';

const Hall: React.FC<IHall> = (hall) => {
  const SEATS = axios.get('localhost:8008/shows/')
  return(
    <>
    </>
  );
}

export default Hall;