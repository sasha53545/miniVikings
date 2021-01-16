import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createBoardAsync, deleteBoardAsync, getBoardsAsync} from "../service/board";

export const getBoards = createAsyncThunk(
    'api/getBoards',
    async () => {
        const data = await getBoardsAsync();
        return data;
    }
);

export const createBoard = createAsyncThunk(
    'api/createBoard',
    async (form: object, api) => {
        // @ts-ignore
        const token = api.getState().auth.accessToken;
        const data = await createBoardAsync(form, token);
        return data;
    }
);

export const deleteBoard = createAsyncThunk(
    'api/deleteBoard',
    async (id: string) => {
        const data = await deleteBoardAsync(id);
        return data;
    }
);

export const boardSlice = createSlice({
    name: 'boards',
    initialState: {
        data: [],
        loader: false,
        error: '',
    },
    extraReducers: {

        //----------------GET_BOARDS-----------------------
        [getBoards.pending.type]: (state) => {
            state.loader = true;
            state.error = '';
        },
        [getBoards.fulfilled.type]: (state, action) => {
            state.data = action.payload;
            state.loader = false;
            state.error = '';
        },
        [getBoards.rejected.type]: (state, action) => {
            state.loader = false;
            state.error = action.error.message;
        },

        //----------------CREATE_BOARD-----------------------
        [createBoard.pending.type]: (state) => {
            state.loader = true;
            state.error = '';
        },
        [createBoard.fulfilled.type]: (state, action) => {
            state.data = action.payload;
            state.loader = false;
            state.error = '';
        },
        [createBoard.rejected.type]: (state, action) => {
            state.loader = false;
            state.error = action.error.message;
        },

        //----------------DELETE_BOARD-----------------------
        [deleteBoard.pending.type]: (state) => {
            state.loader = true;
            state.error = '';
        },
        [deleteBoard.fulfilled.type]: (state, action) => {
            state.data = action.payload;
            state.loader = false;
            state.error = '';
        },
        [deleteBoard.rejected.type]: (state, action) => {
            state.loader = false;
            state.error = action.error.message;
        },

    },
    reducers: {},
});

export default boardSlice.reducer;
