// @ts-nocheck
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonInput,
  IonLabel,
  IonCardSubtitle,
  IonButton
} from '@ionic/react';
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,15}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{7,63}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const REGISTER_URL = '/user/register';

const Register = () => {
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

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

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
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setErrMsg('');
  }, [user,pwd,matchPwd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try{
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({ username: user, password: pwd, email}),
        {
          headers: { 'Content-type': 'application/json'},
          withCredentials: true
        }
      );
      console.log(response.data);
      setSuccess(true);
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg('No server response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username taken.');
      } else {
        setErrMsg('Registration failed.');
      }
      // @ts-ignore: Can't fix don't care
      errRef.current.focus();
    }
  }

  return(
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Registrarse</IonCardTitle>
        <IonCardSubtitle>
          <p
          // @ts-ignore: Fuck off
          ref={errRef}
          className={errMsg ? "errmsg" : 
        "offscreen"} aria-live="assertive">{errMsg}</p>
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <form onSubmit={handleSubmit}>
        <IonList>
          <IonItem>
            <IonLabel position="floating">
              Nombre de Usuario:
              <span className={validName ? "valid" : "hide"}></span>
              <span className={validName || !user ? "hide" : "invalid"}></span>
            </IonLabel>
            <IonInput
            type="text"
            id="register-username"
            // @ts-ignore: Can't fix don't care
            ref={userRef}
            autoComplete="off"
            onIonChange={(e) => setUser(e.target.value) }
            value={user}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-described-by="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            ></IonInput>
            <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
              4 a 16 caracteres.<br />
              Debe empezar con letra. <br />
              Permite Letras, números, guión bajo y guiones.
            </p>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">
              Email:
              <span className={validEmail ? "valid" : "hide"}></span>
              <span className={validEmail || !email ? "hide" : "invalid"}></span>
            </IonLabel>
            <IonInput
            type="email"
            id="register-email"
            onIonChange={(e) => setEmail(e.target.value) }
            value={email}
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-described-by="emlnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            ></IonInput>
            <p id="emlnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
              Al menos un caracter antes de un @.<br />
              Debe empezar con letra. <br />
              Debe contener 1 punto y 2 caracteres más.
            </p>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">
              Password:
              <span className={validPwd ? "valid" : "hide"}></span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}></span>
            </IonLabel>
            <IonInput
            type="password"
            id="register-password"
            onIonChange={(e) => setPwd(e.target.value) }
            value={pwd}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-described-by="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            ></IonInput>
            <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"}>
              8 a 64 caracteres.<br />
              Debe contener 1 mayúscula y 1 minúscula.<br />
              Debe contener al menos un caracter especial como !@#$%.
            </p>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">
              Confirme el password:
              <span className={validMatch && matchPwd ? "valid" : "hide"}></span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}></span>
            </IonLabel>
            <IonInput
            type="password"
            id="register-confirm"
            onIonChange={(e) => setMatchPwd(e.target.value) }
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-described-by="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            ></IonInput>
            <p id="confirmnote" className={matchFocus && !validMatch && !validPwd ? "instructions" : "offscreen"}>
              Debe corresponder con el password.
            </p>
          </IonItem>
          <IonItem>
            <IonButton
            type="submit">
              Registrarse
            </IonButton>
          </IonItem>
          <IonItem>
            <IonButton
            type="reset">
              Restablecer
            </IonButton>
          </IonItem>
          <IonItem>
            <p>¿Ya tiene cuenta?</p>
            <Link to="/login">Acceder</Link>
          </IonItem>
        </IonList>
        </form>
      </IonCardContent>
    </IonCard>
  );
};

export default Register;