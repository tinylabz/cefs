import instance from 'axios';

export const axios = instance.create({
    baseURL:
        process.env.NODE_ENV === 'production'
            ? 'https://cefs.onrender.com/api'
            : 'http://localhost:4000/api',
});

export const baseURL =
    process.env.NODE_ENV === 'production'
        ? 'https://cefs.onrender.com/api'
        : 'http://localhost:4000/api';

export const baseURLUpload =
    process.env.NODE_ENV === 'production'
        ? 'https://cefs.onrender.com/'
        : 'http://localhost:4000/';
