import React from 'react';
import {
  IonImg
} from '@ionic/react';
import { IHall, ISeat } from '../model/Seat';

const Seat: React.FC<IHall> = (hall) => {
  const rawData: Array<ISeat> = Object.values(hall.shows[0].seats);
  const seats: Array<Array<ISeat>> = [[], [], [], [], [], [], [], []];

  // Man I'd be great if I knew shit about Data Structures
  for (let i = 0; i < 8; i++) {
    let temp = rawData.filter(row => row.row == i);
    for (let j = 0; j < 11; j++) {
      let why = temp.filter(slot => slot.slot == j);
      seats[i].push(why[0]);
    }
  };
  
  return(
    <>
    {
      seats.forEach(v => v.map(element => {
        <IonImg
          id={element.id}
          className={`seat-hall ${
            element.status[0] == true ? 'seat-occupied'
              : element.status[1] == true ? 'seat-transaction'
                : 'seat-free'
          }`}
          src='public/assets/img/hall/seat.svg'
          alt={
            element.status[0] == true ? 'Asiento ocupado'
              : element.status[1] == true ? 'Asiento reservado'
                : 'Asiento libre'
          }
        ></IonImg>
      }))
    }
    </>
  );
}

export default Seat;