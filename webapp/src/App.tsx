import React from 'react';
import './App.css';
import LoadingSpinner from "./Components/LoadingSpinner";
import RouteSearch from "./Components/Search/RouteSearch";
import AppContainer from "./Components/AppContainer";

function App() {
    return (
        <div className="App">
            <body className="App-header">
                <LoadingSpinner isAppLogo={true}/>
                <AppContainer/>
            </body>
        </div>
    );
}

export default App;
