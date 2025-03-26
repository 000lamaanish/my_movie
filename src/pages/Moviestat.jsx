import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";

const TMDB_API_KEY = "b0f44254786d6ba00216937a2260e18f";

const MovieStatsPage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
                );
                const movieData = response.data.results.slice(0, 10).map((movie) => ({
                    title: movie.title,
                    release_date: movie.release_date,
                    rating: movie.vote_average.toFixed(1),
                    box_office: "N/A", // Placeholder for revenue
                }));
                setMovies(movieData);
            } catch (err) {
                setError("Failed to fetch movie data");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const columns = [
        { accessorKey: "title", header: "🎬 Title" },
        { accessorKey: "release_date", header: "📅 Release Date" },
        { accessorKey: "rating", header: "⭐ Rating" },
        { accessorKey: "box_office", header: "💰 Box Office" },
    ];

    const table = useReactTable({
        data: movies,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (loading) return <div className="text-white text-lg">Loading movies...</div>;
    if (error) return <div className="text-red-500 text-lg">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">🎥 Movie Box Office & Ratings</h1>
            <div className="overflow-x-auto w-full max-w-4xl">
                <table className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg shadow-lg">
                    {/* Table Header */}
                    <thead className="bg-gray-700 text-gray-200 text-lg sticky top-0">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="border-b border-gray-600">
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="p-4 text-left uppercase tracking-wider">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {table.getRowModel().rows.map((row, index) => (
                            <tr
                                key={row.id}
                                className={`hover:bg-gray-700 transition-all ${index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                                    }`}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="p-4 border-b border-gray-700">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MovieStatsPage;
