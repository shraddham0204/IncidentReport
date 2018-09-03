import React, {Component} from 'react';
import {View,Text,ScrollView} from 'react-native';
import {verticalScale} from './scaling';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

class RadioButton extends Component{
    constructor(props){
        super(props);
        this.state={
            value:""
        }          
    }

    onRadioPress = (value) => {
       // console.log("RadioButton "+value);
            this.props.onRadioChange(value); 
    }

    render() {
        return (
         <View>
          <Text  style={styles.labelStyle}>{this.props.title}</Text>
          <RadioForm style ={styles.TextStyle}
          radio_props={this.props.event_types}
          buttonColor={'#2196f3'}
          animation={true}
          onPress={this.onRadioPress}
        />
        </View>
        );
      }
    }
const styles = {
    labelStyle: {
        fontSize: verticalScale(18),
        paddingLeft: verticalScale(20),
        paddingTop: verticalScale(10),
        color: '#006DB7',
        fontWeight: 'bold'
    },
    TextStyle: {
        paddingTop: verticalScale(20),
        paddingBottom: verticalScale(20),
        paddingLeft: verticalScale(20),
        alignItems: 'flex-start'
    }
};
export default RadioButton;