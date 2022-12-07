import { IonToolbar,IonFooter } from "@ionic/react";
import { getNews } from "../hooks/getNews";

const Chyron = async () => {
  const snippets = await getNews();
  let snippetContainer = "";
  for (let i = 0; i < snippets.length; i++) {
    snippetContainer += '<div class="ticker-item">• • • ';
    snippetContainer += snippets[i];
    snippetContainer += ' • • •&nbsp;&nbsp;&nbsp;';
    snippetContainer += '</div>';
  };

  return(
    <IonFooter>
      <IonToolbar>
        
      </IonToolbar>
    </IonFooter>
  );
  //write tickers to page
  var chyron = document.querySelector(".ticker");
  chyron.innerHTML = snippetContainer;

  //get length in characters of all snippets
  var snipJoin = snippets.join();
  characterLength = snipJoin.length;

  //set length of animation in ms to length of all snippet characters 
  //multiplied by multiplier (150)
  chyron.style.animation = "" + (characterLength * 150) + "ms ticker linear infinite";
}

export default Chyron;