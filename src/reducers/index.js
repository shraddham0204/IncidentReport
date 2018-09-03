import { combineReducers } from 'redux';
import Auth from './Auth';
import incidentType from './formActions';
import reportData from './EmiratesFormReducers';
import alert_state from './AlertHideShow';
export default combineReducers({
    auth: Auth,
    incidentType: incidentType,
    reportData: reportData,
    alert_state: alert_state
});
