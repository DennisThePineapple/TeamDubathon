import React from 'react';
import './App.css';
import LoadingSpinner from "./Components/LoadingSpinner";
import RouteSearch from "./Components/RouteSearch";

function App() {
    return (
        <div className="App">
            <body className="App-header">
                <LoadingSpinner isAppLogo={true}/>
                <RouteSearch />
            </body>
        </div>
    );
}

export default App;
