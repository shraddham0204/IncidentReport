import { View, Image, StatusBar, Text, TouchableOpacity, AsyncStorage, Alert, NetInfo } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { AlertHideShow } from '../../actions';
import { URL } from '../../constants/serverDetails';
class FormNavbar extends Component {
    constructor(props) {
        super(props);
        this._onOfflineMode = () => {
            let form_detail = {};
            console.log(this.props.upload);
            if (this.props.upload != 1) {
                form_detail['file_url'] = this.props.upload.uri;
            }
            else {
                form_detail['file_url'] = 1;
            }
            console.log(this.props.report_type_val);
            form_detail['l_event_type'] = this.props.reportEvent;
            form_detail['l_date_of_occ'] = this.props.date_of_occur;
            form_detail['l_event'] = this.props._event;
            form_detail['l_event_title'] = this.props.event_title;
            form_detail['l_event_details'] = this.props.event_details;
            form_detail['l_flight_num'] = this.props.flight_number;
            form_detail['l_latitude'] = this.props.latitude;
            form_detail['l_longitude'] = this.props.longitude;
            form_detail['l_Injured_person'] = this.props.injured_person;
            form_detail['l_Name'] = this.props.name;
            console.log(form_detail);
            let details = { form_d: [] };
            console.log(details);
            AsyncStorage.getItem('form_Data').then((value) => {
                if (value != undefined) {
                    details = value;
                    console.log(details);
                    details = JSON.parse(details);
                    details.form_d.push(form_detail);
                    console.log(details);
                    AsyncStorage.setItem('form_Data', JSON.stringify(details)).then(json => console.log('success!')).catch(error => console.log('error!'));
                    AsyncStorage.getItem('form_Data').then((value) => console.log(value));
                }
                else {
                    details.form_d.push(form_detail);
                    console.log(details);
                    AsyncStorage.setItem('form_Data', JSON.stringify(details)).then(json => console.log('success!')).catch(error => console.log('error!'));
                    AsyncStorage.getItem('form_Data').then((value) => console.log(value));
                }
            });
            Alert.alert('Event Saved', 'You are currently offline! This Event is auto-saved and can be synchronized when you go online.', [
                { text: 'OK', onPress: () => Actions.SelectIncident() },
            ], { cancelable: false });
        };
        this._onSubmitData = () => {
            var form = new FormData();
            console.log("1" + this.props.upload + "2");
            if (this.props.upload != 1) {
                form.append("files", {
                    uri: this.props.upload.uri,
                    type: 'image/jpeg',
                    name: 'Evidence.jpg'
                });
            }
            else {
                form.append('files', 1);
            }
            form.append("l_event_type", this.props.reportEvent);
            form.append("l_date_of_occ", this.props.date_of_occur);
            form.append("l_event", this.props._event);
            form.append("l_event_title", this.props.event_title);
            form.append("l_event_details", this.props.event_details);
            form.append("l_flight_num", this.props.flight_number);
            form.append("l_latitude", this.props.latitude);
            form.append("l_longitude", this.props.longitude);
            form.append("l_Injured_person", this.props.injured_person);
            form.append("l_Name", this.props.name);
            console.log(form);
            fetch(`${URL}/metricstream/m2/api/7.0/emr/submitData/`, {
                method: 'POST',
                body: form,
                "headers": {
                    "authorization": this.props.auth,
                    "cache-control": "no-cache"
                },
                processData: false,
                contentType: false,
                mimeType: "multipart/form-data"
            }).then((response) => {
                console.log(response);
                if (response.status == 200) {
                    response.json();
                }
            })
                .then((responseJson) => {
                console.log(responseJson);
                Alert.alert('Incident Submitted', 'Thanks For Submitting the Incident', [
                    { text: 'OK', onPress: () => Actions.SelectIncident() },
                ], { cancelable: false });
            })
                .catch((error) => {
                console.error(error);
                Alert.alert('Incident Submission Failed', 'We witnessed a network error please try again', [
                    { text: 'OK', onPress: () => Actions.SelectIncident() },
                ], { cancelable: false });
            });
        };
        this._onPressButton = () => {
            console.log(this.props.upload.uri);
            if (this.props.event_title == "" || this.props.flight_number == "" || this.props.event_details == "" || this.props.name == "") {
                Alert.alert('Form Submission Error', 'Following Fields are mandatory \n "Event Title" \n "Event Details" \n  "Flight Number" \n "Name"', [
                    { text: 'OK' }
                ], { cancelable: false });
            }
            else {
                NetInfo.getConnectionInfo().then((connectionInfo) => {
                    console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
                    if (connectionInfo.type == "none" || connectionInfo.type == "unknown") {
                        this._onOfflineMode();
                    }
                    else {
                        this._onSubmitData();
                        //Actions.SelectIncident();
                    }
                });
            }
        };
        this._leftButton = () => {
            Actions.SelectIncident();
        };
        this.state = {
            showAlert: false,
            message: ''
        };
    }
    componentWillMount() {
        AsyncStorage.getItem('token').then((value) => {
            console.log(value);
        });
    }
    render() {
        return (<View style={styles.backgroundStyle}>
         <StatusBar />
         <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
         <TouchableOpacity onPress={this._leftButton}>
         <Image source={require('../Images/back-button.png')} style={styles.logoutStyle}/>
         </TouchableOpacity>
          <Text style={styles.TextStyle}>{this.props.title}</Text>
          <TouchableOpacity onPress={this._onPressButton}>
            <Image source={require('../Images/submit.png')} style={styles.logoutStyle}/>
            </TouchableOpacity>
       </View>
   </View>);
    }
}
const styles = {
    backgroundStyle: {
        backgroundColor: '#006DB7',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        //marginBottom:20,
        paddingTop: 20,
        paddingBottom: 20
    },
    TextStyle: {
        left: 0,
        fontSize: 20,
        textAlign: "center",
        color: '#fff',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0,75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4
    },
    logoutStyle: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
        right: 0,
        justifyContent: 'flex-end',
    }
};
const mapStateToProps = state => {
    return {
        auth: state.auth.token,
        reportEvent: state.reportData.reportEvent,
        date_of_occur: state.reportData.date_of_occur,
        _event: state.reportData._event,
        event_title: state.reportData.event_title,
        event_details: state.reportData.event_details,
        flight_number: state.reportData.flight_number,
        latitude: state.reportData.latitude,
        longitude: state.reportData.longitude,
        injured_person: state.reportData.injured_person,
        name: state.reportData.name,
        upload: state.reportData.upload
    };
};
export default connect(mapStateToProps, { AlertHideShow })(FormNavbar);
