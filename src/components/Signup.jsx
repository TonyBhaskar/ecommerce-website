import React, { useState } from 'react';
import '../styles/Signup.css';

export default function Signup({ setLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = existingUsers.find(user => user.username === username);

        if (userExists) {
            alert('User already exists, please sign in');
        } else if (username && password) {
            const newUser = { username, password };
            existingUsers.push(newUser);
            localStorage.setItem('users', JSON.stringify(existingUsers));
            setLoggedIn(true);
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            alert('Signup successful');
            window.location.href = '/';
        } else {
            alert('Please fill in both fields');
        }
    };

    return (
        <div className="signup-container">
            <h1 className='project-name'>ShopNGo</h1>
            <h2 className="signup-title">Sign Up</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="signup-input"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="signup-input"
            />
            <button onClick={handleSignup} className="signup-button">Sign Up</button>
            <p className='goto-chain'>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
}
