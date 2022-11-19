import React from "react";
import {
  IonList,
  IonImg,
  IonItem
} from '@ionic/react';
import IMovie from "../model/Movie";

const chosenMovie = (key: number) => {};
const handleImageError = (counter: number) => {
  if (counter < 3) {
    counter += 1;
  } else {
    return 'true shit';
  }
};

const MoviePoster: React.FC<IMovie[]> = (props) => {
  // Declares variables for poster location.
  let posterId: number = 0;
  let extension: [string, string, string] = ['avif', 'webp', 'jpeg'];
  const data = Object.values(props);
  console.log(data);
  
  return(
    <IonList>
      <IonImg></IonImg>
      {data.map((value) => {
        const imgFolder: string =
            `public/assets/img/${posterId}/poster.${extension[value.fail]}`;
        posterId = value.src;
        return(
        <IonItem key={value.id}>
          <IonImg
            id={value.id}
            className='movie-poster'
            src={imgFolder}
            alt={value.alt}
            onClick={() => chosenMovie(value.src)}
            onError={() => handleImageError(value.fail)}
          ></IonImg>
        </IonItem>
        );
      })}
    </IonList>
  );
}
  

export default MoviePoster;