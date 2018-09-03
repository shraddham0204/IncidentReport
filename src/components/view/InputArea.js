import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { verticalScale } from './scaling';
const InputArea = ({ label, value, onChangeText, placeholder, secureTextEntry, multiline, numberOfLines }) => {
    const { inputStyle, labelStyle, containerStyle } = styles;
    return (<View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput secureTextEntry={secureTextEntry} placeholder={placeholder} autoCorrect={false} style={inputStyle} value={value} onChangeText={onChangeText} underlineColorAndroid='white' editable={true} maxLength={1000} multiline={true} numberOfLines={numberOfLines}/>
    </View>);
};
const styles = {
    inputStyle: {
        color: '#000',
        fontSize: verticalScale(18),
        height: verticalScale(40),
        borderBottomColor: '#F5F5F5',
        borderBottomWidth: 1,
        marginLeft: verticalScale(20),
        marginRight: verticalScale(20)
    },
    labelStyle: {
        fontSize: verticalScale(18),
        paddingLeft: verticalScale(20),
        color: '#006DB7',
        fontWeight: 'bold'
    },
    containerStyle: {
        height: verticalScale(40),
        marginTop: verticalScale(25),
        marginBottom: verticalScale(25)
    }
};
export default InputArea;
