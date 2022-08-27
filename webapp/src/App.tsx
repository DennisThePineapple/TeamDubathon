import React from 'react';

import './App.css';
import Search from "./Components/Search";
import LoadingSpinner from "./Components/LoadingSpinner";
function App() {
    return (
        <div className="App">
            <body className="App-header">
                <LoadingSpinner isAppLogo={true}/>
                <Search />
            </body>
        </div>
    );
}

export default App;
