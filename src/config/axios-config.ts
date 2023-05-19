import instance from 'axios';

export const axios = instance.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});
