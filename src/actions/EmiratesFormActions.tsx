export const ReportEvent = (report_event) => {
    console.log("report_event"+report_event);
    return {
        type: 'report_event',
        payload: report_event
    };
};

export const DateOfOccur = (date_of_occur) => {
    console.log("date_of_occur"+date_of_occur);
    return {
        type: 'date_of_occur',
        payload: date_of_occur
    };
};

export const Event1 = (_event) => {
    console.log("_event"+_event);
    return {
        type: '_event',
        payload: _event
    };
};

export const EventTitle = (event_title) => {
    console.log("event_title"+event_title);
    return {
        type: 'event_title',
        payload: event_title
    };
};

export const EventDetails = (event_details) => {
    console.log("event_details"+event_details);
    return {
        type: 'event_details',
        payload: event_details
    };
};


export const FlightNumber = (flight_number) => {
    console.log("flight_number"+flight_number);
    return {
        type: 'flight_number',
        payload: flight_number
    };
};

export const CurrentLatitude = (latitude) => {
    console.log("latitude"+latitude);
    return {
        type: 'latitude',
        payload: latitude
    };
};

export const CurrentLongitude = (longitude) => {
    console.log("longitude"+longitude);
    return {
        type: 'longitude',
        payload: longitude
    };
};

export const InjuredPerson = (injured_person) => {
    console.log("injured_person"+injured_person);
    return {
        type: 'injured_person',
        payload: injured_person
    };
};

export const Name = (name) => {
    console.log("name"+name);
    return {
        type: 'name',
        payload: name
    };
};

export const Upload = (upload) => {
    console.log("upload"+upload);
    return {
        type: 'upload',
        payload: upload
    };
};

