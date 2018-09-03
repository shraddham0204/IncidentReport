import React, {Component} from 'react';
import {View,Text,ScrollView,Picker,PixelRatio,TouchableOpacity,Image,AsyncStorage,TextInput} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import AwesomeAlert from 'react-native-awesome-alerts';

import {verticalScale} from './view/scaling';
import RadioButton from './view/RadioButton';
import DateCustom from './view/DateCustom';
import InputArea from './view/InputArea';
import DropDown from './view/DropDown';

import { ReportEvent,DateOfOccur,Event1,EventTitle,EventDetails,FlightNumber,CurrentLatitude,CurrentLongitude,InjuredPerson,Name,Upload,AlertHideShow } from '../actions';
//import { ReportEvent, Event1, FlightNumber, InjuredPerson, CurrentLatitude, CurrentLongitude } from '../actions/EmiratesFormActions';


class EmiratesForm extends Component{
    constructor(props){
        super(props);
        this.state={
            report_type:1,
            select_date:"",
            select_time:"",
            maxDate:"",
            event:1,
            eventTitle:"",
            eventDetails:"",
            latitude:"",
            longitude:"",
            flight_num:"EK-055",
            injured:1,
            ImageSource:null,
            name:"",
            showAlert:false
        }          
    }

    componentWillMount(){

        /*AsyncStorage.removeItem("form_Data").then(()=>{
        });*/


        //initializing props
        this.props.ReportEvent(1);
        this.props.Event1(1);
        this.props.InjuredPerson(1);
        this.props.EventTitle('');
        this.props.EventDetails('');
        this.props.Name('');
        this.props.FlightNumber('EK-055');
        this.props.Upload(1);

        //this.props.AlertHideShow(false);


        
        //console.log(this.props.hideShow);


        //get the current and time
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


          let time1 = date1.getHours() + ":" + date1.getMinutes();
          this.setState({maxDate:today,select_date:today,select_time:time1});
          this.props.DateOfOccur(today);

          //Geolocation Fed Latitude and Longitude
          navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
            this.props.CurrentLatitude(position.coords.latitude);
            this.props.CurrentLongitude(position.coords.longitude);
        }
    );
          }

    handleReportChange = (report_type_val) => {
        this.setState({report_type: report_type_val});
        this.props.ReportEvent(report_type_val);
            if(report_type_val==1){
                if(this.state.event==2){
                        this.setState({event:1});
                }
                 else if(this.state.event==6) {
                    this.setState({event:3});
                }
            }
            else if(report_type_val==2){
                if(this.state.event==1){
                        this.setState({event:2});
                }
                 else if(this.state.event==3) {
                    this.setState({event:6});
                }
            }
    }
    
    _changeDate=(value) =>{
        this.setState({select_date:value});

        this.props.DateOfOccur(`${this.state.select_date} ${this.state.select_time}`);
    }
    _selectedTime=(value)=>{
        console.log(value);
        this.setState({select_time:value});
        this.props.DateOfOccur(`${this.state.select_date} ${this.state.select_time}`);
    }

    handleEventChange = (value) => {
        this.setState({event:value});
        this.props.Event1(value);
    }

    _eventTitle = (value) => {
        this.setState({eventTitle:value});
        this.props.EventTitle(value);
    }

    _eventDetails = (value) => {
        this.setState({eventDetails:value});
        this.props.EventDetails(value);
    }
    _name = (value) => {
        this.setState({name:value});
        this.props.Name(value);
    }
    _onValChange = (value) =>{
        console.log(value);
        this.setState({flight_num:value});
        this.props.FlightNumber(value);
    }
    handleInjuredPerson=(value) => {
        this.setState({injured:value});  
        this.props.InjuredPerson(value);
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
            this.props.Upload(source);
          }
        });
      }

      hideAlert = () =>{
        this.props.AlertHideShow(false);
    }

   

    render() {
        const event_types = [
            {label: 'Air Safety   ', value: 1 },
            {label: 'Ground Safety', value: 2 }
          ];
          const event_air_safety = [
            {label: 'Wake Turbulence   ', value: 1 },
            {label: 'Loss of Communication', value: 3 }
          ];
          const event_ground_Safety = [
            {label: 'GSE Accident   ', value: 2 },
            {label: 'GSE Malfunction', value: 6 }
          ];
          const injured_person = [
            {label: 'Passenger   ', value: 1 },
            {label: 'Staff', value: 2 }
          ];
        return (
         <ScrollView style={{backgroundColor:'white'}}>
         <RadioButton title="Report Event" event_types={event_types}
         onRadioChange={this.handleReportChange}
         />
         <DateCustom selected_date={this.state.select_date} selected_time={this.state.select_time} title="Date of Occurrence" max_date={this.state.maxDate}
            onDateChangee = {this._changeDate} onSelectTime = {this._selectedTime}
         />
         <RadioButton title="Event" event_types={(this.state.report_type==1)?event_air_safety:event_ground_Safety}
         onRadioChange={this.handleEventChange}
         />
         <InputArea
         label="Event Title"
         placeholder="Event Title"
         onChangeText= {this._eventTitle}
         value= {this.state.eventTitle}
         numberOfLines={20}
         multiline={false}
         />
         <InputArea
         label="Event Details"
         placeholder="Event Details"
         onChangeText= {this._eventDetails}
         value= {this.state.eventDetails}
         numberOfLines={60}
         multiline={true}
         />
         <DropDown value={this.state.flight_num} onValChange={this._onValChange.bind(this)}/>
         <View>
         <Text style={styles.labelStyle}>Current Location</Text>
         <View style={{flexDirection: 'row'}}>
         <Text style={styles.TextStyle}>Latitude : </Text>
         <Text style={styles.TextStyle}>{parseFloat(this.state.latitude).toFixed(2)}</Text>
         </View>
         <View style={{flexDirection: 'row'}}>
         <Text style={styles.TextStyle}>Longitude : </Text>
         <Text style={styles.TextStyle}>{parseFloat(this.state.longitude).toFixed(2)}</Text>
         </View>
         </View>
        <RadioButton title="Injured Person" event_types={injured_person}
        onRadioChange={this.handleInjuredPerson}
        />
        <InputArea
        label="Name"
        placeholder="Name"
        onChangeText= {this._name}
        value= {this.state.name}
        numberOfLines={10}
        multiline={false}
        />
        <View style={this.state.ImageSource === null?{flexDirection: 'row'}:{flexDirection: 'column'}}>
       <Text style={styles.labelStyle}>Evidence</Text>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this,0)}>
        <View style={styles.ImageContainer1}>
            { this.state.ImageSource === null ? <View style={styles.ImageTextContainer}><Text style={styles.textOnImage}>Browse</Text></View>:
            <View style={styles.ImageContainer}><Image style={styles.ImageContainer} source={this.state.ImageSource} /></View>
            }
            </View>
        </TouchableOpacity>
        </View>
        </ScrollView>
        );
      }
    }
