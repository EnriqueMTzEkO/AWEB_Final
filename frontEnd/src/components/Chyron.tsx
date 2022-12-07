import { IonToolbar, IonFooter, IonText } from "@ionic/react";
import { useEffect, useState } from 'react';
import { getNews } from "../hooks/getNews";
import './Chyron.css';

const Chyron = () => {
  const [snippets, setSnippets] = useState<any>(undefined);

  useEffect(() => {
    getNews().then(data => setSnippets(data));
  }, []);

  console.log(snippets);

  if (snippets) {
    const chyronPrint = snippets.join('\t• • •\t');
    const l = chyronPrint.length;
    return (
      <IonFooter className="ticker-wrap">
        <IonToolbar className="ticker">
          <IonText className="ticker-item" style={{animation: `${130 * l}ms ticker linear infinite`}}>
            {chyronPrint}
          </IonText>
        </IonToolbar>
      </IonFooter>
    );
  };

  return(
    <></>
  );
}

export default Chyron;