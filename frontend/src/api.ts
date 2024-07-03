import axios from 'axios';

const instance = axios.create({
  baseURL: "http://localhost:5000",
  validateStatus: function (status) {
    return Math.floor(status / 100) == 2; // 2xx
  }
});

export default instance
