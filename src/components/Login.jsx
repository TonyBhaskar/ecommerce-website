import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/login.css';
import { Link } from 'react-router-dom';

export default function Signin({ setLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const user = existingUsers.find(user => user.username === username && user.password === password);

        if (user) {
            setLoggedIn(true);
            localStorage.setItem('currentUser', JSON.stringify(user));
            toast.success('Login successful!');
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        } else {
            toast.error('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h1 className='project-name'>ShopNGo</h1>
            <h2 className="login-title">Sign In</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
            />
            <button onClick={handleLogin} className="login-button">Sign In</button>

            <p>Don't have an account? <Link to="/signup" className='goto-chain'>Signup</Link></p>

            {/* Toast notification container */}
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}
