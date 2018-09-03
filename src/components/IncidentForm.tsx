import React, {Component} from 'react';
import Input from './Input';
import { View, Text,TextInput,ScrollView,Button,
PixelRatio,Image,TouchableOpacity,Alert,AsyncStorage,NetInfo
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
import { GOOGLE_API } from "../constants/serverDetails";
//import ImagePicker1 from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import { IncidentSummary } from '../actions';
import {verticalScale} from './view/scaling';
import incidentType from '../../../apps/src/components/incidentType';
import { Actions } from 'react-native-router-flux';
import { URL } from '../constants/serverDetails';

class IncidentForm extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '',desc:'',date:'',ImageSource:null ,
        latitude: null,
        longitude: null,
        error: null,
        place:'',
        time:'',
        maxDate:'',
        maxTime:'',
        images: null,
        error1:'',
        submited:false,
        //imageSelected:[],
        imageSelected:'',
        xxx:[],
        totalimages:0,
        form_data:[]
      };
      }

      componentWillMount(){
        console.log(this.props.auth);
        AsyncStorage.removeItem("form_Data").then(()=>{
      });
      }


      _changeSummary(text){
        this.setState({error1:''});
          this.props.IncidentSummary(text);
          console.log(this.props.incidentSummary);
      }

      selectPhotoTapped(){
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
        }

        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            let source = { uri: response.uri };
            this.setState({
   
              ImageSource: source
   
            });
          }
        });
      };


      componentDidMount(){
        console.log("this.props.auth "+this.props.auth);
        //Date
          let date1=new Date();
          let dd = date1.getDate();
            let mm = date1.getMonth()+1; //January is 0!
            let yyyy = date1.getFullYear();
            if(dd<10){
                dd='0'+dd;
                } 
            if(mm<10){
                 mm='0'+mm;
                } 
            let today = mm+'/'+dd+'/'+yyyy;
          console.log(today);
          this.setState({date:today});

          let time1 = date1.getHours() + ":" + date1.getMinutes();
          this.setState({ date: today });
          this.setState({ time: time1 });
          this.setState({ maxDate: today });
          this.setState({maxTime:time1});

          //Geolocation code start here
          console.log(1);
          navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
            });
            console.log(position);
            fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&key=${GOOGLE_API}`)
                  .then((res) => res.json())
                  .then((json) => {
                    if (json.status !== 'OK') {
                      throw new Error(`Geocode error: ${json.status}`);
                    }
                     console.log(json.results[0].formatted_address);
                     this.setState({place:json.results[0].formatted_address});
                  });
        }, (error) => this.setState({ error: error.message }) 
       // { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
     
    );

    fetch(`${URL}/metricstream/m2/api/7.0/users`, {
      method: 'GET',
      "headers": {
        "authorization": this.props.auth,
        "cache-control": "no-cache",
        "content-type": "application/json"
      }
}).then((response) => {
console.log(response);
response.json();
fetch(`${URL}/metricstream/m2/api/7.0/users`, {
  method: 'GET',
  "headers": {
    "authorization": this.props.auth,
    "cache-control": "no-cache",
    "content-type": "application/json"
  }
}).then((response) => {
console.log(response);
response.json();
})
.catch((error) => {
console.error(error);
});
})
.catch((error) => {
console.error(error);
});
//AsyncStorage.getItem("token").then(this.receiveLoginDetails);

      }
      receiveLoginDetails = (value) => {
        console.log(value);
        console.log(this.props.auth);
    };
      changeLocation(text){
        this.setState({place:text});
    }
    incidentDescription(text){
            this.setState({desc:text});
    }
    onSubmit(){
      this.setState({submited:true});
      let datex=this.state.date;
      datex=datex.replace(/\//g, "-");;
      console.log(this.props.incidentSummary);
      if(this.props.incidentSummary==''){
        this.setState({error1:"Please describe the Incident Summary"});
      }
      else{
        NetInfo.getConnectionInfo().then((connectionInfo) => {
          /*console.log(this.state.ImageSource);
          var form =new FormData();
          if(this.state.ImageSource!==null){
          let xy=this.state.ImageSource.uri
          form.append("files", {
            uri: xy,
            type:'image/jpeg',
            name: 'Evidence.jpg'
          });
          }
          else
          {
            form.append("files",1);
          }
          form.append("l_incident",this.props.incidentSummary);
          form.append("l_location",this.state.place);
          form.append("l_dateTime",datex);
          form.append("l_incidentType",this.props.incidentType);
          console.log(form);
          this.setState({
            form_data: [...this.state.form_data, 'abcd']
          })
          console.log(this.state.form_data);*/
          let form_detail={};
          if(this.state.ImageSource!==null){
          form_detail['file_url']=this.state.ImageSource.uri;
          }
          else{
            form_detail['file_url']=1;
          }
          form_detail['l_incident']=this.props.incidentSummary;
          form_detail['l_location']=this.state.place;
          form_detail['l_dateTime']=datex;
          form_detail['l_incidentType']=this.props.incidentType;
          console.log(form_detail);
          let details={form_d:[]};
          console.log(details);
         AsyncStorage.getItem('form_Data').then((value)  => {
           if(value !=undefined){ 
             console.log(value);
             details.form_d=value;
             console.log(details);
             details = JSON.parse(details);
             details.form_d.push(form_detail);
             console.log(details);
             AsyncStorage.setItem('form_Data', JSON.stringify(details)).then(json => console.log('success!')).catch(error => console.log('error!'));
            AsyncStorage.getItem('form_Data').then((value)  => console.log(value)); 
         }
         else{
           details.form_d.push(form_detail);
           console.log(details);
           AsyncStorage.setItem('form_Data', JSON.stringify(details)).then(json => console.log('success!')).catch(error => console.log('error!'));
          AsyncStorage.getItem('form_Data').then((value)  => console.log(value)); 
         }
        }
        ); 
      });

/*fetch(`${URL}/metricstream/m2/api/7.0/upload/postapi/`, {
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
  response.json();
})
.then((responseJson) => {
 console.log(responseJson);
  Alert.alert(
    'Incident Submitted',
    'Thanks For Submitting the Incident',
    [
      {text: 'OK', onPress: () => Actions.SelectIncident()},
    ],
    { cancelable: false }
  )
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
});*/
      }
    }

   pickMultiple() {
   /*   ImagePicker1.openPicker({
        multiple: true
      }).then(images => {
        console.log(images);
      }).then(images => {
        this.setState({
          images: images.map(i => {
            console.log('received image', i);
            return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
          })
        });
      }).catch(e => alert(e));*/
    }

    renderImage(image) {
      console.log(this.state.images);
      return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
    }
  
    renderAsset(image) {
      return this.renderImage(image);
    }

    render(){
        return(
            <ScrollView style={{backgroundColor:'white'}}>
            <View style={styles.containerStyle}>
            <Text style={styles.labelStyle}>Describe the Incident</Text>
            <TextInput
            style={styles.inputStyle}
            placeholder='Briefly describe what happened including the sequence of events,conditions present at time of incident;who and what was involved.'
            autoCorrect={false}
            underlineColorAndroid='white'
            editable = {true}
            maxLength = {1400}
            multiline = {true}
            numberOfLines = {20}
            onChangeText={this._changeSummary.bind(this)}
            value={this.props.incidentSummary}
          />
          </View>
          <View>
          <Input
          label=" Where did the incident occur?"
          placeholder="Provide the accurate location"
          onChangeText= {this.changeLocation.bind(this)}
          value= {this.state.place}
          />
          </View>
          <View style={styles.dateContainerStyle}>  
          <Text style={styles.labelStyle}>When did the incident occur?</Text>
          <DatePicker
          style={styles.dateStyle}
          date={this.state.date}
          mode="date"
          placeholder="select date"
          format="MM-DD-YYYY"
          minDate="2016-05-01"
          maxDate={this.state.maxDate}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={(date) => {this.setState({date: date})}}
        />
        <DatePicker 
        style={styles.dateStyle}
        date={this.state.time} 
        mode="time" 
        format="HH:mm" 
        confirmBtnText="Confirm" 
        cancelBtnText="Cancel" 
        minuteInterval={10} 
        onDateChange={(time) => { this.setState({ time: time }); }}
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        />
        </View>

<Text style={styles.labelStyle}>Upload Evidence</Text>
<TouchableOpacity onPress={this.selectPhotoTapped.bind(this,0)}>
            <View style={styles.ImageContainer}>
            { this.state.ImageSource === null ? <Text style={styles.textOnImage}>Select an Evidence</Text> :
              <Image style={styles.ImageContainer} source={this.state.ImageSource} />
            }
            </View>
          </TouchableOpacity>

        <View>
        <Text style={styles.errorTextStyle}>
        {this.state.error1}
        </Text>
        </View>

        <TouchableOpacity disabled={this.state.submited ? true: false} onPress={this.onSubmit.bind(this)} style={styles.ButtonStyle}>
        <Text style={styles.TextStyle}>
            Submit
            </Text>
        </TouchableOpacity>
</ScrollView>
        );
    }
}

const styles = {
    inputStyle: {
      color: '#000',
      fontSize: verticalScale(18),
      height: verticalScale(140),
      borderRadius:verticalScale(8),
      borderWidth: verticalScale(2),
      marginLeft: verticalScale(20),
      marginRight:verticalScale(20),
      marginTop:verticalScale(10)
    },
    labelStyle: {
      fontSize: verticalScale(18),
      paddingLeft: verticalScale(20),
      color:'#006DB7',
      fontWeight: 'bold'
    },
    containerStyle: {
        marginTop:verticalScale(30),
        marginBottom:verticalScale(30)
      },
      labelContainerStyle: {
        marginTop:verticalScale(30)
      },
      dateContainerStyle: {
        marginTop:verticalScale(60)
      },
      dateStyle:{
          marginLeft: verticalScale(20),
          marginRight:verticalScale(20),
          marginBottom:verticalScale(50),
          marginTop:verticalScale(10)
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF8E1'
      },
   
      ImageContainer: {
        borderRadius: 10,
        width: verticalScale(100),
        height: verticalScale(100),
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        margin:verticalScale(25)
        
      },
      textOnImage:{
        paddingLeft: verticalScale(10),
        paddingRight: verticalScale(10)
      },
      button: {
        backgroundColor: 'blue',
        marginBottom: verticalScale(10)
      },
      text: {
        color: 'white',
        fontSize: verticalScale(20),
        textAlign: 'center'
      },
      TextStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: verticalScale(16),
        fontWeight: '600',
        paddingTop: verticalScale(35),
        paddingBottom: verticalScale(35)
    },
    ButtonStyle: {
        flex:1,
        backgroundColor: '#006DB7',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: verticalScale(5),
        marginRight: verticalScale(5)
    },
    errorTextStyle: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'red'
  }

  };


  const mapStateToProps = state => {
    return {
            incidentSummary:state.reportEvent.reportEvent,
            auth:state.auth.token,
            incidentType:state.incidentType.incidentType
    };
};

export default connect(mapStateToProps,{IncidentSummary})(IncidentForm);