const INITIAL_STATE = { reportEvent:''
};

export default (state = INITIAL_STATE,action) => {
    //console.log(action);
    switch(action.type){
        case 'reportEvent':
           // return state;
           return {...state,incidentSum:action.payload};
           case 'reportEvent':
           // return state;
           return {...state,incidentSum:action.payload};
        default:
            return state;
    }
};