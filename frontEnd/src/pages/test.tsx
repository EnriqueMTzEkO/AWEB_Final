import React from 'react'
import {
  IonGrid,
  IonRow,
  IonCol,
  IonIcon
} from '@ionic/react';
import './test.css';

const Test: React.FC = () => {
  return (
    <IonGrid>
      <IonRow>
        <IonGrid>
          <IonRow>
            <IonCol size="3"></IonCol>
            <IonCol size="9"></IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="3"><IonIcon src="assets/icon/ac739a25b2f24c6f9f430bf42512c24c.svg"></IonIcon></IonCol>
            <IonCol size="3"><IonIcon src="assets/icon/ac739a25b2f24c6f9f430bf42512c24c.svg"></IonIcon></IonCol>
            <IonCol size="3"><IonIcon src="assets/icon/ac739a25b2f24c6f9f430bf42512c24c.svg"></IonIcon></IonCol>
            <IonCol size="3"><IonIcon src="assets/icon/ac739a25b2f24c6f9f430bf42512c24c.svg"></IonIcon></IonCol>
          </IonRow>
        </IonGrid>
      </IonRow>
      <IonRow>

      </IonRow>
    </IonGrid>
  )
}

export default Test;