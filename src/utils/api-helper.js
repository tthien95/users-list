import axios from 'axios';

const baseUrl = 'https://dummyjson.com';

export const get = (url) => {
  return axios.get(baseUrl + url);
};

export const post = (url, body) => {
  return axios.post(baseUrl + url, body);
};

export const put = (url, body) => {
  return axios.put(baseUrl + url, body);
};
