import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const LoadingSpinner = ({ spinnerSize }) => {
    return (
        <View style={styles.loadingSpinnerStyle}>
            <ActivityIndicator size={spinnerSize || 'large'} />
        </View>
    );
}

const styles = {
    loadingSpinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export { LoadingSpinner };