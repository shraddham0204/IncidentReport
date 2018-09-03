const INITIAL_STATE = { token: ''
};
export default (state = INITIAL_STATE, action) => {
    console.log(state);
    switch (action.type) {
        case 'authenticate':
            return Object.assign({}, state, { token: action.payload });
        default:
            return state;
    }
};
