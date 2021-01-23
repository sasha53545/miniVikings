import {Dispatch} from 'redux';
import {RootState} from '../redux';
import {updateServerTokenAsync} from '../service/auth';
import {updateAccessToken} from '../redux/auth';

export const updateTokenActionWrapper = (action: any, data: any) => async (dispatch: Dispatch, getState: () => RootState) => {
    const refreshToken = getState().auth.refreshToken;

    // CHECK EXPIRATION HERE

    if (!refreshToken) {
        throw Error("Refresh token must exists");
    }

    const newToken = await updateServerTokenAsync(refreshToken);

    const accessToken = newToken.accessToken;

    dispatch(updateAccessToken(accessToken));


    console.log('data', data);
    console.log('accessToken', accessToken);

    dispatch(action({data, accessToken}));
};
