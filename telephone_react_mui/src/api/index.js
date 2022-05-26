import axios from 'axios';

// export const BASE_URL = "http://193.95.69.51:8009/api/";
// export const URL_IMAGES = "http://193.95.69.51:8009/Images/";

// Localhost
export const BASE_URL = 'https://localhost:44356/api/';
export const URL_IMAGES = 'http://localhost:37660/Images/';

export const AUTH_URL = 'https://localhost:44313/api/';

export const ENDPOINTS = {
  BASE: 'Bases',
  CORPS: 'Corps',
  SERVICES: 'Services',
  DOCUMENT: 'Documents',
};
export const createAPIEndpoint = (endpoints) => {
  let url = BASE_URL + endpoints + '/';

  return {
    fetchAll: () => axios.get(url),
    fetchById: (id) => axios.get(url + id),
    create: (newRecord) => axios.post(url, newRecord),
    update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
    delete: (id) => axios.delete(url + id),
  };
};

export const createAPIEndpointCorps = (endpoints) => {
  let url = BASE_URL + endpoints + '/';

  return {
    fetchAll: () => axios.get(url),
    fetchById: (id) => axios.get(url + id),
    create: (newRecord) => axios.post(url, newRecord),
    update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
    delete: (id) => axios.delete(url + id),
  };
};

export const createAPIEndpointService = (endpoints) => {
  let url = BASE_URL + endpoints + '/';

  return {
    fetchAll: () => axios.get(url),
    fetchById: (id) => axios.get(url + id),
    create: (newRecord) => axios.post(url, newRecord),
    update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
    delete: (id) => axios.delete(url + id),
  };
};
