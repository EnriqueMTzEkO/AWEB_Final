import { IonCol, IonIcon } from "@ionic/react";
import { ISeat } from '../model/Seat';

const Seat: React.FC<ISeat> = (props) => {
  return(
    <>
    <IonCol>
      <IonIcon src='localhost:8008/static/img/ac739a25b2f24c6f9f430bf42512c24c.svg' id={props.id} className={
        props.status[1] == true ? 'seat-occupied'
          : props.status[0] == true ? 'seat-transaction' : 'seat-open'
      }></IonIcon>
    </IonCol>
    </>
  );
};

export default Seat;