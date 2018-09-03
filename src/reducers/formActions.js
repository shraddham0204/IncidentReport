const INITIAL_STATE = { incidentType: ''
};
export default (state = INITIAL_STATE, action) => {
    //console.log(action);
    switch (action.type) {
        case 'incidentType':
            // return state;
            return Object.assign({}, state, { incidentType: action.payload });
        default:
            return state;
    }
};
