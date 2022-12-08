import { IonGrid, IonRow, IonCol, IonImg, IonTitle, IonList, IonItem, IonLabel, IonIcon } from '@ionic/react';
import { fullShow } from '../hooks/getShow';
import { useState, useEffect } from 'react';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import './Modal.css';

interface IShow {
  id: string;
  start: Date;
  end: Date;
  hall: number;
};

const MovieModal = (info: any) => {
  const movie = info.info.movie;
  const people = info.info.people;
  const companies = info.info.companies;

  const [shows, setShows] = useState<Array<Array<IShow>>>();
  const [index, setIndex] = useState<number>(1);
  const [plusMinus, setButton] = useState<boolean>(false);

  useEffect(() => {
    fullShow(movie.id, true).then(data => setShows(data));
  }, []);

  useEffect(() => {
    if (plusMinus && shows && shows.length > index) {
      setIndex(index + 1);
    } else if (index > 0) {
      setIndex(index - 1);
    }
  }, [plusMinus]);

  return(
  <IonGrid>
  <IonRow>
      <IonCol size="4">
        <IonImg src={`http://localhost:8008/static/img/movie/${movie.id.toUpperCase()}/poster.avif`}></IonImg>
      </IonCol>
      <IonCol size="8">
        <IonGrid>
          <IonRow>
            <IonTitle><h1>{movie.title}</h1></IonTitle>
          </IonRow>
          <IonRow>
            <IonCol>Año:</IonCol>
            <IonCol>{movie.year}</IonCol>
            <IonCol>Clasificación:</IonCol>
            <IonCol>{movie.rating == 0 ? "AA" : movie.rating == 1
              ? "A" : movie.rating == 2 ? "B" : movie.rating == 3
                ? "B-15" : movie.rating == 4 ? "C" :
                  movie.rating == 5 ? "D" : "Sin clasificación"
            }</IonCol>
            <IonCol>Calificación:</IonCol>
            <IonCol>{movie.score}</IonCol>
            <IonCol>Subtítulos:</IonCol>
            <IonCol>{movie.subtitles == true ? "Sí" : "No"}</IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              {movie.genre == "HRR" ? "Horror" 
                : movie.genre == "CMD" ? "Comedia" : "Drama"}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="8">
              <IonRow>
                {movie.description}
              </IonRow>
              <IonRow>
                <IonCol>Director: </IonCol>
                <IonCol>{ 
                // @ts-ignore: a
                people.map(x => {
                if ( x.role == "DIR") return x.name;
              })}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Estelarizada: </IonCol>
                <IonCol>{
                // @ts-ignore: a
                people.map(x => {
                if ( x.role == "STR") return x.name;
              })}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>País: </IonCol>
                <IonCol>{ movie.country }</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Productor: </IonCol>
                <IonCol>{
                // @ts-ignore: a
                companies.map(x => {
                if ( x.role == "PRO") return x.name;
              })}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Distribuidor: </IonCol>
                <IonCol>{
                // @ts-ignore: a
                companies.map(x => {
                if ( x.role == "DIS") return x.name;
              })}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Duración: </IonCol>
                <IonCol>{movie.length}</IonCol>
              </IonRow>
            </IonCol>
            <IonCol size="4">
              <IonRow>
                <IonCol size="3">
                  <IonIcon src={chevronBackOutline} style={{height: "100%", display: "block" }} onClick={() => setButton(false)}></IonIcon>
                </IonCol>
                <IonCol size="6"><h5 className='ion-text-center'>Funciones</h5></IonCol>
                <IonCol size="3"><IonIcon src={chevronForwardOutline} style={{height: "100%", display: "block" }} onClick={() => setButton(true)}></IonIcon></IonCol>
              </IonRow>
              <IonList>
              {
              shows ? 
              shows[index].map(x => {
                return(
                  <IonItem key={x.id} routerLink={`/show/${x.id}`} onClick={() => {
                    // @ts-ignore:
                    this.dismiss()}}>
                    <IonLabel>{`Sala ${x.hall} Inicio: ${x.start.toString().slice(15,21)}`}</IonLabel>
                  </IonItem>
                );
              }) : <></>}
              </IonList>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
            {// @ts-ignore: please
            <iframe width="420" height="236" src={`https://www.youtube.com/embed/${movie.teaser}`} title="YouTube video player" frameBorder="0"></iframe>
            }
            </IonCol>
            {
            // @ts-ignore: my family is dying typescript
            <IonCol size="6"><iframe width="420" height="236" src={`https://www.youtube.com/embed/${movie.trailer}`} title="YouTube video player" frameBorder="0"></iframe></IonCol>
            }
          </IonRow>
        </IonGrid>
      </IonCol>
    </IonRow>
  </IonGrid>
  );
};

export default MovieModal;