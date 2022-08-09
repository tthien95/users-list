import axios from 'axios';

export const baseUrl = 'https://dummyjson.com';

export const get = (url: string) => {
  return axios.get(baseUrl + url);
};

export const post = (url: string, body: any) => {
  return axios.post(baseUrl + url, body);
};

export const put = (url: string, body: any) => {
  return axios.put(baseUrl + url, body);
};

export const deleteReq = (url: string, body: any) => {
  return axios.delete(baseUrl + url, body);
};
