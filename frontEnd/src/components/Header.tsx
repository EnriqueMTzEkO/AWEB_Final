import { IonCol, IonGrid, IonHeader, IonRow, IonTitle } from '@ionic/react';
import { useHistory } from 'react-router';

const Header = () => {
  const history = useHistory();
  const goTo = (uri: string) => {
    history.push(uri);
  };
  
  return(
  <IonHeader>
    <IonGrid>
      <IonRow>
        <IonCol size="8">
          <IonTitle>CINEMA</IonTitle>
        </IonCol>
        <IonCol size="2" onClick={(ev) => goTo('/landing')}>
          Películas
        </IonCol>
        <IonCol size="2" onClick={(ev) => goTo('/cancel')}>
          Cancelaciones
        </IonCol>
      </IonRow>
    </IonGrid>
  </IonHeader>
  );
};

export default Header;