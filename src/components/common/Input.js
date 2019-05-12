import React from 'react';
import { Text, TextInput, View } from 'react-native';

const Input = ({ label, onChangeText, placeholder, secureTextField, value }) => {

    const {
        inputStyle,
        labelStyle,
        containerStyle
    } = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                secureTextEntry={secureTextField}
                placeholder={placeholder}
                autocorrect={false}
                value={value}
                onChangeText={onChangeText}
                style={inputStyle}
            />
        </View>
    )
};

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
        height: 40,
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

// Not exported as default, so that we can export from Input.js
export { Input };