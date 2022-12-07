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
}

export default Chyron;