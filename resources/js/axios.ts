import axios from 'axios';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;

const token = document
  .querySelector('meta[name="csrf-token"]')
  ?.getAttribute('content');

if (token) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
} else {
  console.warn('CSRF token not found');
}
