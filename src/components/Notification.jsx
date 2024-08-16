import React, { useState, useEffect } from 'react';
import '../styles/Notification.css'

const Notification = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div className={`notification ${type}`}>
            {message}
        </div>
    );
};

export default Notification;
