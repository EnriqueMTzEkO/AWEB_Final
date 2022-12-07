import { IonGrid, IonCol, IonContent, IonImg } from '@ionic/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const getWeather = async () => {
  // https://api.openweathermap.org/data/2.5/weather?lat=21.841412937109432&lon=-102.35441215690126&appid=27e264a789d34e506cb2aa730336c490
  // http://api.weatherapi.com/v1/current.json?key=b4214c77f57f4949849160753220712&q=21.841412937109432,-102.35441215690126&aqi=no
  const report: any = await axios.get('');
  const out = {
    condition: {
      text: report.data.current.condition.text,
      icon: report.data.current.condition.icon.slice(-7)
    },
    temp: report.data.current.temp_c,
    w: [report.data.current.wind_kph, report.data.current.wind_dir],
    humidity: report.data.current.humidity,
    cloud: report.data.current.cloud,
    day: report.data.current.is_day == 1 ? "day" : "night",
    uv: report.data.current.uv,
  }
  console.log(`assets/icon/weather/${out.day}/${out.condition.icon}`);
  
  return out;
};

const Weather = () => {
  const [weather, setWeather] = useState<any>();

  useEffect(() => {
    getWeather().then((data) => setWeather(data));
  }, []);

  console.log(weather);

  return(
    weather ? 
    <IonContent style={{height: "100%"}}>
      <IonGrid style={{height: "100%"}}>
        <IonCol className="weather-col" size="1">
          <IonImg
            src={`assets/icon/weather/${weather.day}/${weather.condition.icon}`}
            className="weather-icon">
          </IonImg>
        </IonCol>
        <IonCol className="weather-col" size="3">
          {`${weather.condition.text}\t${weather.temp}° C`}
        </IonCol>
      </IonGrid>
    </IonContent> : <></>
  );
};

export default Weather;