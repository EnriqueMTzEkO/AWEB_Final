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

const data = {
  "movie": {
      "id": "5af046786e9411eda83aac9e17ecf698",
      "title": "The Thing",
      "description": "A research team in Antarctica is hunted by a shape-shifting alien that assumes the appearance of its victims.",
      "year": 1982,
      "subtitles": 0,
      "rating": 4,
      "genre": "HRR",
      "length": 109,
      "country": "USA",
      "score": "5.00000"
  },
  "actors": [
      {
          "name": "John Carpenter",
          "role": "DIR"
      },
      {
          "name": "Bill Lancaster",
          "role": "SCR"
      },
      {
          "name": "David Foster",
          "role": "PRO"
      },
      {
          "name": "Lawrence Turman",
          "role": "PRO"
      },
      {
          "name": "Kurt Russell",
          "role": "STR"
      },
      {
          "name": "Dean Cundey",
          "role": "CIN"
      },
      {
          "name": "Todd Ramsay",
          "role": "EDT"
      }
  ],
  "companies": [
      {
          "name": "The Turman-Foster Company",
          "role": "PRO"
      },
      {
          "name": "Universal Pictures",
          "role": "DIS"
      }
  ]
};

const shows = {
  "data": [
    {
      "id": "CEA8215070FE11ED8B3500155DF03F05",
      "start": "2022-12-01 15:45:00",
      "end": "2022-12-01 17:55:00",
      "hall": 2
    },
    {
      "id": "CEA821D170FE11ED8B3500155DF03F05",
      "start": "2022-12-01 18:00:00",
      "end": "2022-12-01 20:10:00",
      "hall": 2
    },
    {
      "id": "CEA8225370FE11ED8B3500155DF03F05",
      "start": "2022-12-01 19:00:00",
      "end": "2022-12-01 21:40:00",
      "hall": 3
    },
    {
      "id": "CEA822D470FE11ED8B3500155DF03F05",
      "start": "2022-12-01 21:00:00",
      "end": "2022-12-01 23:00:00",
      "hall": 1
    },
    {
      "id": "CEA8235470FE11ED8B3500155DF03F05",
      "start": "2022-12-01 20:20:00",
      "end": "2022-12-01 22:30:00",
      "hall": 1
    }
  ]
}

const Movies: React.FC = () => {
  return(
  <IonPage>
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonCol size="4">
            <IonImg src={`http://localhost:8008/static/img/movie/${data.movie.id.toUpperCase()}/poster.avif`}></IonImg>
          </IonCol>
          <IonCol size="8">
            <IonGrid>
              <IonRow>
                <IonTitle>{data.movie.title}</IonTitle>
              </IonRow>
              <IonRow>
                <IonCol>Año:</IonCol>
                <IonCol>{data.movie.year}</IonCol>
                <IonCol>Clasificación:</IonCol>
                <IonCol>{data.movie.rating == 0 ? "AA" : data.movie.rating == 1
                  ? "A" : data.movie.rating == 2 ? "B" : data.movie.rating == 3
                    ? "B-15" : data.movie.rating == 4 ? "C" :
                      data.movie.rating == 5 ? "D" : "Sin clasificación"
                }</IonCol>
                <IonCol>Calificación:</IonCol>
                <IonCol>{parseInt(data.movie.score)}</IonCol>
                <IonCol>Subtítulos:</IonCol>
                <IonCol>{data.movie.subtitles == 1 ? "Sí" : "No"}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  {data.movie.genre == "HRR" ? "Horror" 
                    : data.movie.genre == "CMD" ? "Comedia" : "Drama"}
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="8">
                  <IonRow>
                    {data.movie.description}
                  </IonRow>
                  <IonRow>
                    <IonCol>Director: </IonCol>
                    <IonCol>{ data.actors.map(x => {
                    if ( x.role == "DIR") return x.name;
                  })}</IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>Estelarizada: </IonCol>
                    <IonCol>{ data.actors.map(x => {
                    if ( x.role == "STR") return x.name;
                  })}</IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>País: </IonCol>
                    <IonCol>{ data.movie.country }</IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>Productor: </IonCol>
                    <IonCol>{ data.companies.map(x => {
                    if ( x.role == "PRO") return x.name;
                  })}</IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>Distribuidor: </IonCol>
                    <IonCol>{ data.companies.map(x => {
                    if ( x.role == "DIS") return x.name;
                  })}</IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>Duración: </IonCol>
                    <IonCol>{data.movie.length}</IonCol>
                  </IonRow>
                </IonCol>
                <IonCol size="4">
                  <IonList>
                  {shows.data.map(x => {
                    return(
                      <IonItem key={x.id}>
                        <Link to={`/show/${x.id}`}>{`Sala ${x.hall}\nInicio: ${x.start}\tFin: ${x.end}`}</Link>
                      </IonItem>
                    );
                  })}
                  </IonList>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6"><iframe src='https://youtu.be/VnGBL-qrmvE' width="100%" height="100%"></iframe></IonCol>
                <IonCol size="6"><iframe src='https://youtu.be/5ftmr17M-a4' width="100%" height="100%"></iframe></IonCol>
              </IonRow>
            </IonGrid>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
  );
};

export default Movies;