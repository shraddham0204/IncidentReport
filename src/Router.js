import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { View } from 'react-native';
import IncidentForm from './components/IncidentForm';
import WebView from './components/RenderWebview';
import SelectIncident from './components/SelectIncident';
import splashScreen from './components/splashScreen';
import Login from './components/Login';
import NavBar from './components/Navbar/Navbar';
import incidentList from './components/IncidentList';
import demoTest from './components/demoTest';
import EmiratesForm from './components/EmiratesForm';
import FormNavbar from './components/Navbar/formNavbar';
import IncidentListNavbar from './components/Navbar/IncidentListNavbar';
const RouterComponent = () => {
    return (<Router>
        <Scene key="auth">
        <Scene key="splash" component={splashScreen} hideNavBar={true}/>
        <Scene key="webView" component={WebView} hideNavBar={true}/>
        <Scene key="incidentForm" component={IncidentForm} title="New Incident Report"/>
        <Scene title="SDCPS Report" key="SelectIncident" component={SelectIncident} navTransparent={1} navBar={NavBar} renderLeftButton={<View></View>}/>
        <Scene key="login" component={Login} hideNavBar={true} initial/>
        <Scene key="incidentList" component={incidentList} navTransparent={1} navBar={IncidentListNavbar} renderLeftButton={<View></View>}/>
        <Scene key="demoTest" component={demoTest} hideNavBar={true}/>
        <Scene title="SDCPS Event Reporting" key="emiratesForm1" component={EmiratesForm} navTransparent={1} navBar={FormNavbar}/>
        </Scene>
        
        </Router>);
};
export default RouterComponent;
