import axios from 'axios';

const API_URL = 'http://localhost:3000';

const $api = axios.create({
    withCredentials: true,
    baseUrl: API_URL
})