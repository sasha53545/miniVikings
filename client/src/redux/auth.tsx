import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Amplify, Auth} from 'aws-amplify';
import {
    awsConfigAsync,
    awsConfirmingSignUpAsync,
    awsSignInAsync,
    awsSignOutAsync,
    awsSignUpAsync,
    serverTokenAsync,
    updateServerTokenAsync
} from "../service/auth";

interface SignIn {
    username: string,
    password: string,
}

interface SignUp {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    repeatPassword: string
}

export const awsSessionThunk = createAsyncThunk(
    'auth/awsSession',
    async () => {
        const session = await Auth.currentSession();
        let awsToken = await session.getAccessToken().getJwtToken();
        let username = await session.getAccessToken().payload.username;
        const token = await serverTokenAsync(awsToken);
        return {token, username};
    }
);

export const signInThunk = createAsyncThunk(
    'auth/signIn',
    async (signIn: SignIn) => {
        const response = await awsSignInAsync(signIn);
        const {username} = response;
        const {accessToken, refreshToken} = await serverTokenAsync(response.signInUserSession.accessToken.jwtToken);
        return {accessToken, refreshToken, username};
    }
);

export const signUpThunk = createAsyncThunk(
    'auth/signUp',
    async (signUp: SignUp) => {
        const response = await awsSignUpAsync(signUp);
        console.log('[akazakav] signUp', response);
        return {response};
    }
);

export const signOutThunk = createAsyncThunk(
    'auth/signOut',
    async () => {
        await awsSignOutAsync();
    }
);

export const confirmingSignUpThunk = createAsyncThunk(
    'auth/confirmingSignUp',
    async ({username, confirmingCode}: any) => {
        const awsToken = await awsConfirmingSignUpAsync(username, confirmingCode);
        console.log('confirming', awsToken);
        return awsToken;
    }
);

export const awsConfigThunk = createAsyncThunk(
    'auth/awsConfig',
    async () => {
        const awsConfig = await awsConfigAsync();
        console.log('[akazakav] awsConfig', awsConfig);
        Amplify.configure(awsConfig);
        return awsConfig;
    }
);

export const updateServerTokenThunk = createAsyncThunk(
    'auth/updateServerToken',
    async (serverRefreshToken: string) => {
        const serverToken = await updateServerTokenAsync(serverRefreshToken);
        return serverToken;
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        username: null,
        awsConfig: null,
        isAuth: false,
        loader: false,
        awsToken: null,
        accessToken: null,
        refreshToken: null,
        error: '',
    },
    extraReducers: {
        //----------------UPDATE_SERVER_TOKEN-----------------------
        [updateServerTokenThunk.pending.type]: (state) => {
            state.loader = true;
            state.error = '';
        },
        [updateServerTokenThunk.fulfilled.type]: (state, action) => {
            state.isAuth = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.loader = false;
            state.error = '';
        },
        [updateServerTokenThunk.rejected.type]: (state, action) => {
            state.isAuth = false;
            state.loader = false;
            state.error = action.error.message;
        },

        //----------------AWS_SESSION-----------------------
        [awsSessionThunk.pending.type]: (state) => {
            state.loader = true;
            state.error = '';
        },
        [awsSessionThunk.fulfilled.type]: (state, action) => {
            state.username = action.payload.username;
            state.accessToken = action.payload.token.accessToken;
            state.refreshToken = action.payload.token.refreshToken;
            state.isAuth = true;
            state.loader = false;

        },
        [awsSessionThunk.rejected.type]: (state, action) => {
            state.isAuth = false;
            state.error = action.error.message;
            state.loader = false;
        },

        //----------------SIGN_IN-----------------------
        [signInThunk.pending.type]: (state) => {
            state.isAuth = false;
            state.loader = true;
            state.error = '';
        },
        [signInThunk.fulfilled.type]: (state, action) => {
            state.username = action.payload.username;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isAuth = true;
            state.loader = false;
        },
        [signInThunk.rejected.type]: (state, action) => {
            state.isAuth = false;
            state.loader = false;
            state.error = action.error.message;
        },

        //----------------SIGN_UP-----------------------
        [signUpThunk.pending.type]: (state) => {
            state.loader = true;
            state.error = '';
        },
        [signUpThunk.fulfilled.type]: (state, action) => {
            state.loader = false;
        },
        [signUpThunk.rejected.type]: (state, action) => {
            state.loader = false;
            state.error = action.error.message;
        },

        //----------------CONFIRMING_SIGN_UP-----------------------
        [confirmingSignUpThunk.pending.type]: (state) => {
            state.loader = true;
            state.error = '';
        },
        [confirmingSignUpThunk.fulfilled.type]: (state, action) => {
            state.loader = false;
        },
        [confirmingSignUpThunk.rejected.type]: (state, action) => {
            state.loader = false;
            state.error = action.error.message;
        },

        //----------------SIGN_OUT-----------------------
        [signOutThunk.pending.type]: (state) => {
            state.isAuth = true;
            state.loader = true;
            state.error = '';
        },
        [signOutThunk.fulfilled.type]: (state, action) => {
            state.isAuth = false;
            state.awsToken = action.payload;
            state.loader = false;
        },
        [signOutThunk.rejected.type]: (state, action) => {
            state.isAuth = true;
            state.loader = false;
            state.error = action.error.message;
        },

        //----------------AWS_CONFIG-----------------------
        [awsConfigThunk.pending.type]: (state) => {
            state.loader = true;
            state.error = '';
        },
        [awsConfigThunk.fulfilled.type]: (state, action) => {
            state.awsConfig = action.payload;
            state.loader = false;
        },
        [awsConfigThunk.rejected.type]: (state, action) => {
            state.loader = false;
            state.error = action.error.message;
        },
    },
    reducers: {
        updateAccessToken: (state, action) => {
            return {...state, accessToken: action.payload}
        }
    },
});

export const {updateAccessToken} = authSlice.actions;

export default authSlice.reducer;
