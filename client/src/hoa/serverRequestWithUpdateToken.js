import {store} from "../index";
import {updateServerTokenThunk} from "../redux/auth";

// export const serverRequestWithUpdateToken = serverRequest => async () => {
//     const {endLifeTimeToken, refreshToken} = store.getState().auth;
//     const dispatch = store.dispatch;
//
//     if(Date.now() >= endLifeTimeToken) {
//          await dispatch(updateServerTokenThunk(refreshToken));
//      }
//
//     dispatch(serverRequest());
// };


export const serverRequestWithUpdateToken = serverRequest => {
    const {accessToken, refreshToken} = store.getState().auth;
    console.log('accessToken', accessToken);
    const dispatch = store.dispatch;

    // if(Date.now() >= endLifeTimeToken) {
    //     dispatch(updateServerTokenThunk(refreshToken));
    //     return dispatch(serverRequest());
    // }

    return dispatch(serverRequest());
};
