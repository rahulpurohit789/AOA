import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor
api.interceptors.request.use(
    config => {
        // You can add auth tokens here if needed
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response Error:', error.response.data);
            return Promise.reject(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request Error:', error.request);
            return Promise.reject({ message: 'No response from server' });
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
            return Promise.reject({ message: error.message });
        }
    }
);

export const jobsApi = {
    getAll: () => api.get('/jobs'),
    getSchedule: () => api.get('/jobs/schedule'),
    create: (job) => api.post('/jobs/add', job),
    update: (id, updates) => api.post(`/jobs/update/${id}`, updates),
    delete: (id) => api.delete(`/jobs/${id}`)
};

export default api; 