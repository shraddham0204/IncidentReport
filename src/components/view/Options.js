import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
const Options = ({ onPress, children, pressed }) => {
    return (<TouchableOpacity onPress={onPress} style={pressed ? styles.ButtonStylePressed : styles.ButtonStyle}>
<Text style={pressed ? styles.TextStylePressed : styles.TextStyle}>
    {children}
    </Text>
</TouchableOpacity>);
};
const styles = {
    TextStyle: {
        color: '#000000',
        fontFamily: 'System',
        fontSize: 16,
        lineHeight: 19,
        fontWeight: '600',
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 30
    },
    ButtonStyle: {
        flex: 1,
        backgroundColor: '#D8D8D8',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#D8D8D8',
        marginLeft: 5,
        marginRight: 5
    },
    TextStylePressed: {
        color: '#fff',
        fontFamily: 'System',
        fontSize: 16,
        lineHeight: 19,
        fontWeight: '600',
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 30
    },
    ButtonStylePressed: {
        flex: 1,
        backgroundColor: '#006DB7',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5
    }
};
export { Options };
