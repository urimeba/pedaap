import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {validate} from 'validate.js';

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            correo:'',
            error1: '',
            error2: false,
        }
        // this._correo= this._correo.bind(this)
    }



    _correo(){
        const validation = validate('email',this.state.correo);
        console.log(validation)

        this.setState({error1: validation})

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
                                onChangeText={(correo) => this.setState({ correo })}
                                value={this.state.correo}
                            />
                        </View>
                    </View>
                </View>
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
});