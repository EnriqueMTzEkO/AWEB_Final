import {
  IonCol,
  IonContent,
  IonGrid,
  IonRow,
  IonIcon
} from "@ionic/react";
import axios from "../api/axios";
import seatList from '../model/temp.json';

const temp = seatList.seats;
const seats = [[], [], [], [], [], [], [], [], [], [], []];

for (let i = 1; i < 12; i++) {
  // @ts-ignore: Never bug
  seats[i-1].push(temp.filter(seat => {
    return seat.row == i;
  }));
};

const SEAT_ROUTE = '/seats';

const getSeats = async () => {
  try {
    const response = await axios.get(SEAT_ROUTE);
    const temp = response?.data?.seats;
    const seat = [[], [], [], [], [], [], [], [], [], [], []]
    for (let i = 0; i < 12; i++) {
      // @ts-ignore: Never bug
      seat[i].push(temp.find(seat => {
        return seat.row == i;
      }));
    };
    return seat;
  } catch (e) {
    console.log(e);
  }
}

const Hall = () => {
  return(
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonGrid>
            <IonRow>
              <IonCol size="3"></IonCol>
              <IonCol size="9"></IonCol>
            </IonRow>
          </IonGrid>
        </IonRow>
        <IonRow>
          {seats.map(x => {
            return(
              // @ts-ignore: Never
              <IonCol size="3" key={x.id}>
                <IonIcon src="assets/icon/ac739a25b2f24c6f9f430bf42512c24c.svg"></IonIcon>
              </IonCol>
            );
          })}
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default Hall;