const API_KEY = "b0f44254786d6ba00216937a2260e18f"
const BASE_URL = "https://api.themoviedb.org/3"

// export const Getpopularmovie = async () => {
//     const response = await fetch(`${base_url}/movie/popular?api_key=${api_key}`);
//     const data = await response.json();
//     return data.result;
// };
export async function Getpopularmovie() {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

        if (!response.ok) throw new Error("Failed to fetch movies");

        const data = await response.json();
        console.log("Fetched Movies:", data.results); // ✅ Check API response in Console
        return data.results || []; // ✅ Always return an array
    } catch (error) {
        console.error("Error fetching movies:", error);
        return []; // ✅ Return empty array to prevent errors
    }
}


export const searchMovies = async (query) => {
    try {
        if (!query) return []; // Return empty if query is empty

        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data.results || []; // Ensure we return an array
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