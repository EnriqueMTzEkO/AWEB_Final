import {
  IonCol,
  IonContent,
  IonGrid,
  IonRow,
  IonIcon
} from "@ionic/react";
import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { getSeats } from '../hooks/getSeats';

interface ISeat extends RouteComponentProps<{
  id: string;
}> {};

interface ISeats {
  id: string;
  row: number;
  slot: number;
  status: number;
};

const Hall: React.FC<ISeat> = ( { match } ) => {
  const [seats, setSeats] = useState<Array<Array<ISeats>>>();

  useEffect(() => {
    getSeats(match.params.id).then((data) => setSeats(data));
  }, []);

  return(
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonGrid>
            <IonRow>
              <IonCol size="3"></IonCol>
              <IonCol size="9"></IonCol>
            </IonRow>
          </IonGrid>
        </IonRow>
          { 
          seats ?
          seats.map((x,i) => {
            return(
              <IonRow key={i}>
                {
                  x ? 
                x.map(y => {
                return(
                <IonCol size="2" key={y.id}>
                  <IonIcon src="assets/icon/ac739a25b2f24c6f9f430bf42512c24c.svg"></IonIcon>
                </IonCol>
                );
                }) : <></>
                }
              </IonRow>
            );
          })
        : <></>
        }
      </IonGrid>
    </IonContent>
  );
};

export default Hall;