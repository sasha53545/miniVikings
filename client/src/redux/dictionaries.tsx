import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {boardIcons, boardProfessions, boardTribes} from "../service/dictionaries";

export const getBoardIcons = createAsyncThunk(
    'app/getBoardIcons',
    async () => {
        const data = await boardIcons();
        return data;
    }
);

export const getBoardTribes = createAsyncThunk(
    'app/getBoardTribes',
    async () => {
        const data = await boardTribes();
        return data;
    }
);

export const getBoardProfessions = createAsyncThunk(
    'app/getBoardProfessions',
    async () => {
        const data = await boardProfessions();
        return data;
    }
);

export const boardDictionariesSlice = createSlice({
    name: 'boardDictionaries',
    initialState: {
        icons: [],
        tribes: [],
        professions: [],
        loader: false,
        error: '',
    },
    extraReducers: {

        //----------------GET_ICONS-----------------------
        [getBoardIcons.pending.type]: (state) => {
            state.loader = true;
            state.error = '';
        },
        [getBoardIcons.fulfilled.type]: (state, action) => {
            state.icons = action.payload;
            state.loader = false;
            state.error = '';
        },
        [getBoardIcons.rejected.type]: (state, action) => {
            state.loader = false;
            state.error = action.error.message;
        },

        //----------------GET_TRIBES-----------------------
        [getBoardTribes.pending.type]: (state) => {
            state.loader = true;
            state.error = '';
        },
        [getBoardTribes.fulfilled.type]: (state, action) => {
            state.tribes = action.payload;
            state.loader = false;
            state.error = '';
        },
        [getBoardTribes.rejected.type]: (state, action) => {
            state.loader = false;
            state.error = action.error.message;
        },

        //----------------GET_PROFESSIONS-----------------------
        [getBoardProfessions.pending.type]: (state) => {
            state.loader = true;
            state.error = '';
        },
        [getBoardProfessions.fulfilled.type]: (state, action) => {
            state.professions = action.payload;
            state.loader = false;
            state.error = '';
        },
        [getBoardProfessions.rejected.type]: (state, action) => {
            state.loader = false;
            state.error = action.error.message;
        },
    },
    reducers: {},
});

export default boardDictionariesSlice.reducer;
