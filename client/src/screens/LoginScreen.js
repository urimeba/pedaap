import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default () => {
    return (
        <View style={styles.container}>
            <Text>LoginScreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});