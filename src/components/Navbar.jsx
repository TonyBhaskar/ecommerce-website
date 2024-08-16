import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar({ loggedIn, cartItems, username }) {
    return (
        <nav className="navbar">
            <div className="nav-links">
                <Link to="/" className="link">HOME</Link>
                <Link to="/cart" className="link">
                    Cart ({cartItems.length})
                </Link>
            </div>
            <div className="user-section">
                {loggedIn ? (
                    <span className="welcome-message">Welcome, {username}!</span>
                ) : (
                    <Link to="/login" className="link">Sign In</Link>
                )}
            </div>
        </nav>
    );
}
