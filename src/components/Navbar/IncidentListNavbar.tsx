import {
    View, Image, StatusBar,Text,TouchableOpacity,AsyncStorage,Alert
   } from 'react-native';
   import React, { Component } from 'react';
   import {connect} from 'react-redux';
   import { Actions, Router, Scene,NetInfo } from 'react-native-router-flux';
   import {URL} from '../../constants/serverDetails';
   
   class IncidentListNavbar extends Component {
    constructor(props){
        super(props);
        this.state = { data: []
        }
    }
       componentWillMount(){
           AsyncStorage.getItem('token').then((value)=>{
               console.log(value);
           })
       }
     _onPressButton=()=>{
        AsyncStorage.getItem('form_Data').then((value)  => {
            let stored_data=JSON.parse(value)
            this.setState({data: stored_data.form_d
            });
              console.log(this.state.data);
              this.state.data.map((loop_data) =>{
                var form =new FormData();
                console.log(loop_data.file_url);
                if(loop_data.file_url!=1){
                 form.append("files", {
                     uri: loop_data.file_url,
                     type:'image/jpeg',
                     name: 'Evidence.jpg'
                   });
               }
               else{
                 form.append('files','1');
               }
     
                form.append("l_event_type",loop_data.l_event_type.toString());
                form.append("l_date_of_occ",loop_data.l_date_of_occ.toString());
                form.append("l_event",loop_data.l_event.toString());
                form.append("l_event_title",loop_data.l_event_title);
                form.append("l_event_details",loop_data.l_event_details);
                form.append("l_flight_num",loop_data.l_flight_num);
                form.append("l_latitude",loop_data.l_latitude.toString());
                form.append("l_longitude",loop_data.l_longitude.toString());
                form.append("l_Injured_person",loop_data.l_Injured_person.toString());
                form.append("l_Name",loop_data.l_Name);
     
                console.log(form);

                fetch(`${URL}/metricstream/m2/api/7.0/emr/submitData/`, {
                    method: 'POST',
                    body:form,
                    "headers": {
                      "authorization": this.props.auth,
                      "cache-control": "no-cache"
                    },
                    processData:false,
                    contentType: false,
                    mimeType:"multipart/form-data"
                  }).then((response) => {
                    console.log(response);
                    if(response.status==200){
                        response.json();
                       AsyncStorage.removeItem('form_Data').then((value)  => {
                            console.log("removed");
                          });
                          Alert.alert(
                            'Incident Submitted',
                            'Thanks For Submitting the Incident',
                            [
                              {text: 'OK', onPress: () => Actions.SelectIncident()},
                            ],
                            { cancelable: false }
                          )
                    }
                    else{
                      Alert.alert(
                        'Network Error',
                        'We Experienced a network error please sync again',
                        [
                          {text: 'OK'},
                        ],
                        { cancelable: false }
                      )
                    }
                  })
                  .then((responseJson) => {
                    console.log(responseJson);
                   })
                  .catch((error) => {
                  console.error(error);
                  Alert.alert(
                    'Incident Submission Failed',
                    'We witnessed a network error please try again',
                    [
                      {text: 'OK', onPress: () => Actions.SelectIncident()},
                    ],
                    { cancelable: false }
                  )
                  });

              }
                );
          });
     }
     _onLeftButton = () => {
        Actions.SelectIncident();
    }
     render() {
       return (
   <View style={styles.backgroundStyle}>
         <StatusBar />
         <View style={{ flexDirection: 'row',justifyContent:'space-around' }}>
         <TouchableOpacity onPress={this._onLeftButton}>
         <Image
         source={require('../Images/back-button.png')}
         style={styles.logoutStyle} />
         </TouchableOpacity>
          <Text style={styles.TextStyle}>{this.props.title}</Text>
          <TouchableOpacity onPress={this._onPressButton}>
            <Image
            source={require('../Images/sync.png')}
            style={styles.logoutStyle} />
            </TouchableOpacity>
       </View>
   </View>
       );
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
      // marginBottom:20,
       paddingTop:20,
       paddingBottom:20
     },
     TextStyle: {
       left: 0,
       fontSize:20,
       textAlign:"center",
       color:'#fff',
       fontWeight: 'bold',
       textShadowColor: 'rgba(0,0,0,75)',
       textShadowOffset: { width: 0, height: 1 },
       textShadowRadius: 4
     },
     logoutStyle: {
       resizeMode: 'contain',
         width: 25,
         height: 25,
         right:0,
         justifyContent: 'flex-end',
         //position: 'relative'
     }
   };
  
export default connect()(IncidentListNavbar);