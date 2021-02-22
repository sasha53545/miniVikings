import {Auth} from 'aws-amplify';

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
    repeatPassword: string,
}

export const serverTokenAsync = async (awsToken: string) => {
    const response = await fetch('/auth/token', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            'awsToken': awsToken,
        }),
    });

    if (response.status < 200 || response.status >= 300) {
        throw await response.json();
    }

    return response.json();
};

export const updateServerTokenAsync = async (serverRefreshToken: string) => {
    const response = await fetch('/auth/update-token', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            'serverRefreshToken': serverRefreshToken,
        }),
    });

    if (response.status < 200 || response.status >= 300) {
        throw await response.json();
    }

    return response.json();
};

export const awsConfigAsync = async () => {
    const response = await fetch('/aws-config');

    if (response.status < 200 || response.status >= 300) {
        throw await response.json();
    }

    return response.json();
};


export const awsSignInAsync = async (signIn: SignIn) => {
    const {username, password} = signIn;

    try {
        const response = await Auth.signIn({
            username,
            password,
        });
        console.log('signedIn', response);
        return response;
    } catch (error) {
        console.log('errorSignedIn', error)
    }
};

export const awsSignUpAsync = async (signUp: SignUp) => {
    const {username, password, email} = signUp;

    const response = await Auth.signUp({
        username,
        password,
        attributes: {
            email,
        }
    });

    return response;
};

export const awsSignOutAsync = async () => {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('errorSignedOut', error);
    }
};

export const awsConfirmingSignUpAsync = async (username: string, confirmingCode: string) => {
    try {
        const response = await Auth.confirmSignUp(username, confirmingCode);

        return response;
    } catch (error) {
        console.log('errorConfirmingSignUp', error);
    }
};
