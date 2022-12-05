import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonTitle,
  IonList,
  IonItem
} from "@ionic/react";
import { Link } from "react-router-dom";
import { IMovie } from "../model/Movie";

const Movies: React.FC<any> = (props: {
  movie: IMovie
}) => {
  // @ts-ignore: why
  if (props.movie != undefined) {
    return(
    <IonGrid>
      <IonRow>
        <IonCol size="4">
          <IonImg src={`http://localhost:8008/static/img/movie/${props.movie.movie.id.toUpperCase()}/poster.avif`}></IonImg>
        </IonCol>
        <IonCol size="8">
          <IonGrid>
            <IonRow>
              <IonTitle>{props.movie.movie.title}</IonTitle>
            </IonRow>
            <IonRow>
              <IonCol>Año:</IonCol>
              <IonCol>{props.movie.movie.year}</IonCol>
              <IonCol>Clasificación:</IonCol>
              <IonCol>{props.movie.movie.rating == 0 ? "AA" : props.movie.movie.rating == 1
                ? "A" : props.movie.movie.rating == 2 ? "B" : props.movie.movie.rating == 3
                  ? "B-15" : props.movie.movie.rating == 4 ? "C" :
                    props.movie.movie.rating == 5 ? "D" : "Sin clasificación"
              }</IonCol>
              <IonCol>Calificación:</IonCol>
              <IonCol>{props.movie.movie.score}</IonCol>
              <IonCol>Subtítulos:</IonCol>
              <IonCol>{props.movie.movie.subtitles == true ? "Sí" : "No"}</IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                {props.movie.movie.genre == "HRR" ? "Horror" 
                  : props.movie.movie.genre == "CMD" ? "Comedia" : "Drama"}
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="8">
                <IonRow>
                  {props.movie.movie.description}
                </IonRow>
                <IonRow>
                  <IonCol>Director: </IonCol>
                  <IonCol>{ props.movie.people.map(x => {
                  if ( x.role == "DIR") return x.name;
                })}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Estelarizada: </IonCol>
                  <IonCol>{ props.movie.people.map(x => {
                  if ( x.role == "STR") return x.name;
                })}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>País: </IonCol>
                  <IonCol>{ props.movie.movie.country }</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Productor: </IonCol>
                  <IonCol>{ props.movie.companies.map(x => {
                  if ( x.role == "PRO") return x.name;
                })}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Distribuidor: </IonCol>
                  <IonCol>{ props.movie.companies.map(x => {
                  if ( x.role == "DIS") return x.name;
                })}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Duración: </IonCol>
                  <IonCol>{props.movie.movie.length}</IonCol>
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
              <iframe width="420" height="236" src={`https://www.youtube.com/embed/${props.movie.movie.teaser}`} title="YouTube video player" frameBorder="0"></iframe>
              }
              </IonCol>
              {
              // @ts-ignore: my family is dying typescript
              <IonCol size="6"><iframe width="420" height="236" src={`https://www.youtube.com/embed/${props.movie.movie.trailer}`} title="YouTube video player" frameBorder="0"></iframe></IonCol>
              }
            </IonRow>
          </IonGrid>
        </IonCol>
      </IonRow>
    </IonGrid>
    );
  }
  else return <></>
};

export default Movies;