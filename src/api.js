import axios from 'axios';

const BASE_URL = `http://api.openweathermap.org/data/2.5/`;
const APP_ID = `f60b15ba6e182a5da4e12838fe1bb577`;
const UNITS = `metric`;

export const createApi = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    return Promise.reject(err);
  };

  const addUrlParams = (request) => {
    const defaultParams = {
      appid: APP_ID,
      units: UNITS
    }

    const paramsToUrl = new URLSearchParams(defaultParams);
    request.url = `${request.url}?${paramsToUrl}`;
    return request;
  }

  api.interceptors.request.use(addUrlParams, onFail);
  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
