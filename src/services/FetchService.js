import axios from 'axios';

export function FetchGetService(url) {
    return axios.get(url)
        .then(response => response.data)
        .catch(error => {
            // Handle error
            console.error('Error fetching data:', error);
            throw error; // Re-throw the error to propagate it to the caller
        });
}

export function FetchPostService(url) {
    return axios.post(url)
        .then(response => response.data)
        .catch(error => {
            // Handle error
            console.error('Error fetching data:', error);
            throw error; // Re-throw the error to propagate it to the caller
        });
}
