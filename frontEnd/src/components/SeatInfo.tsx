import {
  IonCol, IonRow, IonIcon, IonGrid, IonButton, IonModal, IonLabel, IonInput, IonText, IonItem, IonList
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

  useEffect(() => {
    // @ts-ignore
    const v1: Array<string> = Array.from({length: buy.buy.length}, () => []);
    // @ts-ignore
    const v2: Array<string> = Array.from({length: buy.buy.length}, () => []);
    // @ts-ignore
    const v3: Array<string> = Array.from({length: buy.buy.length}, () => []);
  }, [buy.buy]);

  const sale = (ev: any) => {
    ev.preventDefault();
    const saleInfo = { names: names, emails: emails, phones: phones};
    console.log(saleInfo);
  };

  const addName = (value: string, index: number) => {
    if (names) {
      names[index] = value;
      setNames(names);
    }
  };

  const addEmail = (value: string, index: number) => {
    if (emails) {
      emails[index] = value;
      setEmail(emails);
    }
  };

  const addTel = (value: number, index: number) => {
    if (phones) {
      phones[index] = value;
      setPhone(phones);
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
          id="sale-modal">
          Comprar Boletos
        </IonButton>
      </IonRow>
      <IonModal ref={modal} trigger="sale-modal" className="sale-modal">
        <form onSubmit={sale}>
          <IonList>
        {
          buy.buy.length > 0 ?
          // @ts-ignore
          buy.buy.map((x, i: number) => {
            return(
              <IonItem key={i}>
                <IonLabel>Nombre:</IonLabel>
                {// @ts-ignore
                  <IonInput type="text" value="" onIonChange={(ev) => addName(ev.target.value, i)} required={true}></IonInput>}
                <IonLabel>Email:</IonLabel>
                {// @ts-ignore
                <IonInput type="email" value="" onIonChange={(ev) => addEmail(ev.target.value, i)} required={true}></IonInput>}
                <IonLabel>Teléfono:</IonLabel>
                {// @ts-ignore
                <IonInput type="tel" value="" onIonChange={(ev) => addTel(ev.target.value, i)} required={true}></IonInput>}
              </IonItem>
            );
          }) : <IonText>Elija sus asientos primero</IonText>
        }
        {
          buy.buy.length > 0 ?
          <IonButton>
            Comprar Boletos
          </IonButton> : <></>
        }
        </IonList>
        </form>
      </IonModal>
    </IonGrid>
  );
};

export default SeatInfo;