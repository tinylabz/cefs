import instance from 'axios';

export const axios = instance.create({
    baseURL: 'https://cefs.onrender.com/api',
});
