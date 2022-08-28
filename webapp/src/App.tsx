import React from 'react';
import './App.css';
import LoadingSpinner from "./Components/LoadingSpinner";
import RouteSearch from "./Components/Search/RouteSearch";
import AppContainer from "./Components/AppContainer";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";
import {WeekChart} from "./Components/Charts/WeekChart";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

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
