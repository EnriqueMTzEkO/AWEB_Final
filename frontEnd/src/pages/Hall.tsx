import {
  IonCol,
  IonPage,
  IonGrid,
  IonRow,
  IonIcon,
  IonLabel,
  IonContent,
  IonHeader,
  IonBackButton,
  IonSelect,
  IonSelectOption,
  IonButton
} from "@ionic/react";
import { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { closeCircleOutline } from 'ionicons/icons';
import { getSeats } from '../hooks/getSeats';
import { fullShow } from '../hooks/getShow';

import Chyron from '../components/Chyron';
import Weather from '../components/Weather';

import './Seats.css';
import SeatInfo from "../components/SeatInfo";

interface ISeat extends RouteComponentProps<{
  id: string;
}> {};

interface ISeats {
  id: string;
  row: number;
  slot: number;
  status: string;
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
  const [chosen, setChosen] = useState<Array<string>>([]);

  const [shows, setShows] = useState<Array<Array<IShow>>>();
  const [dayShows, setDayShows] = useState(0);

  const [newSeats, setNewSeats] = useState(false);

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

  const addSeat = (id: string, i: number, j: number) => {
    let temp: string[] = [];
    if (chosen?.includes(id)) {
      temp = chosen.filter(e => e != id);
      seats![i][j].status = "seat-free";
      setSeats(seats);
    } else {
      // @ts-ignore
      chosen?.push(id);
      temp = chosen;
      seats![i][j].status = "seat-reserved";
      setSeats(seats);
    }
    setNewSeats(!newSeats);
    setChosen(temp);
  };

  useEffect(() => {
  }, [newSeats]);

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
          <IonCol size="3"></IonCol>
          { /**
          <IonCol size="5">
            <Weather />
          </IonCol>
          */}
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
                          <IonLabel>
                            <IonIcon
                              className={`seat-icon ${y.status}`}
                              src="assets/icon/ac739a25b2f24c6f9f430bf42512c24c.svg"
                              onClick={() => addSeat(y.id, i, j)}>
                            </IonIcon>
                          </IonLabel>
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
            <SeatInfo
            // @ts-ignore:
            buy={chosen}/>
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
                            onClick={() => addSeat(y.id, i, j)}>
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
    <Chyron />
  </IonPage>
  );
};

export default Hall;