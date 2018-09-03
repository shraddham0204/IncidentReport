import AUTHENTICATE from '../constants/actionTypes';

const INITIAL_STATE = { token:''
};

export default (state = INITIAL_STATE,action) => {
    console.log(state);
    switch(action.type){
        case 'authenticate':
           return {...state,token:action.payload};
        default:
            return state;
    }
};