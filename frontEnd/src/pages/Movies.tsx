import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonTitle
} from "@ionic/react";

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
                <IonCol></IonCol>
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