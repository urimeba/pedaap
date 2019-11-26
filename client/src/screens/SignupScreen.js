import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.Image}>
                <Image
                    style={{width:'100%', height:'100%', borderBottomLeftRadius: 60,}}
                    source={require('../img/principal.jpg')}
                 />
            </View>
            <View style={styles.Inputs}>
                <View style={styles.InputsTitle}>
                    <Text style={styles.TextColorOne}>Crear una cuenta</Text>
                </View>
                <View style={styles.InputsUser}>
                    <View style={styles.TInput1}>
                        <Icon name="account" size={24} color={'#FAFAFA'} style={styles.icon} />
                        <TextInput 
                            style={styles.TInput}
                            placeholder="|  Usuario"
                            placeholderTextColor="#848482"
                        />
                    </View>
                </View>
                <View style={styles.InputEmail}>
                    <View style={styles.TInput1}>
                        <Icon name="at" size={24} color={'#FAFAFA'} style={styles.icon} />
                        <TextInput 
                            style={styles.TInput}
                            placeholder="|  Correo"
                            placeholderTextColor="#848482"
                            autoCapitalize='none'
                            keyboardType='email-address'
                        />
                    </View>
                </View>
                <View style={styles.InputPhone}>
                    <View style={styles.TInput1}>
                        <Icon name="phone" size={24} color={'#FAFAFA'} style={styles.icon} />
                        <TextInput 
                            style={styles.TInput}
                            placeholder="|  Telefono"
                            placeholderTextColor="#848482"
                            keyboardType='numeric'
                            maxLength={10}
                        />
                    </View>
                </View>
                <View style={styles.InputPassword}>
                    <View style={styles.TInput1}>
                        <Icon name="lock" size={24} color={'#FAFAFA'} style={styles.icon} />
                        <TextInput 
                            style={styles.TInput}
                            placeholder="|  Contraseña"
                            placeholderTextColor="#848482"
                            secureTextEntry = {true}
                        />
                    </View>
                </View>
                <View style={styles.InputPassword}>
                    <View style={styles.TInput1}>
                        <Icon name="lock" size={24} color={'#FAFAFA'} style={styles.icon} />
                        <TextInput 
                            style={styles.TInput}
                            placeholder="|  Confirmar contrseña"
                            placeholderTextColor="#848482"
                            secureTextEntry={true}
                        />
                    </View>
                </View>
                <View style={styles.InputsNav}>
                    <TouchableOpacity 
                        style={styles.InputsNavSignup} 
                        onPress={() => props.navigation.navigate('Login')}
                    >
                        <Text style={styles.TextColorOne}>Ya tengo cuenta!</Text>
                    </TouchableOpacity>
                    <View style={styles.InputsNavEnter}>
                        <TouchableOpacity 
                            style={styles.InputsNavEnterButton} 
                            onPress={() => props.navigation.navigate('Confirm')}
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
        paddingTop:'2%',
        paddingBottom:'2%',
        width:'100%',
        height:'25%',
        // backgroundColor:'yellow',
    
    },
    InputEmail: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:'2%',
        paddingBottom:'2%',
        width:'100%',
        height:'25%',
        // backgroundColor:'yellow',
    },
    InputPhone: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:'2%',
        paddingBottom:'2%',
        width:'100%',
        height:'25%',
        // backgroundColor:'yellow',
    },
    InputPassword: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:'2%',
        paddingBottom:'2%',
        width:'100%',
        height:'25%',
        // backgroundColor:'yellow',
    },
    TInput: {
        width: '80%',
        height: '80%',
        backgroundColor: '#393939',
        borderRadius: 35,
        // paddingLeft: '8%',
        fontSize: 18,
        color: '#FAFAFA',
        paddingTop:'2%',

    },
    TInput1: {
        flex: 1,
        flexDirection: 'row',
        width: '80%',
        height: 40,
        // backgroundColor:'pink',
        backgroundColor: '#393939',
        borderRadius: 35,
        paddingLeft: '4%',
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
        fontSize: 18,
        color: '#FAFAFA',
    },
     icon: {
         // flex:1,
         justifyContent: 'center',
         padding: '3%',
         width: '15%',
         height: '100%',
        //  backgroundColor: 'pink',
         marginTop: '1%',
     }
});