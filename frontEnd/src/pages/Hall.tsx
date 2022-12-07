import {
  IonCol,
  IonPage,
  IonGrid,
  IonRow,
  IonIcon,
  IonLabel,
  IonInput,
  IonContent,
  IonHeader,
  IonBackButton,
  IonTitle,
  IonSelect,
  IonSelectOption
} from "@ionic/react";
import { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { closeCircleOutline } from 'ionicons/icons';
import { getSeats } from '../hooks/getSeats';
import { fullShow } from '../hooks/getShow';
import './Seats.css';
import { getNews } from "../hooks/getNews";

interface ISeat extends RouteComponentProps<{
  id: string;
}> {};

interface ISeats {
  id: string;
  row: number;
  slot: number;
  status: number;
};

interface IShow {
  id: string;
  start: Date;
  end: Date;
  hall: number;
};

const Hall: React.FC<ISeat> = ( { match } ) => {
  const [seats, setSeats] = useState<Array<Array<ISeats>>>();
  const [currentShow, setCurrentShow] = useState<IShow>();
  const [chosen, setChosen] = useState('');

  const [shows, setShows] = useState<Array<Array<IShow>>>();
  const [dayShows, setDayShows] = useState(0);

  useEffect(() => {
    getSeats(match.params.id).then((data) => setSeats(data));
    fullShow(match.params.id, false).then(data => {
      setShows(data);
      // @ts-ignore:
      shows?.forEach(e => {
        e.filter(f => {
          if (f.id == match.params.id) setCurrentShow(f);
        });
      });
    });
  }, []);

  const openModal = (id: string) => {
    setChosen(id);
  };

  const history = useHistory();
  const handleSelect = (value: any) => {
    console.log(value);
    setCurrentShow(value);
    history.push(`/show/${currentShow?.id}`);
  };

  return(
  <IonPage>
    <IonHeader>
      <IonGrid>
        <IonRow>
          <IonCol size="1">
            <IonBackButton defaultHref="/landing" text="Regresar" color="danger" icon={closeCircleOutline}/>
          </IonCol>
          <IonCol size="3">
            {shows ? 
            <IonSelect
            interface="popover"
            value={currentShow?.id}
            placeholder={currentShow ?
              `Sala ${currentShow.hall}\tHorario: ${currentShow.start.toString().slice(15,21)}`
                : ''}
            onIonChange={(ev) => handleSelect(shows[dayShows][ev.detail.value])}>
              {
                shows ?
                shows[dayShows].map((x, i) => {
                  return(
                    <IonSelectOption
                    value={i}
                    key={x.id}>
                      {`Sala ${x.hall} Horario: ${x.start.toString().slice(15,21)}`}
                    </IonSelectOption>
                  );
                }) : <></>
              }
            </IonSelect>
            : <></>}
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonHeader>
    <IonContent>
    <IonGrid>
        <IonRow>
          <IonCol size="5">
          {
            seats?.map((x,i) => {
              return(
                <IonRow key={i}>
                  {
                    x.map((y, j) => {
                      return(
                        j < 5 ?
                        <IonCol size={ j == 4 ? "3" : "2"} key={y.id} className="ion-padding">
                          <IonIcon
                            className={`seat-icon ${y.status}`}
                            src="assets/icon/ac739a25b2f24c6f9f430bf42512c24c.svg"
                            onClick={async () => openModal(y.id)}>
                          </IonIcon>
                        </IonCol> : <></>
                      );
                    })
                  }
                </IonRow>
              );
            })
          }
          </IonCol>
          <IonCol size="2">
            <IonLabel>
              <p>Introduzca el número de asientos</p>
              <IonInput></IonInput>
            </IonLabel>
          </IonCol>
          <IonCol size="5">
          {
            seats?.map((x,i) => {
              return(
                <IonRow key={i ? i : "0"}>
                  {
                    x.map((y, j) => {
                      return(
                        j > 4 ?
                        <IonCol size={ j == 9 ? "3" : "2"} key={y.id ? y.id : "0"} className="ion-padding">
                          <IonIcon
                            className={`seat-icon ${y.status}`}
                            src="assets/icon/ac739a25b2f24c6f9f430bf42512c24c.svg"
                            onClick={async () => openModal(y.id)}>
                          </IonIcon>
                        </IonCol> : <></>
                      );
                    })
                  }
                </IonRow>
              );
            })
          }
          </IonCol>
        </IonRow>
        </IonGrid>
    </IonContent>
  </IonPage>
  );
};

export default Hall;