import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {validate} from 'validate.js';
import ValidationComponent from 'react-native-form-validator/index';
// import validate from 'vali'

export default class FormTest extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            error1: false, //campos
            error2: false, //email valido
            errr3: false, // no encontrado
        }
        // this._correo= this._correo.bind(this)
    }



    _correo=async()=>{

        let text = this.state.email;
        if(text===""){
            this.setState({
                erro1: true
            })
        }else{
                let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (reg.test(text) === false) {
                    // console.warn("Invalid email")
                    this.setState({
                        email: text,
                        error2: true,
                    })
                    return false;
                } else {
                    this.setState({
                        email: text,
                        error1: false
                    })
                    console.log("Email is Correct");
                    this.props.navigation.navigate('Login')
                }
        }
        
    }
    render(){
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
                        <Text style={styles.TextColorOne}>Ingresa a tu correo</Text>
                    </View>
                    <View style={styles.InputsUser}>
                        <View style={styles.TInput1}>
                            <Icon name="at" size={24} color={'#FAFAFA'} style={styles.icon} />
                            <TextInput 
                                style={styles.TInput}
                                placeholder="|  Correo"
                                placeholderTextColor="#848482"
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                            />
                        </View>
                    </View>
                </View>
                 {this.state.error1 === true && (
                    <Text style={styles.warning}>Completa el campo</Text>
                )}
                 {this.state.error2 === true && (
                    <Text style={styles.warning}>El correo no es valido</Text>
                )}
                 {this.state.error3 === true && (
                    <Text style={styles.error}>El correo no esta registrado</Text>
                )}
               <View style={styles.InputsNav}>
                    <TouchableOpacity 
                        style={styles.InputsNavSignup} 
                        onPress={() => this.props.navigation.navigate('Login')}
                    >
                        <Text style={styles.TextColorOne}>Cancelar</Text>
                    </TouchableOpacity>
                    <View style={styles.InputsNavEnter}>
                        <TouchableOpacity 
                            style={styles.InputsNavEnterButton} 
                            onPress={this._correo}
                        >
                            <Text style={[styles.TextColorOne, styles.TextButton]}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
         );
        
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
    },
    Image: {
        height: '35%',
        // backgroundColor: 'red',
        borderBottomLeftRadius: 60,
    },
    Inputs: {
        height: '25%',
        marginTop: '20%',
        // backgroundColor:'red'
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
        width: '100%',
        height: '40%',
        // backgroundColor:'purple',
        paddingTop: '4%',
        paddingBottom: '4%',
        marginTop: '10%',
    },
    TInput: {
        flex: 1,
        width: '80%',
        height: '80%',
        backgroundColor: '#393939',
        borderRadius: 35,
        // paddingLeft: '%',
        paddingTop: '2%',
        marginTop: '2%',
        paddingBottom: '2%',
        fontSize: 18,
        color: '#FAFAFA',
        // backgroundColor:'blue',
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
        height: '55%',
        // backgroundColor: 'pink',
        marginTop: '5%',
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
        height: '15%',
        width: '70%',
        backgroundColor: '#393939',
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
         warning:{
        color:'#FEDB6B',
        fontSize: 16,
        marginLeft: 120,
    },
    error:{
        color:'#DE4C63',
        fontSize: 16,
        marginLeft: 70,
    },
});