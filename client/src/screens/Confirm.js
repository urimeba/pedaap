import React, {Component} from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity, 
    TextInput,Image, 
    Alert,
    KeyboardAvoidingView,
    AsyncStorage 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default class Confirm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            codigo: ''
        };
    }   

    _verify = async(props)=>{
        url = await AsyncStorage.getItem("server")+'verificar/';
        token = await AsyncStorage.getItem("userToken");
        idUser = await AsyncStorage.getItem("userId");
        console.log(url, token, idUser, this.state.codigo);

        axios({
            method: 'POST',
            url: url,
            data: {idUser:idUser, codigo:this.state.codigo},
            headers: {
                "content-type":"application/json",
                "Authorization": "Token "+ token
            },
        }).then( res => {
            tiendas = parseInt(res.data.tiendas);
            categorias = parseInt(res.data.categorias);

            if(tiendas==0 || categorias == 0){
                this.props.navigation.navigate("SignupPref");
            }else{
                this.props.navigation.navigate("User");
            }
        }).catch(err => {
            // console.log("Error");
            // console.log(err);
            Alert.alert("Datos incorrectos", "Verifica tu codigo");
        });
    }

    _enviarCorreo = async(props)=>{
        url = await AsyncStorage.getItem("server")+'enviar_correo/'
        token = await AsyncStorage.getItem("userToken")
        idUser = await AsyncStorage.getItem("userId")
        // console.log(url, token, idUser, this.state.codigo)

        axios({
          method: 'POST',
          url: url,
          data: {idUser:idUser},
          headers: {
            "content-type":"application/json",
            "Authorization": "Token "+ token
          },
    
          }).then( res => {
                // console.log(res.data);
          }).catch(err => {
            // console.log("Error");
            // console.log(err);
            Alert.alert("Error", "Algo ha fallado. Intenta nuevamente.");
          });
    }

    render(){
        return(
            <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
                <View style={styles.Image}>
                    <Image
                        style={{width:'100%', height:'100%', borderBottomLeftRadius: 60,}}
                        source={require('../img/principal.jpg')}
                    />
                </View>
                <View style={styles.Inputs}>
                    <View style={styles.InputsTitle}>
                        <Text style={styles.TextColorOne}>Ingresa a tu código</Text>
                    </View>
                    <View style={styles.InputsUser}>
                        <View style={styles.TInput1}>
                            <View style={styles.TInput1Icon}>
                                <Icon name="code-brackets" size={24} color={'#FAFAFA'} />
                            </View>
                            <View style={styles.TInput1Input}>
                                <TextInput 
                                    style={styles.TInput}
                                    placeholder="|  Código"
                                    placeholderTextColor="#848482"
                                    maxLength = {6}
                                    onChangeText= { codigo => this.setState({codigo}) } 
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.InputsNavEnter}>
                    <TouchableOpacity 
                        style={styles.InputsNavEnterButton} 
                        // onPress={() => props.navigation.navigate('SignupPref')}
                        onPress={this._verify}
                    >
                        <Text style={[styles.TextColorOne, styles.TextButton]}>Confirmar</Text>
                    </TouchableOpacity>
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
            height: '15%',
            width: '40%',
            backgroundColor: '#393939',
        },
});