import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import reducer from './redux';
import thunk from "redux-thunk";
import Preloader from "./components/Preloader/Preloader";

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production',
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Preloader/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
