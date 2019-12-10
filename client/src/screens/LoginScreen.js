import React, {Component} from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    AsyncStorage,
    KeyboardAvoidingView 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error1: false,
            error2: false
        };
    }

    componentDidMount(){
        this._verify();

    }

    _verify = async() =>{
        const userToken = await AsyncStorage.getItem("userToken");
        console.log(userToken);
        this.props.navigation.navigate(
            userToken ? "User":"Login"
        );

    }
    
    _singin = async(props)=>{
        if(this.state.username=='' || this.state.password==''){
            this.setState({
                error1: true,
                error2: false,
            });
        }else{
            // console.log(this.state.username, this.state.password);
            url = await AsyncStorage.getItem("server")+'login/'
            axios({
                method: 'POST',
                url: url,
                data: {username:this.state.username, password:this.state.password},
                headers: {
                    "content-type":"application/json",
                }, 
            }).then( res => {
                // console.log(res.data);
                
                token = res.data.token;
                idUser = res.data.id;
                verificado = res.data.verificado;
                tiendas = parseInt(res.data.tiendas)
                categorias = parseInt(res.data.categorias)

                AsyncStorage.setItem("userToken",token);
                AsyncStorage.setItem("userId",idUser);

                if(verificado=='1'){
                    if (tiendas==0 || categorias==0){
                        this.props.navigation.navigate("SignupPref");
                    }else{
                        this.props.navigation.navigate("User");
                    }
                    
                }else{
                    this.props.navigation.navigate('Confirm')
                }
            }).catch(err => {
                this.setState({
                    error1: false,
                    error2: true,
                });
            });
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
                        <Text style={styles.TextColorOne}>Ingresa a tu cuenta</Text>
                    </View>
                    <View style={styles.InputsUser}>
                        <View style={styles.TInput1}>
                            <View style={styles.TInput1Icon}>
                                <Icon name="account" size={24} color={'#FAFAFA'} />
                            </View>
                            <View style={styles.TInput1Input}>
                                <TextInput 
                                    style={styles.TInput}
                                    value={this.state.username}
                                    placeholder="|  Usuario"
                                    placeholderTextColor="#848482"
                                    onChangeText= { username => this.setState({username}) } 
                                    autoCapitalize='none'
                                    autoCompleteType='username'
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
                                    value={this.state.password}
                                    placeholder="|  Contraseña"
                                    placeholderTextColor="#848482"
                                    autoCompleteType="password"
                                    secureTextEntry={true}
                                    onChangeText= { password => this.setState({password}) } 
                                    autoCompleteType='password'

                                />
                            </View>
                        </View> 
                    </View>
                    <View style={styles.ErrorView}>
                        {this.state.error1 === true && (
                            <Text style={styles.warning}>*Completa los campos</Text>
                        )}
                        {this.state.error2 === true && (
                            <Text style={styles.error}>*Usuario o contraseña incorrectos</Text>
                        )}
                    </View>
                    <View style={styles.InputsForgotPassword}>
                        {/* <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Forgot')}
                        >
                            <Text style={styles.TextColorOne}>¿Olvidaste tu contraseña?</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.InputsNav}>
                        <TouchableOpacity 
                            style={styles.InputsNavSignup} 
                            onPress={() => this.props.navigation.navigate('Signup')}
                        >
                            <Text style={styles.TextColorOne}>Registrarme</Text>
                        </TouchableOpacity>
                        <View style={styles.InputsNavEnter}>
                            <TouchableOpacity 
                                style={styles.InputsNavEnterButton} 
                                onPress={this._singin}
                            >
                                <Text style={[styles.TextColorOne, styles.TextButton]}>Entrar</Text>
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
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    warning:{
        color:'#FEDB6B',
        fontSize: 18,
    },
    error:{
        color:'#DE4C63',
        fontSize: 18,
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
    TInput: {
        fontSize: 18,
        width: '100%',
        color: '#FFFFFF'
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
    ErrorView: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
    },
});