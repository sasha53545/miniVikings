import React, {useEffect, useState} from 'react';
import App from "../App/App";
import Amplify from "@aws-amplify/core";
import {awsConfigAsync} from "../../service/auth";

const Preloader: React.FC = () => {
    const [config, setConfig] = useState();

    useEffect(() => {
        awsConfigAsync()
            .then((response) => {
                Amplify.configure(response);
                setConfig(response);
            });
    }, []);

    if (!config) return null;

    return (
        <App/>
    );
};

export default Preloader;