const styles= {
  labelStyle: {
    fontSize: verticalScale(18),
    paddingLeft: verticalScale(20),
    color:'#006DB7',
    fontWeight: 'bold',
    marginTop:verticalScale(35),
    marginBottom:verticalScale(10)
  },
  TextStyle: {
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(10),
    paddingLeft: verticalScale(20),
    color:'black',
    fontWeight: 'bold',
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
  ImageContainer1: {
  },
  textOnImage:{
    paddingLeft: verticalScale(10),
    paddingRight: verticalScale(10),
    color:'#006DB7',
    fontSize:20
  },
  ImageTextContainer:{
    borderRadius: 4,
    width: verticalScale(100),
    height: verticalScale(30),
    borderColor: '#979797',
    borderWidth: 1 / PixelRatio.get(),
    marginTop:verticalScale(35),
    marginBottom:verticalScale(10),
    marginLeft:verticalScale(30),
    backgroundColor:'#F5F5F5',
  }
}

const mapStateToProps = state => {
    return {
            hideShow:state.alert_state.hideShow
    };
  };

export default connect(mapStateToProps,{ReportEvent,DateOfOccur,Event1,EventTitle,EventDetails,FlightNumber,CurrentLatitude,CurrentLongitude,InjuredPerson,Name,Upload,AlertHideShow})(EmiratesForm);