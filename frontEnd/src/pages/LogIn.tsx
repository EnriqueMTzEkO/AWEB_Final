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
import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const LOGIN_URL = '/user/login';

const Login = () => {
  // @ts-ignore: idk
  const { setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // @ts-ignore: Fuck off TS
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user,pwd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { 'Content-type': 'application/json'},
          withCredentials: true
        }
      );
      const accessToken = response?.data?.accessToken;
      const role: boolean = response?.data?.role;
      setAuth({ user, pwd, role, accessToken });
      setUser('');
      setPwd('');
      setSuccess(true);
    } catch (err) {
      // @ts-ignore: Error is mysterious
      if (!err?.response) {
        setErrMsg('No server response');
      // @ts-ignore: Error is mysterious
      } else if (err.response?.status === 400) {
        setErrMsg('Missing username or password.');
      // @ts-ignore: Error is mysterious
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized.');
      } else {
        setErrMsg('Login failed.');
      }
      // @ts-ignore: Typescript hates blind people
      errRef.current.focus();
    }
  }

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
        <form onSubmit={handleSubmit}>
        <IonList>
          <IonItem>
            <IonLabel position="floating">
              Nombre de Usuario:
            </IonLabel>
            <IonInput
            type="text"
            id="login-username"
            // @ts-ignore: Can't fix don't care
            ref={userRef}
            autoComplete="off"
            // @ts-ignore: Can't fix don't care
            onIonChange={(e) => setUser(e.target.value) }
            value={user}
            required
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">
              Password:
            </IonLabel>
            <IonInput
            type="password"
            id="login-password"
            // @ts-ignore: Can't fix don't care
            onIonChange={(e) => setPwd(e.target.value) }
            value={pwd}
            required
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonButton
            type="submit">
              Acceder
            </IonButton>
          </IonItem>
          <IonItem>
            <IonButton
            type="reset">
              Restablecer
            </IonButton>
          </IonItem>
          <IonItem>
            <p>¿Necesita una cuenta?</p>
            <Link to="/register">Inscribirse</Link>
          </IonItem>
        </IonList>
        </form>
      </IonCardContent>
    </IonCard>
  );
};

export default Login;