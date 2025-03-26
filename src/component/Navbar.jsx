import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-gray-900 text-white shadow-md fixed top-0 w-full z-50">
            <div className="container mx-auto flex justify-between items-center px-6 py-4">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    <Link to="/" className="flex items-center gap-2">
                        🎬 <span className="hover:text-blue-400 transition">MovieApp</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex space-x-8 text-lg">
                    <li>
                        <Link to="/" className="hover:text-blue-400 transition">Home</Link>
                    </li>
                    <li>
                        <Link to="/fav" className="hover:text-blue-400 transition">Favorites</Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-blue-400 transition">About</Link>
                    </li>
                    <li>
                        <Link to="/Login" className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition">
                            Sign Up
                        </Link>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-xl focus:outline-none">
                        ☰
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-gray-800 text-center py-4 space-y-3">
                    <Link to="/" className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/fav" className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>Favorites</Link>
                    <Link to="/about" className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>About</Link>
                    <Link to="/Login" className="block bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition mx-auto w-40" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
