import React, {useEffect, useState} from 'react';
import '../App.css';
import faces from "../Const/Faces";
import Stop from "../Types/Stop";

type loadingSpinnerProps = {
    isAppLogo : boolean
}

export default function LoadingSpinner(props : loadingSpinnerProps) {

    const [name, setName] = useState<string>("dennis");
    const [logo, setLogo] = useState();

    const changeLogo = () => {
        setName(faces[Math.floor(Math.random() * faces.length)]);
        setLogo(require('../Images/' + name + '.png'));
    }

    useEffect(() => {
        changeLogo()
    }, [])

    return (
        <div className = "spinner-container" onClick={changeLogo}>
            <div className = "loading-spinner">
                <img src={logo} className={props.isAppLogo ?  "App-logo" : "Spinner-logo"} alt="logo" />
            </div>
        </div>
    )
}