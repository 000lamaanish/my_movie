const API_KEY = "b0f44254786d6ba00216937a2260e18f"
const BASE_URL = "https://api.themoviedb.org/3"

export async function Getpopularmovie() {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

        if (!response.ok) throw new Error("Failed to fetch movies");

        const data = await response.json();
        console.log("Fetched Movies:", data.results); 
        return data.results || []; 
    } catch (error) {
        console.error("Error fetching movies:", error);
        return []; 
    }
}


export const searchMovies = async (query) => {
    try {
        if (!query) return [];

        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data.results || []; 
    } catch (error) {
        console.error("Failed to fetch movies:", error);
        return [];
    }
};
export const GetMovieDetails = async (id) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_API_KEY`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
};
