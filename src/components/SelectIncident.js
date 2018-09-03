import React, { Component } from 'react';
import { AsyncStorage, View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { FormActions, IncidentSummary } from '../actions';
import { Actions } from 'react-native-router-flux';
import { verticalScale } from './view/scaling';
import { URL } from '../constants/serverDetails';
class SelectIncident extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        /* AsyncStorage.removeItem('form_Data').then((value)  => {
           console.log("removed");
         });*/
        fetch(`${URL}/metricstream/m2/api/7.0/users`, {
            method: 'GET',
            "headers": {
                "authorization": this.props.auth,
                "cache-control": "no-cache",
                "content-type": "application/json"
            }
        }).then((response) => {
            console.log(response);
            if (response.status !== 200) {
                AsyncStorage.removeItem("token").then(() => {
                });
                Actions.login();
            }
            if (response.url != `${URL}/metricstream/m2/api/7.0/users`) {
                fetch(`${URL}/metricstream/m2/api/7.0/users`, {
                    method: 'GET',
                    "headers": {
                        "authorization": this.props.auth,
                        "cache-control": "no-cache",
                        "content-type": "application/json"
                    }
                }).then((response) => {
                    console.log(response);
                    //response.json();
                    if (response.url != `${URL}/metricstream/m2/api/7.0/users`) {
                        fetch(`${URL}/metricstream/m2/api/7.0/users`, {
                            method: 'GET',
                            "headers": {
                                "authorization": this.props.auth,
                                "cache-control": "no-cache",
                                "content-type": "application/json"
                            }
                        }).then((response) => {
                            console.log(response);
                            //response.json();
                        })
                            .catch((error) => {
                            console.error(error);
                        });
                    }
                })
                    .catch((error) => {
                    console.error(error);
                });
            }
            //response.json();
        })
            .catch((error) => {
            console.error(error);
        });
    }
    onActualPress() {
        //console.log('Actual Incident');
        //this.props.FormActions('Actual Incident');
        Actions.emiratesForm1({ image_path: require('./Images/submit.png'), image_left: require('./Images/back-button.png') });
    }
    onNmissPress() {
        this.props.FormActions('Near Miss');
        Actions.incidentForm();
    }
    render() {
        return (<View style={{ flex: 1, backgroundColor: "white", justifyContent: "space-between" }}>
          <View>
          <TouchableOpacity onPress={this.onActualPress.bind(this)} style={styles.ButtonStyle}>
          <Text style={styles.TextStyle}>
          Report new event
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { Actions.incidentList({ title: 'Incident Lists' }); }} style={styles.yellowBand}>
          <Text style={styles.BandStyle}>
          View events reported
          </Text>
          </TouchableOpacity>
          
          </View>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
        }}>
          <Image source={require('./Images/MetricStreamLogo.png')} resizeMode="cover"/>
          </View>
          </View>);
    }
}
const styles = {
    TextStyle: {
        fontSize: 28,
        textAlign: 'center',
        margin: 10,
        color: 'white',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0,75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4
    },
    viewStyle: {
        flex: 1,
        backgroundColor: '#006DB7',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    },
    ButtonStyle: {
        backgroundColor: '#006DB7',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: verticalScale(25),
        marginRight: verticalScale(25),
        marginTop: verticalScale(120),
        paddingTop: verticalScale(25),
        paddingBottom: verticalScale(25)
    },
    yellowBand: {
        marginTop: verticalScale(25),
        marginLeft: verticalScale(25),
        marginRight: verticalScale(25),
        paddingTop: verticalScale(10),
        paddingBottom: verticalScale(10)
    },
    BandStyle: {
        fontSize: 20,
        textAlign: 'center',
        margin: 1,
        color: '#006DB7',
        fontWeight: '500'
    },
};
const mapStateToProps = state => {
    return {
        auth: state.auth.token
    };
};
//export default connect(mapStateToProps,{ FormActions })(SelectIncident);
export default connect(mapStateToProps, { FormActions, IncidentSummary })(SelectIncident);
