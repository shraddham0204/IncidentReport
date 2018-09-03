const INITIAL_STATE = { hideShow: ''
};
export default (state = INITIAL_STATE, action) => {
    console.log(state);
    switch (action.type) {
        case 'hideShow':
            return Object.assign({}, state, { hideShow: action.payload });
        default:
            return state;
    }
};
