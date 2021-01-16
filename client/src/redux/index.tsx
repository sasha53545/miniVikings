import {combineReducers} from 'redux';
import localstorage from './localstorage'
import task from './task'
import board from './board';
import dictionaries from './dictionaries';
import auth from "./auth";

const rootReducer = combineReducers({
    auth,
    board,
    localstorage,
    task,
    dictionaries,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
