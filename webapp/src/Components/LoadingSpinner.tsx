import React from 'react';
import logo from '../dennis.png';
import '../App.css';

export default function LoadingSpinner() {
    return (
        <div className = "spinner-container">
            <div className = "loading-spinner">
                <img src={logo} className="Spinner-logo" alt="logo" />
            </div>
        </div>
    )
}