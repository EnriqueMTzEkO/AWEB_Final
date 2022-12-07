import {
  IonCol, IonRow, IonIcon, IonGrid, IonButton, IonModal, IonLabel, IonInput, IonText
} from '@ionic/react';
import { useEffect, useState, useRef } from 'react';

interface ISaleInput {
  name: string,
  email: string,
  phone: string
}

const SeatInfo = (buy: any) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [names, setNames] = useState<Array<string>>();
  const [emails, setEmail] = useState<Array<string>>();
  const [phones, setPhone] = useState<Array<number>>();

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
          id="sale-modal">
          Comprar Boletos
        </IonButton>
      </IonRow>
      <IonModal ref={modal} trigger="sale-modal" className="sale-modal">
        <IonGrid>
          {
            buy.buy.length > 0 ?
            buy.buy.map((x: any,i: number) => {
              return(
              <IonRow key={i}>
                <IonLabel>
                  <IonInput type="text"></IonInput>
                </IonLabel>
                <IonLabel>
                  <IonInput type="text"></IonInput>
                </IonLabel>
                <IonLabel>
                  <IonInput type="number"></IonInput>
                </IonLabel>
              </IonRow>
              );
            }) :
            <IonText>Por favor elija sus asientos primero.</IonText>
          }
        </IonGrid>
      </IonModal>
    </IonGrid>
  );
};

export default SeatInfo;