import React from 'react';
import './App.css';
import LoadingSpinner from "./Components/LoadingSpinner";
import RouteSearch from "./Components/Search/RouteSearch";
import AppContainer from "./Components/AppContainer";

function App() {
    return (
        <div className="App">
            <body className="App-header">
                <h1>
                    Bus Data Spinner
                    <h6>
                        check out data from the past week
                    </h6>
                </h1>
                <LoadingSpinner isAppLogo={true}/>
                <AppContainer/>
            </body>
        </div>
    );
}

export default App;
