import React,{Component} from 'react';
import {View,Text} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {verticalScale} from './scaling';

class DateCustom extends Component{
constructor(props){
    super(props);
}


onChangeDate=(changed_date) =>{
    this.props.onDateChangee(changed_date);
}

onChangeTime= (changed_time) =>{
    console.log(changed_time)
    this.props.onSelectTime(changed_time);
}

render(){
return(
<View style={styles.dateContainerStyle}>  
<Text style={styles.labelStyle}>{this.props.title}</Text>
<DatePicker
style={styles.dateStyle}
date={this.props.selected_date}
mode="date"
placeholder="select date"
format="MM-DD-YYYY"
minDate="2016-05-01"
maxDate={this.props.max_date}
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
onDateChange={this.onChangeDate}
/>
{/*<DatePicker 
style={styles.dateStyle}
date={this.props.selected_time} 
mode="time" 
format="HH:mm" 
confirmBtnText="Confirm" 
cancelBtnText="Cancel" 
minuteInterval={10} 
onDateChange={this.onChangeTime}
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
/>*/}
</View>
);
 }

}

const styles = {
    labelStyle: {
        fontSize: verticalScale(18),
        paddingLeft: verticalScale(20),
        paddingTop: verticalScale(20),
        color: '#006DB7',
        fontWeight: 'bold'
    },
    dateContainerStyle: {
      },
      dateStyle:{
          marginLeft: verticalScale(20),
          marginRight:verticalScale(20),
          marginBottom:verticalScale(50),
          marginTop:verticalScale(10)
      }
};

export default DateCustom;