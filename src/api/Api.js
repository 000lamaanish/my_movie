
const BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

console.log('API URL:', BASE_URL);
console.log('API Key:', API_KEY);


const API = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

import axios from 'axios';

export async function Getpopularmovie() {
    try {
        const res = await axios.get(API);

        if (res.status !== 200) throw new Error("Failed to fetch movies");

        console.log("Fetched Movies:", res.data.results);
        return res.data.results || [];
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
}

// Function to search movies by query
export const searchMovies = async (query) => {
    try {
        if (!query) return [];
        const res = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);

        if (res.status !== 200) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }

        return res.data.results || [];
    } catch (error) {
        console.error("Failed to fetch movies:", error);
        return [];
    }
};

// Function to get movie details by ID
export const GetMovieDetails = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
};
