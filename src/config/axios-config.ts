import instance from 'axios';

export const axios = instance.create({
    baseURL: 'http://127.0.0.1:4000/api',
});
