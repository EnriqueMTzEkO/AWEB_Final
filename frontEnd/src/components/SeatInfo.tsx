import {
  IonCol, IonRow, IonIcon, IonGrid, IonButton
} from '@ionic/react';
import axios from '../api/axios';
import { useHistory } from "react-router";

const SeatInfo = (seats: any) => {
  const history = useHistory();

  const sale = async (ev: any) => {
    console.log(seats.seats);
    try {
      const t = await axios.post('/resources/sale',
      JSON.stringify(seats.seats),
      {
        headers: { 'Content-type': 'application/json' },
        withCredentials: true
      });
      history.push(`/landing`);
    } catch (err) {
      console.log(err);
    }
  };

  return(
    <IonGrid className="seats-info">
      <IonRow>
        <IonCol size="3">
          <IonIcon
          src="assets/icon/ac739a25b2f24c6f9f430bf42512c24c.svg"
          className="seat-info seat-free"
          />
        </IonCol>
        <IonCol size="6"><p>Desocupado</p></IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="3">
          <IonIcon
          src="assets/icon/ac739a25b2f24c6f9f430bf42512c24c.svg"
          className="seat-info seat-reserved"
          />
        </IonCol>
        <IonCol size="6"><p>Reservado</p></IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="3">
          <IonIcon
          src="assets/icon/ac739a25b2f24c6f9f430bf42512c24c.svg"
          className="seat-info seat-occupied"
          />
        </IonCol>
        <IonCol size="6"><p>Ocupado</p></IonCol>
      </IonRow>
      <IonRow>
        <IonButton
          className="buy-button"
          color="dark"
          id="sale-modal"
          onClick={sale}>
          Comprar Boletos
        </IonButton>
      </IonRow>
    </IonGrid>
  );
};

export default SeatInfo;