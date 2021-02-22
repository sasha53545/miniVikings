import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    boardIconsAsync,
    boardProfessionsAsync,
    boardTribesAsync
} from "../service/dictionaries";
import {updateTokenActionWrapper} from "../hoa/updateTokenActionWrapper";

export const getBoardIcons = createAsyncThunk(
    'app/getBoardIcons',
    async ({data, accessToken}: any) => {
        const response = await boardIconsAsync(accessToken);
        return response;
    }
);

// @ts-ignore
export const getBoardIconsWrapped = (): any => updateTokenActionWrapper(getBoardIcons);

export const getBoardTribes = createAsyncThunk(
    'app/getBoardTribes',
    async ({data, accessToken}: any) => {
        const response = await boardTribesAsync(accessToken);
        return response;
    }
);

// @ts-ignore
export const getBoardTribesWrapped = (): any => updateTokenActionWrapper(getBoardTribes);

export const getBoardProfessions = createAsyncThunk(
    'app/getBoardProfessions',
    async ({data, accessToken}: any) => {
        const response = await boardProfessionsAsync(accessToken);
        return response;
    }
);

// @ts-ignore
export const getBoardProfessionsWrapped = (): any => updateTokenActionWrapper(getBoardProfessions);

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
