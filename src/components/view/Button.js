import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
const Button = ({ onPress, children }) => {
    return (<TouchableOpacity onPress={onPress} style={styles.ButtonStyle}>
<Text style={styles.TextStyle}>
    {children}
    </Text>
</TouchableOpacity>);
};
const styles = {
    TextStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 30,
        paddingBottom: 30
    },
    ButtonStyle: {
        flex: 1,
        backgroundColor: '#006DB7',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5
    }
};
export { Button };
