import axios, { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  // @ts-ignore
  const { auth } = useAuth();

  useEffect(() => {

    const requestIntercept = axiosPrivate.interceptors.request.use(
      // @ts-ignore
      config => {
        // @ts-ignore
        if (!config.headers['Authorization']) {
          // @ts-ignore
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      }, (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate;
        };
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept);
      axiosPrivate.interceptors.request.eject(requestIntercept);
    }
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate