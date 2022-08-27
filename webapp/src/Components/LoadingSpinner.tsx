import React, {useEffect, useState} from 'react';
import '../App.css';
import faces from "../Const/Faces";

type loadingSpinnerProps = {
    isAppLogo : boolean
}

export default function LoadingSpinner(props : loadingSpinnerProps) {

    const [name, setName] = useState<string>("");
    const [logo, setLogo] = useState();

    const changeLogo = () => {
        let index = Math.floor(Math.random() * faces.length);

        if (faces[index] == name) {
            index = (index + 1) % faces.length;
        }

        setName(faces[index]);
        setLogo(require('../Images/' + faces[index] + '.png'));
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