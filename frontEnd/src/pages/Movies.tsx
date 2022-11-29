import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol
} from "@ionic/react";

const Movies: React.FC = () => {
  return(
  <IonPage>
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonCol size="6">
            Image
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
  );
};

export default Movies;