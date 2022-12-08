import { IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar, IonModal,
IonGrid, IonRow, IonCol } from '@ionic/react';
import { movieList, oneMovie } from '../hooks/getMovie';
import React, { useState, useEffect, useRef } from 'react';

import MovieModal from '../components/MovieModal';
import Header from '../components/Header';
import { OverlayEventDetail } from '@ionic/core/components';

const Landing = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [movie, setMovie] = useState(null);
  const [chosen, setChosen] = useState('');
  const [list, setList] = React.useState<Array<{id: string, title: string}>>([]);

  useEffect(() => {
    // @ts-ignore: Fuck off
    movieList().then(data => setList(data));
  }, []);

  const openModal = (id: string) => {
    setChosen(id);
  };

  useEffect(() => {
    if (chosen != '') oneMovie(chosen).then(data => setMovie(data));
  }, [chosen]);

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    setChosen('');
  };

  return(
    <IonPage>
      <Header />
      <IonContent>
        <IonGrid>
        <IonRow id="open-modal">
        {list.map(x => {
          return(
            <IonCol size="4" key={x.id}>
            <IonImg
              src={`http://localhost:8008/static/img/movie/${x.id}/poster.avif`}
              alt={`Poster para ${x.title}`}
              className="poster"
              onClick={async () => openModal(x.id)}
              ></IonImg>
            </IonCol>
          );
        })}
        </IonRow>
        <IonRow>
          <iframe src="http://localhost:8008/static/views/MapQuest.html" allow="geolocation" style={{width: "60vw", height: "40vh"}}>
          </iframe>
        </IonRow>
        </IonGrid>
        <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)} className="info-modal">
          {movie ? <MovieModal info={movie}/> : <></>}
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Landing;