import { IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonList, IonModal
} from '@ionic/react';
import { movieList, oneMovie } from '../hooks/getData';
import React, { useState, useEffect } from 'react';
import Movies from './Movies';
import "./test.css";
import { IMovie } from '../model/Movie';

const Landing = () => {
  const [movie, setMovie] = useState(null);
  const [info, setInfo] = useState({isOpen: false});
  const [chosen, setChosen] = useState('');
  const [list, setList] = React.useState<Array<{id: string, title: string}>>([]);

  useEffect(() => {
    // @ts-ignore: Fuck off
    movieList().then(data => setList(data));
  }, []);

  const openModal = async (id: string) => {
    setChosen(id);
    setInfo({isOpen: true});
  };

  const closeModal = () => {
    setChosen('');
    setInfo({isOpen:false});
  }

  useEffect(() => {
    if (chosen == '') setMovie(null);
    else oneMovie(chosen).then(data => setMovie(data));
    console.log(movie);
  }, [chosen]);

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>This is a test</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {list.map(x => {
          return(
            <IonImg
              key={x.id}
              src={`http://localhost:8008/static/img/movie/${x.id}/poster.avif`}
              alt={`Poster para ${x.title}`}
              className="poster"
              onClick={async () => await openModal(x.id)}
              ></IonImg>
          );
        })}
        <Info info={movie} isOpen={info.isOpen} onClose={() => closeModal}/>
      </IonContent>
    </IonPage>
  );
};

const Info: React.FunctionComponent<any> = ({info, isOpen, onClose}) => {
  if (info) {
  return(
    <IonModal isOpen={isOpen}>
      <IonGrid>
      <IonRow>
        <IonCol size="4">
          <IonImg src={`http://localhost:8008/static/img/movie/${info.movie.id.toUpperCase()}/poster.avif`}></IonImg>
        </IonCol>
        <IonCol size="8">
          <IonGrid>
            <IonRow>
              <IonTitle>{info.movie.title}</IonTitle>
            </IonRow>
            <IonRow>
              <IonCol>Año:</IonCol>
              <IonCol>{info.movie.year}</IonCol>
              <IonCol>Clasificación:</IonCol>
              <IonCol>{info.movie.rating == 0 ? "AA" : info.movie.rating == 1
                ? "A" : info.movie.rating == 2 ? "B" : info.movie.rating == 3
                  ? "B-15" : info.movie.rating == 4 ? "C" :
                    info.movie.rating == 5 ? "D" : "Sin clasificación"
              }</IonCol>
              <IonCol>Calificación:</IonCol>
              <IonCol>{info.movie.score}</IonCol>
              <IonCol>Subtítulos:</IonCol>
              <IonCol>{info.movie.subtitles == true ? "Sí" : "No"}</IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                {info.movie.genre == "HRR" ? "Horror" 
                  : info.movie.genre == "CMD" ? "Comedia" : "Drama"}
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="8">
                <IonRow>
                  {info.movie.description}
                </IonRow>
                <IonRow>
                  <IonCol>Director: </IonCol>
                  <IonCol>{ 
                  // @ts-ignore: a
                  info.movie.people.map(x => {
                  if ( x.role == "DIR") return x.name;
                })}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Estelarizada: </IonCol>
                  <IonCol>{
                  // @ts-ignore: a
                  info.movie.people.map(x => {
                  if ( x.role == "STR") return x.name;
                })}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>País: </IonCol>
                  <IonCol>{ info.movie.movie.country }</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Productor: </IonCol>
                  <IonCol>{
                  // @ts-ignore: a
                  info.movie.companies.map(x => {
                  if ( x.role == "PRO") return x.name;
                })}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Distribuidor: </IonCol>
                  <IonCol>{
                  // @ts-ignore: a
                  info.movie.companies.map(x => {
                  if ( x.role == "DIS") return x.name;
                })}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Duración: </IonCol>
                  <IonCol>{info.movie.movie.length}</IonCol>
                </IonRow>
              </IonCol>
              <IonCol size="4">
                <IonList>
                {/*
                shows.map(x => {
                  return(
                    <IonItem key={x.id}>
                      <Link to={`/show/${x.id}`}>{`Sala ${x.hall}\nInicio: ${x.start}\tFin: ${x.end}`}</Link>
                    </IonItem>
                  );
                })}
                */}
                </IonList>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="6">
              {// @ts-ignore: please
              <iframe width="420" height="236" src={`https://www.youtube.com/embed/${info.movie.movie.teaser}`} title="YouTube video player" frameBorder="0"></iframe>
              }
              </IonCol>
              {
              // @ts-ignore: my family is dying typescript
              <IonCol size="6"><iframe width="420" height="236" src={`https://www.youtube.com/embed/${info.movie.movie.trailer}`} title="YouTube video player" frameBorder="0"></iframe></IonCol>
              }
            </IonRow>
          </IonGrid>
        </IonCol>
      </IonRow>
    </IonGrid>
    </IonModal>
  );
  }
  else return <></>
};

export default Landing;