import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export default (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.Image}>
            </View>
            <View style={styles.Inputs}>
                <View style={styles.InputsTitle}>
                    <Text style={styles.TextColorOne}>Crear una cuenta</Text>
                </View>
                <View style={styles.InputsUser}>
                    <TextInput 
                        style={styles.TInput}
                        placeholder="|  Correo"
                        placeholderTextColor="#848482"
                    />
                </View>
                <View style={styles.InputsPassword}>
                    <TextInput 
                        style={styles.TInput}
                        placeholder="|  Usuario"
                        placeholderTextColor="#848482"
                    />
                </View>
                <View style={styles.InputsForgotPassword}>
                    <TextInput 
                        style={styles.TInput}
                        placeholder="|  Contraseña"
                        placeholderTextColor="#848482"
                    />
                </View>
                <View style={styles.InputsForgotPassword}>
                    <TextInput 
                        style={styles.TInput}
                        placeholder="|  Confirmar contraseña"
                        placeholderTextColor="#848482"
                    />
                </View>
                <View style={styles.InputsNav}>
                    <TouchableOpacity 
                        style={styles.InputsNavSignup} 
                        onPress={() => props.navigation.navigate('Signup')}
                    >
                        <Text style={styles.TextColorOne}>Ya tengo cuenta!</Text>
                    </TouchableOpacity>
                    <View style={styles.InputsNavEnter}>
                        <TouchableOpacity 
                            style={styles.InputsNavEnterButton} 
                            onPress={() => props.navigation.navigate('User')}
                        >
                            <Text style={[styles.TextColorOne, styles.TextButton]}>Siguiente</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
    },
    Image: {
        height: '35%',
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 60,
    },
    Inputs: {
        height: '65%',
    },
    InputsTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    InputsUser: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TInput: {
        width: '80%',
        height: '80%',
        backgroundColor: '#393939',
        borderRadius: 35,
        paddingLeft: '8%',
        fontSize: 18,
        color: '#FAFAFA',

    },
    InputsPassword: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    InputsForgotPassword: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    InputsNav: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    InputsNavSignup: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    InputsNavEnter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    InputsNavEnterButton: {
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        height: '40%',
        width: '75%',
        backgroundColor: '#393939',
    },
    TextColorOne: {
        fontSize: 18,
        color: '#848482',
    },
    TextButton: {
        fontSize: 24,
        color: '#FAFAFA',
    },
});