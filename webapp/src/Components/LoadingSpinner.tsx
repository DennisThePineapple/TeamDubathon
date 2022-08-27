import React from 'react';
import '../App.css';
import faces from "../Const/Faces";

type loadingSpinnerProps = {
    isAppLogo : boolean
}

export default function LoadingSpinner(props : loadingSpinnerProps) {

    const name = faces[Math.floor(Math.random() * faces.length)];
    const logo = require('../Images/' + name + '.png');
    return (
        <div className = "spinner-container">
            <div className = "loading-spinner">
                <img src={logo} className={props.isAppLogo ?  "App-logo" : "Spinner-logo"} alt="logo" />
            </div>
        </div>
    )
}