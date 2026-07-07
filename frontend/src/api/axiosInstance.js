// Pre-configured axios client
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

<<<<<<< HEAD

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

=======
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});


>>>>>>> df3686a1f13df9eb097890139fab6eafd81e6e28
export default api;
