import React from "react";
import {
  IonList,
  IonImg,
  IonItem
} from '@ionic/react';
import { IMoviePoster } from "../model/Movie";

const chosenMovie = (key: number) => {};
const handleImageError = (id: string) => {
  const imageError = document.getElementById(id);
  let src = imageError!.getAttribute("src");
  const extension = ['avif', 'webp', 'jpeg'];
  const newExt = extension.indexOf(src!.slice(-4));
  
  src = "".concat(src!.slice(0, -4), extension[newExt]);
  imageError?.setAttribute('src', src);
};

const MoviePoster: React.FC<IMoviePoster[]> = (props) => {
  // Declares variables for poster location.
  let posterId: number = -1;
  const data = Object.values(props);
  
  return(
    <IonList>
      {data.map((value) => {
        const imgFolder: string =
            `public/assets/img/${posterId}/poster.avif`;
        posterId = value.src;
        return(
        <IonItem key={value.id}>
          <IonImg
            id={value.id}
            className='movie-poster'
            src={imgFolder}
            alt={value.alt}
            onClick={() => chosenMovie(value.src)}
            onError={() => handleImageError(value.id)}
          ></IonImg>
        </IonItem>
        );
      })}
    </IonList>
  );
}
  

export default MoviePoster;