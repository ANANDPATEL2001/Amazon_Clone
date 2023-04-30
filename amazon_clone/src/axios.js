import axios from 'axios';

const instance = axios.create({
    // The following is API (cloud function) URL
    baseURL: 'http://127.0.0.1:5001/clone-1d0ef/us-central1/api'
});

export default instance
