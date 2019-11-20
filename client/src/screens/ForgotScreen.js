import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default (props) => {
    return (
        <View style={styles.container}>
            <View></>
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