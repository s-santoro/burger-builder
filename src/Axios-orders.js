import axios from 'axios';

// baseURL for all ordering
const instance = axios.create({
    baseURL: 'https://react-building-burger.firebaseio.com'
});

export default instance;
