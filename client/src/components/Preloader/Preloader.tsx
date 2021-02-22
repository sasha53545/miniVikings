import React, {useEffect} from 'react';
import App from "../App/App";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux";
import {awsConfigThunk} from "../../redux/auth";

const Preloader: React.FC = () => {
    const dispatch = useDispatch();
    const awsConfig = useSelector((state: RootState) => state.auth.awsConfig);

    useEffect(() => {
        dispatch(awsConfigThunk());
    }, []);

    if (!awsConfig) return null;

    return (
        <App/>
    );
};

export default Preloader;
