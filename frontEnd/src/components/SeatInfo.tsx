import {
  IonCol, IonRow, IonIcon, IonGrid, IonButton, useIonAlert
} from '@ionic/react';
import axios from '../api/axios';
import { useHistory } from "react-router";
import './info.css';

const SeatInfo = (seats: any) => {
  const history = useHistory();
  const [presentAlert] = useIonAlert();

  const sale = async (ev: any) => {
    if (seats.seats.length > 0) {
      try {
        const t = await axios.post('/resources/sale',
        JSON.stringify(seats.seats),
        {
          headers: { 'Content-type': 'application/json' },
          withCredentials: true
        });
        // @ts-ignore
        const bought = seats.seats.map(el => { return el.id;}).join("\n");
  
        presentAlert({
          header: "Correcto",
          subHeader: "Compra completa",
          cssClass: "success-alert",
          message: `Ha comprado los boletos con IDs de ${bought}`,
          buttons: [
            {
              text: 'OK',
              role: 'confirm',
              handler: () => history.push(`/landing`)
            }
          ]
        });
  
      } catch (err) {
        console.log(err);
      }
    } else {
      presentAlert({
        header: "Error",
        subHeader: "Carrito Vacío",
        cssClass: "error-alert",
        message: `Por favor seleccione los asientos antes de dar click en comprar`,
        buttons: [
          {
            text: 'OK',
            role: 'confirm'
          }
        ]
      });
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