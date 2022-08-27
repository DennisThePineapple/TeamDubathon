import React from 'react';
import logo from './dennis.png';
import './App.css';
import Search from "./Components/Search";
function App() {
    return (
        <div className="App">
            <body className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Search />
            </body>
        </div>
    );
}

export default App;
