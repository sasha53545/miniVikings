import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {createBoardAsync, deleteBoardAsync, getBoardsAsync} from "../service/board";
import {updateTokenActionWrapper} from '../hoa/updateTokenActionWrapper';

export const getBoards = createAsyncThunk(
    'api/getBoards',
    async ({data, accessToken}: any) => {
        const response = await getBoardsAsync(accessToken);
        console.log('[akazakav] board', response);
        return response;
    }
);

// @ts-ignore
export const getBoardsWrapped = (): any => updateTokenActionWrapper(getBoards);

export const createBoard = createAsyncThunk(
    'api/createBoard',
    async ({data, accessToken}: any) => {
        const response = await createBoardAsync(data, accessToken);
        return response;
    }
);

export const createBoardWrapped = (board: any): any => updateTokenActionWrapper(createBoard, board);

export const deleteBoard = createAsyncThunk(
    'api/deleteBoard',
    async ({data, accessToken}: any) => {
        const response = await deleteBoardAsync(data, accessToken);
        return response;
    }
);

export const deleteBoardWrapped = (id: any): any => updateTokenActionWrapper(deleteBoard, id);

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
