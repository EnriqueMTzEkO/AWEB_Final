import { IonButton, IonContent, IonIcon } from '@ionic/react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import { useState } from 'react';
import { arrowUpCircleOutline } from 'ionicons/icons';

const center = { lat: 21.84151, lng: -102.35444 };

const Map = () => {
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE!
  });

  const [map, setMap] = useState<any>(null);

  return(
    isLoaded ?
    <IonContent>
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: '65vw', height: '50vh'}}
        onLoad={map => setMap(map)}>
        <Marker position={center} />
      </GoogleMap>
      <IonButton
      onClick={() => map.panTo(center)}>
        <IonIcon>{arrowUpCircleOutline}</IonIcon>
      </IonButton>
    </IonContent>
    : <></>
  );
};

export default Map;