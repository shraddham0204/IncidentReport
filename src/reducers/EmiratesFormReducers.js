const INITIAL_STATE = { reportEvent: '',
    date_of_occur: '',
    _event: '',
    event_title: '',
    event_details: '',
    flight_number: '',
    latitude: '',
    longitude: '',
    injured_person: '',
    name: '',
    upload: ''
};
export default (state = INITIAL_STATE, action) => {
    console.log(action);
    console.log(state);
    switch (action.type) {
        case 'report_event':
            // return state;
            return Object.assign({}, state, { reportEvent: action.payload });
        case 'date_of_occur':
            // return state;
            return Object.assign({}, state, { date_of_occur: action.payload });
        case '_event':
            // return state;
            return Object.assign({}, state, { _event: action.payload });
        case 'event_title':
            // return state;
            return Object.assign({}, state, { event_title: action.payload });
        case 'event_details':
            // return state;
            return Object.assign({}, state, { event_details: action.payload });
        case 'flight_number':
            // return state;
            return Object.assign({}, state, { flight_number: action.payload });
        case 'latitude':
            // return state;
            return Object.assign({}, state, { latitude: action.payload });
        case 'longitude':
            // return state;
            return Object.assign({}, state, { longitude: action.payload });
        case 'injured_person':
            // return state;
            return Object.assign({}, state, { injured_person: action.payload });
        case 'name':
            // return state;
            return Object.assign({}, state, { name: action.payload });
        case 'upload':
            // return state;
            return Object.assign({}, state, { upload: action.payload });
        default:
            return state;
    }
};
