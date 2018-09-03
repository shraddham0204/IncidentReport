import React,{Component} from 'react';
import {View,Text,Picker} from 'react-native';
import {verticalScale} from './scaling';

class DropDown extends Component {
    constructor(props){
        super(props);
    }


    render(){
    return(
        <View>
        <Text style={styles.labelStyle}>Flight Number</Text>
        <Picker
        style={styles.TextStyle}
        selectedValue={this.props.value}
        onValueChange={(itemValue,itemIndex)=>this.props.onValChange(itemValue)}
        >
        <Picker.Item label="EK-055" value="EK-055" />
        <Picker.Item label="EK-770" value="EK-770" />
        <Picker.Item label="EK-768" value="EK-768" />
        <Picker.Item label="EK-405" value="EK-405" />
        <Picker.Item label="EK-566" value="EK-566" />
       </Picker>
       </View>
    )
}
}

const styles= {
    labelStyle: {
      fontSize: verticalScale(18),
      paddingLeft: verticalScale(20),
      color:'#006DB7',
      marginTop:verticalScale(35),
      marginBottom:verticalScale(10),
      fontWeight: 'bold'
    },
    TextStyle: {
      paddingTop: verticalScale(10),
      paddingBottom: verticalScale(10),
      paddingLeft: verticalScale(20),
      color:'black',
      marginLeft: verticalScale(35),
      marginRight: verticalScale(35),
  }
  }

export default DropDown;