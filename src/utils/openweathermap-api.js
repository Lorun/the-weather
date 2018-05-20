import axios from 'axios';

const API_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = '7c8beb9b8a33e3410e110437c0bbc664';

const CancelToken = axios.CancelToken;
let cancel = undefined;

const buildApiRequest = (url, key, headers = {}) => {
  const baseURL = `${url}?appid=${key}&units=metric`;

  return axios.create({
    baseURL,
    headers,
  });
};

const request = buildApiRequest(API_URL, API_KEY);

const api = {
  search: function(q) {
    if (typeof cancel === 'function') {
      cancel();
    }

    return request.get('', {
      params: { q },
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
    });
  },
};

export default api;
