import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">🎬 MovieApp</Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/fav">Favorites</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/Login">Sign up</Link></li>

            </ul>
        </nav>
    );
};

export default Navbar;
