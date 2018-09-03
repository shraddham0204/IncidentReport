const INITIAL_STATE = { reportEvent:'',
date_of_occur:'',
_event:'',
event_title:'',
event_details:'',
flight_number:'',
latitude:'',
longitude:'',
injured_person:'',
name:'',
upload:''
};

export default (state = INITIAL_STATE,action) => {
        console.log(action);
        console.log(state);
    switch(action.type){
            case 'report_event':
           // return state;
            return {...state,reportEvent:action.payload};
            case 'date_of_occur':
           // return state;
            return {...state,date_of_occur:action.payload};
            case '_event':
            // return state;
             return {...state,_event:action.payload};
             case 'event_title':
             // return state;
            return {...state,event_title:action.payload};
            case 'event_details':
              // return state;
               return {...state,event_details:action.payload};
            case 'flight_number':
               // return state;
                return {...state,flight_number:action.payload};
            case 'latitude':
                // return state;
                 return {...state,latitude:action.payload};
            case 'longitude':
                 // return state;
                  return {...state,longitude:action.payload};
            case 'injured_person':
                  // return state;
                   return {...state,injured_person:action.payload};
            case 'name':
                   // return state;
                    return {...state,name:action.payload};
            case 'upload':
                    // return state;
                return {...state,upload:action.payload};
        default:
            return state;
    }
};