import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import '../css/Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Footer Sections */}
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>
                        We provide the best movie recommendations with AI-driven technology.
                    </p>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Movies</a></li>
                        <li><a href="#">Genres</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="#"><FaFacebook /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaLinkedin /></a>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} MovieRecommender. All rights reserved.</p>
            </div>
        </footer>
    );
}
