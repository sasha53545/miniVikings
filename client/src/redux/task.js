import {createAction, createReducer} from "@reduxjs/toolkit";

const ADDTASK_REQUEST = 'ADDTASK_REQUEST';
const ADDTASK_SUCCEED = 'ADDTASK_SUCCEED';
const ADDTASK_FAILED = 'ADDTASK_FAILED';

const addTaskRequest = createAction(ADDTASK_REQUEST);
const addTaskSucceed = createAction(ADDTASK_SUCCEED);
const addTaskFailed = createAction(ADDTASK_FAILED);

const INITIAL_STATE = {
    task: '',
    loader: false,
    error: '',
};

export default createReducer(INITIAL_STATE, {
    [ADDTASK_REQUEST]: (state, action) => ({
        loader: true,
        error: '',
    }),
    [ADDTASK_SUCCEED]: (state, action) => ({
        auth: action.payload.task,
        loader: false,
        error: '',
    }),
    [ADDTASK_FAILED]: (state, action) => ({
        loader: false,
        error: action.payload.error,
    }),
});
