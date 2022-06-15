import axios from 'axios';

const baseUrl = 'https://reqres.in/api';

export const get = (url) => {
  return axios.get(baseUrl + url);
};

export const post = (url, body) => {
  return axios.post(baseUrl + url, body);
};
