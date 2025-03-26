import React, { useState, useEffect } from "react";
import Moviecard from "../component/Moviecard";
import { searchMovies, Getpopularmovie } from "../api/Api";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { Link, useNavigate } from "react-router-dom";

const Homepage = () => {
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const LoadPopularMovies = async () => {
            try {
                const popularMovies = await Getpopularmovie();
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };

        LoadPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search.trim()) return;

        try {
            setLoading(true);
            setError(null);
            const results = await searchMovies(search);
            setMovies(results);
        } catch (err) {
            setError("Failed to fetch search results...");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col pt-24">
            <Navbar />
            <div className="flex flex-col items-center p-6">
                <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search for a movie..."
                        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300">Search</button>
                </form>

                {loading && <p className="mt-4 text-gray-400">Loading movies...</p>}
                {error && <p className="mt-4 text-red-400">{error}</p>}

                <div className="w-full max-w-6xl">
                    <p className="text-xl font-semibold mt-6">{search.trim() ? "Search Results" : "Popular Movies"}</p>
                    <div className="flex gap-4 mt-4 overflow-x-auto p-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                        {movies.length > 0 ? (
                            movies.map((movie) => (
                                <div
                                    key={movie.id}
                                    onClick={() => navigate(`/movie/${movie.id}`)}
                                    className="cursor-pointer transform hover:scale-105 transition duration-300 w-48 flex-shrink-0"
                                >
                                    <Moviecard movie={movie} />
                                </div>
                            ))
                        ) : (
                            !loading && <p className="text-gray-400">No movies found.</p>
                        )}
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <h1 className="text-2xl font-bold">Want any recommendation?</h1>
                    <Link to="/recommend">
                        <button className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition duration-300">Recommend</button>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Homepage;
