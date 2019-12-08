import React, {Component} from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class FormTest extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            error1: false, //campos
            error2: false, //email valido
            error3: false, // no encontrado
        };
        // this._correo= this._correo.bind(this)
    }

    _correo = async() => {
        let text = this.state.email;
        if(text === ""){
            this.setState({
                error1: true,
                error2: false,
                error3: false,
            });
        }else{
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(text) === false) {
                this.setState({
                    email: text,
                    error2: true,
                    error1: false,
                    error3: false,
                });
                return false;
            } else {
                this.setState({
                    email: text,
                    error1: false,
                    error2: false,
                    error3: false,
                });
                console.log("Email is Correct");
                this.props.navigation.navigate('Login');
            }
        }
    }

    render(){
        return (
            <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
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
                            <View style={styles.TInput1Icon}>
                                <Icon name="at" size={24} color={'#FAFAFA'} />
                            </View>
                            <View style={styles.TInput1Input}>
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
                    <View style={styles.ErrorView}>
                        {this.state.error1 === true && (
                            <Text style={styles.warning}>*Completa el campo</Text>
                        )}
                        {this.state.error2 === true && (
                            <Text style={styles.warning}>*El correo no es valido</Text>
                        )}
                        {this.state.error3 === true && (
                            <Text style={styles.error}>*El correo no esta registrado</Text>
                        )}
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
        height: '35%',
        // backgroundColor: 'red',
        borderBottomLeftRadius: 60,
    },
    Inputs: {
        height: '65%',
        // backgroundColor:'red'
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
        color: '#FFFFFF'
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
    TextColorOne: {
        fontSize: 18,
        color: '#848482',
    },
    TextButton: {
        fontSize: 18,
        color: '#FAFAFA',
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
    ErrorView: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
    },
    warning: {
        color:'#FEDB6B',
        fontSize: 18,
    },
    error:{
        color:'#DE4C63',
        fontSize: 18,
    },
});