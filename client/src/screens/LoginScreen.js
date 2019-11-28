import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput,Image,} from 'react-native';
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
                    <Text style={styles.TextColorOne}>Ingresa a tu cuenta</Text>
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
                <View style={styles.InputsPassword}>
                    <View style={styles.TInput1}>
                        <Icon name="lock" size={25} color={'#FAFAFA'} style={styles.icon} />
                       <TextInput 
                        style={styles.TInput}
                        placeholder="|  Contraseña"
                        placeholderTextColor="#848482"
                        autoCompleteType="password"
                        secureTextEntry={true}
                    />
                    </View> 
                </View>
                <View style={styles.InputsForgotPassword}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Forgot')}
                    >
                        <Text style={styles.TextColorOne}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.InputsNav}>
                    <TouchableOpacity 
                        style={styles.InputsNavSignup} 
                        onPress={() => props.navigation.navigate('Signup')}
                    >
                        <Text style={styles.TextColorOne}>Registrarme</Text>
                    </TouchableOpacity>
                    <View style={styles.InputsNavEnter}>
                        <TouchableOpacity 
                            style={styles.InputsNavEnterButton} 
                            onPress={() => props.navigation.navigate('Preferences')}
                        >
                            <Text style={[styles.TextColorOne, styles.TextButton]}>Entrar</Text>
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
        backgroundColor: 'red',
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
        // backgroundColor:'purple',
        width: '100%',
        height: 20,
        paddingTop: '5%',
        paddingBottom: '5%',
    },
    TInput: {
        flex:1,
        width: '80%',
        height: '100%',
        backgroundColor: '#393939',
        borderRadius: 35,
        // paddingLeft: '%',
        fontSize: 18,
        color: '#FAFAFA',
    },
    TInput1: {
        flex:1,
        flexDirection:'row',
        width:'80%',
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
        width:'100%',
        height:'50%',
        paddingTop: '5%',
        paddingBottom: '5%',
        marginTop:-20,
        // backgroundColor:'red',
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
        height: '30%',
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
    icon:{
        // flex:1,
        justifyContent: 'center',
        padding:'3%',
        width: '15%',
        height:'55%',
        // backgroundColor: 'pink',
        marginTop:'4%',
    }
});