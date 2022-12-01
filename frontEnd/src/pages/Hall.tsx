import {
  IonCol,
  IonContent,
  IonGrid,
  IonRow
} from "@ionic/react";
import axios from "../api/axios";

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
            {}
          </IonGrid>
        </IonRow>
        <IonRow>

        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default Hall;