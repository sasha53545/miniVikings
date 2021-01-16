import {createAction, createReducer} from "@reduxjs/toolkit";

const LOCALSTORAGE_REQUEST = 'ADDTOKEN';
const LOCALSTORAGE_SUCCEED = 'ADDTOKEN_SUCCEED';
const LOCALSTORAGE_FAILED = 'ADDTOKEN_FAILED';

const localstorageRequest = createAction(LOCALSTORAGE_REQUEST);
const localstorageSucceed = createAction(LOCALSTORAGE_SUCCEED);
const localstorageFailed = createAction(LOCALSTORAGE_FAILED);

const INITIAL_STATE = {
    loader: false,
    error: false,
};

export default createReducer(INITIAL_STATE, {
    [LOCALSTORAGE_REQUEST]: (state, action) => ({
        loader: true,
        error: false,
    }),
    [LOCALSTORAGE_SUCCEED]: (state, action) => ({
        auth: action.payload.token,
        loader: false,
        error: false,
    }),
    [LOCALSTORAGE_FAILED]: (state, action) => ({
        loader: false,
        error: action.payload.error,
    }),
});
