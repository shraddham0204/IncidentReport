import AUTHENTICATE from '../constants/actionTypes';

export const AuthActions = (token) => {
    console.log("token"+token);
    return {
        type: 'authenticate',
        payload: token
    };
};