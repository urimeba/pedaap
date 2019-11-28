import React from 'react';
import { StyleSheet, View } from 'react-native';

import MainNavigator from './src/navigation/MainNavigator';

//Pedaap v2
export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <MainNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});