import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert, AsyncStorage } from 'react-native';
    KeyboardAvoidingView 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            usuario:'',
            correo:'',
            contra:'',
            tel:'',
            verContra:'',
            error1: false, //campos
            error2: false, //correo
            error3: false, //contra
        };
    }

    _registrar = async(props)=>{
        url = await AsyncStorage.getItem("server")+'registro/'
        // console.log(this.state.usuario, this.state.correo, this.state.contra, this.state.verContra, this.state.tel)

        axios({
          method: 'POST',
          url: url,
          data: {usuario:this.state.usuario, password: this.state.contra, correo: this.state.correo, telefono: this.state.tel, },
          headers: {
            "content-type":"application/json",
            // "Authorization": "Token "+ token
          },
    
          }).then( res => {
                console.log(res.data);
                Alert.alert("Correcto", "Registro correcto");
                AsyncStorage.setItem("userToken",res.data.token);
                AsyncStorage.setItem("userId",res.data.id);
                this.props.navigation.navigate("Confirm");
          }).catch(err => {
            // console.log("Error");
            // console.log(err);
            Alert.alert("Error", "El usuario, correo o teléfono ya han sido usados");
          });
    }

    _confirm = async()=>{
        let text = this.state.correo;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        console.log(JSON.stringify(this.state.correo));

        if (this.state.usuario== "" || this.state.contra=="" || this.state.tel =="" || this.state.verContra=="" || this.state.correo== "") {
            this.setState({
                error1:true,
                error2:false,
                error3:false,
            });
        } else {
            if (this.state.contra != this.state.verContra) {
                this.setState({
                    error3:true,
                    error2:false,
                    error1:false,
                });
            } else if (reg.test(text) === false) {
                this.setState({
                    email: text,
                    error2: true,
                    error1: false,
                    error3:false
                });
                return false;
            }else{
                this.setState({
                    email: text,
                    error1: false,
                    error1: false,
                    error3:false
                });
                console.log("Email is Correct");
                this._registrar()
                // this.props.navigation.navigate('Confirm',{tel: this.tel})
            }
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
                <View style={styles.Image}>
                    <Image
                        style={{ width: '100%', height: '100%', borderBottomLeftRadius: 60, }}
                        source={require('../img/principal.jpg')}
                    />
                </View>
                <View style={styles.Inputs}>
                    <View style={styles.InputsTitle}>
                        <Text style={styles.TextColorOne}>Crear una cuenta</Text>
                    </View>
                    <View style={styles.InputsUser}>
                        <View style={styles.TInput1}>
                            <View style={styles.TInput1Icon}>
                                <Icon name="account" size={24} color={'#FAFAFA'} />
                            </View>
                            <View style={styles.TInput1Input}>
                                <TextInput
                                    style={styles.TInput}
                                    placeholder="|  Usuario"
                                    placeholderTextColor="#848482"
                                    onChangeText={(usuario) => this.setState({ usuario })}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.InputsUser}>
                        <View style={styles.TInput1}>
                            <View style={styles.TInput1Icon}>
                                <Icon name="at" size={24} color={'#FAFAFA'} />
                            </View>
                            <View style={styles.TInput1Input}>
                                <TextInput
                                    style={styles.TInput}
                                    placeholder="|  Correo"
                                    placeholderTextColor="#848482"
                                    autoCapitalize='none'
                                    keyboardType='email-address'
                                    onChangeText={(correo) => this.setState({ correo })}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.InputsUser}>
                        <View style={styles.TInput1}>
                            <View style={styles.TInput1Icon}>
                                <Icon name="phone" size={24} color={'#FAFAFA'} />
                            </View>
                            <View style={styles.TInput1Input}>
                                <TextInput
                                    style={styles.TInput}
                                    placeholder="|  Telefono"
                                    placeholderTextColor="#848482"
                                    keyboardType='numeric'
                                    maxLength={10}
                                    onChangeText={(tel) => this.setState({ tel })}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.InputsUser}>
                        <View style={styles.TInput1}>
                            <View style={styles.TInput1Icon}>
                                <Icon name="lock" size={24} color={'#FAFAFA'} />                            
                            </View>
                            <View style={styles.TInput1Input}>
                                <TextInput
                                    style={styles.TInput}
                                    placeholder="|  Contraseña"
                                    placeholderTextColor="#848482"
                                    secureTextEntry={true}
                                    onChangeText={(contra) => this.setState({ contra })}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.InputsUser}>
                        <View style={styles.TInput1}>
                            <View style={styles.TInput1Icon}>
                                <Icon name="lock" size={24} color={'#FAFAFA'} />
                            </View>
                            <View style={styles.TInput1Input}>
                                <TextInput
                                    style={styles.TInput}
                                    placeholder="|  Confirmar contrseña"
                                    placeholderTextColor="#848482"
                                    secureTextEntry={true}
                                    onChangeText={(verContra) => this.setState({ verContra })}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.ErrorView}>
                        {this.state.error1=== true && (
                            <Text style={styles.warning}>*Completa los campos</Text>
                        )}
                        {this.state.error2=== true && (
                            <Text style={styles.warning}>*El correo no es valido</Text>
                        )}
                        {this.state.error3=== true && (
                            <Text style={styles.error}>*Las contraseñas no coinciden</Text>
                        )}
                    </View>
                    <View style={styles.InputsNav}>
                        <TouchableOpacity
                            style={styles.InputsNavSignup}
                            onPress={() => this.props.navigation.navigate('Login')}
                        >
                            <Text style={styles.TextColorOne}>Ya tengo cuenta!</Text>
                        </TouchableOpacity>
                        <View style={styles.InputsNavEnter}>
                            <TouchableOpacity
                                style={styles.InputsNavEnterButton}
                                onPress={this._confirm}
                            >
                                <Text style={[styles.TextColorOne, styles.TextButton]}>Siguiente</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
    },
    Image: {
        height: '25%',
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 60,
    },
    Inputs: {
        height: '75%',
    },
    InputsTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    InputsUser: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    TInput: {
        fontSize: 18,
        width: '100%',
    },
    TInput1: {
        flexDirection: 'row',
        width: '80%',
        height: 60,
        backgroundColor: '#393939',
        borderRadius: 35,
        fontSize: 18,
        color: '#FAFAFA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TInput1Icon:{
        flex: 2,
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TInput1Input: {
        flex: 9,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
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
     warning:{
        color:'#FEDB6B',
        fontSize: 18,
    },
    error:{
        color:'#DE4C63',
        fontSize: 18,
    },
    ErrorView: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
    },
});