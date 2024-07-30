import axios from 'axios';

const instance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 1000, //ms
  validateStatus: function (status) {
    // allow 2xx
    return status >= 200 && status < 300;
  }
});

export default instance
