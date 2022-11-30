import React from 'react'
import {
  IonContent, IonImg
} from '@ionic/react';
import './test.css';

const Test = () => {
  return (
    <IonContent className='landing-bg'>
      <IonImg
        src='http://localhost:8008/static/img/bg/184c2e2648c2468eb8511ed039c1cde9.jpg'
        className="hack-background"
      ></IonImg>
    </IonContent>
  )
}

export default Test