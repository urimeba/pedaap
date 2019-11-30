import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput,Image, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const userInfo={username:'aixa', password:'1234'}

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
_singin = async(props)=>{
    console.log(userInfo.username, this.state.username)
    console.log(userInfo.password, this.state.password)
    if(this.state.username=="" || this.state.password==""){
        this.setState({error1: true})
        this.setState({error2: false})
    }else{
        if(userInfo.username===this.state.username && userInfo.password===this.state.password){
        Alert.alert('logged')
        this.props.navigation.navigate('User')
    }else{
        this.setState({error2: true})
        this.setState({error1: false})
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
                    <Text style={styles.TextColorOne}>Ingresa a tu cuenta</Text>
                </View>
                <View style={styles.InputsUser}>
                    <View style={styles.TInput1}>
                        <Icon name="account" size={24} color={'#FAFAFA'} style={styles.icon} />
                        <TextInput 
                            style={styles.TInput}
                            value={this.state.username}
                            onChangeText={(username) => this.setState({ username })}
                            placeholder="|  Usuario"
                            placeholderTextColor="#848482"
                            value={this.state.username}
                        />
                    </View>
                </View>
                <View style={styles.InputsPassword}>
                    <View style={styles.TInput1}>
                        <Icon name="lock" size={25} color={'#FAFAFA'} style={styles.icon} />
                       <TextInput 
                        style={styles.TInput}
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                        placeholder="|  Contraseña"
                        placeholderTextColor="#848482"
                        autoCompleteType="password"
                        secureTextEntry={true}
                        value={this.state.password}
                    />
                    </View> 
                </View>
                {this.state.error1 === true && (
                    <Text style={styles.warning}>Completa los campos</Text>
                )}
                {this.state.error2 === true && (
                    <Text style={styles.error}>Usuario o contraseña incorrectos</Text>
                )}
                {/* {this.state.error ? ( < Text > error </Text>) : (<Text>no error</Text > )} */}
                <View style={styles.InputsForgotPassword}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Forgot')}
                    >
                        <Text style={styles.TextColorOne}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>
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
                            // onPress={() => props.navigation.navigate('User')}
                            // onPress={this.onLogin.bind(this)}
                            onPress={this._singin}
                        >
                            <Text style={[styles.TextColorOne, styles.TextButton]}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
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