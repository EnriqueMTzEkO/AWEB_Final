import { IonCol, IonGrid, IonRow, IonTitle } from '@ionic/react';
import React from 'react';
import { IDescription } from '../model/Movie';

const MovieDescription: React.FC<IDescription> = (movie: IDescription) => {
  return(
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonTitle>{movie.title}</IonTitle>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>{movie.score}</IonCol>
        <IonCol>{movie.year}</IonCol>
        <IonCol>{movie.length}</IonCol>
        <IonCol>{movie.rating}</IonCol>
      </IonRow>
      <IonRow>
        <IonCol>{movie.description}</IonCol>
        <IonGrid>
          <IonRow>
            <IonCol>{movie.country}</IonCol>
            <IonCol>{movie.subtitles}</IonCol>
            <IonCol>{movie.genre}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>{movie.starring}</IonCol>
            <IonCol>{movie.director}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>{movie.distributor}</IonCol>
            <IonCol>{movie.producer}</IonCol>
          </IonRow>
        </IonGrid>
      </IonRow>
    </IonGrid>
  );
};

export default MovieDescription;