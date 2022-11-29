import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonInput,
  IonLabel,
  IonCardSubtitle
} from '@ionic/react';
import React, { useRef, useState, useEffect } from 'react';

const USER_REGEX = /^(?=[a-zA-Z0-9._]{4,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{12,64}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const LogIn = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // @ts-ignore: Fuck off TS
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PASSWORD_REGEX.test(pwd));
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user,pwd,matchPwd]);

  return(
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Acceder</IonCardTitle>
        <IonCardSubtitle>
          <p
          // @ts-ignore: Fuck off
          ref={errRef}
          className={errMsg ? "errmsg" : 
        "offscreen"} aria-live="assertive">{errMsg}</p>
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <form>
        <IonList>
          <IonItem>
            <IonLabel position="floating">
              Nombre de Usuario
            </IonLabel>
            <IonInput
            type="text"
            id="login-username"
            // @ts-ignore: Can't fix don't care
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser((e.target as HTMLInputElement)!.value) }
            required
            aria-invalid={validName ? "false" : "true"}
            aria-described-by="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            ></IonInput>
            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
              4 a 16 caracteres.<br />
              Debe empezar con letra. <br />
            </p>
          </IonItem>
        </IonList>
        </form>
      </IonCardContent>
    </IonCard>
  );
};

export default LogIn;