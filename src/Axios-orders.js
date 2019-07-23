import axios from 'axios';

// baseURL for all ordering
const instance = axios.create({
    baseURL: 'https://burger-builder-24571.firebaseio.com/'
});

export default instance;
