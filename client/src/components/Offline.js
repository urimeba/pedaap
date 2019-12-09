import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default Offline = () => {
    return (
        <View style={styles.container}>
            <Icon name="disconnect" size={80} color={'#DE4C63'}/>
            <Text style={styles.texto}>Lo sentimos, asegurese de que el dispositivo este conectado al Internet</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
    },
    texto: {
        color: '#DE4C63',
        fontSize: 20,
        textAlign: 'center',
        width: '80%',
    },
});