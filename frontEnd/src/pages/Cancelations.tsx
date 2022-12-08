import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonTitle, IonInput, IonIcon, IonButton, IonList, IonItem } from "@ionic/react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { searchOutline, trash } from "ionicons/icons";
import Ticket from "../hooks/getTicket";
import axios from "../api/axios";

const Cancelations = () => {
  const [search, setSearch] = useState<any>('');
  const [mode, setMode] = useState<number>(0);
  const [go, setGo] = useState<boolean>(false);
  const [tickets, setTickets] = useState<any>();

  useEffect(() => {
    if (search) {
      Ticket(mode, search).then(data => {
        setTickets(data.data.results);
      });
    }
  }, [go]);

  const sendSearch = () => {
    setGo(!go);
  };

  const deleteItem = async (id: string) => {
    const del = await axios.delete('/ticket/delete',{
      data: { selection: id },
      headers: { 'Content-type': 'application/json'},
      withCredentials: true
    });
    // @ts-ignore
    const temp = tickets.filter(e => e.id != id);
    setTickets(temp);
    setSearch('');
    setGo(!go);
  };

  return(
    <IonPage>
      <Header />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonTitle>Introduzca el código del asiento a cancelar</IonTitle>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="8">
              <IonInput type="text" value={search} onIonChange={(e) => setSearch(e.target.value)}>
                <IonIcon src={searchOutline} size="large"></IonIcon>
              </IonInput>
            </IonCol>
            <IonCol size="4">
              {// @ts-ignore
              <IonButton onClick={sendSearch}>ENVIAR</IonButton>}
            </IonCol>
          </IonRow>
          <IonList>
          {
            tickets ?
            // @ts-ignore
            tickets.map(x => {
              return(
                <IonItem key={x.id}>
                  <IonGrid>
                    <IonRow>
                      <IonCol size="2">
                        <IonIcon src={trash} size="large" onClick={() => deleteItem(x.id)}></IonIcon>
                      </IonCol>
                      <IonCol size="10">
                        <IonRow>
                          <IonCol size="3">{x.id}</IonCol>
                          <IonCol size="6">{x.movie}</IonCol>
                          <IonCol size="3">{x.start}</IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol size="3">{x.price}</IonCol>
                          <IonCol size="6">{x.name}</IonCol>
                          <IonCol size="3">{x.end}</IonCol>
                        </IonRow>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonItem>
              )
            }) : <></>
          }
          </IonList>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Cancelations;