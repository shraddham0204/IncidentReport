import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { verticalScale } from './view/scaling';
const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, multiline, numberOfLines }) => {
    const { inputStyle, labelStyle, containerStyle } = styles;
    return (<View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput secureTextEntry={secureTextEntry} placeholder={placeholder} autoCorrect={false} style={inputStyle} value={value} onChangeText={onChangeText} underlineColorAndroid='white' editable={true} maxLength={1000} multiline={true} numberOfLines={40}/>
    </View>);
};
const styles = {
    inputStyle: {
        color: '#000',
        fontSize: verticalScale(18),
        height: verticalScale(80),
        marginLeft: verticalScale(20),
        marginRight: verticalScale(20),
        marginTop: verticalScale(10),
        marginBottom: verticalScale(10)
    },
    labelStyle: {
        fontSize: verticalScale(18),
        paddingLeft: verticalScale(20),
        color: '#006DB7',
        fontWeight: 'bold'
    },
    containerStyle: {
        height: verticalScale(40),
        marginTop: verticalScale(10),
        marginBottom: verticalScale(50)
    }
};
export default Input;
