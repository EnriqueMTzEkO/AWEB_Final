import React, { useState } from 'react';
import {
  IonInput,
  IonItem,
  IonLabel,
  IonButton
} from '@ionic/react';
import { IUserAccessForm } from '../model/Form';

const FormsComponent = (props: IUserAccessForm) => {
  return(
    <>
    <form onSubmit={props.event}>
      <>
        {props.inputs.forEach((element) => {
          <IonItem key={element.key}>
            <IonLabel>
              {element.labelText}
            </IonLabel>
            <IonInput
              type={element.type}
              id={element.id}
              ref={element.ref || null}
              onIonChange={(e) => changeEvent(e.target.value)}
              value={element.value}
              required={element.required || false}
            >
            </IonInput>
          </IonItem>
        })}
      </>
      <IonItem>
        <IonButton>{props.buttonLabel}</IonButton>
      </IonItem>
    </form>
    </>
  );
};

export default FormsComponent;