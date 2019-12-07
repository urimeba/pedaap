import React, {Component} from 'react';
import { SafeAreaView, View,Alert, FlatList, StyleSheet, Text, Image, TextInput,TouchableOpacity, ScrollView, AsyncStorage} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Asset } from 'expo-asset';
import axios from 'axios';

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            presupuesto:0,
        }
    }

    _back=()=>{
        // Alert.alert('back')
        this.props.navigation.goBack()
    }
    _next=async()=>{
        // Alert.alert('back')
        url = await AsyncStorage.getItem("server");
        token = await AsyncStorage.getItem("userToken");
        idUser = await AsyncStorage.getItem("userId");
        // console.log(this.state.presupuesto)


        if(isNaN(this.state.presupuesto)){
            // console.log(false)
            Alert.alert("Error","Ingresa un numero válido");
        }else{
            if(this.state.presupuesto>0){
                // console.log(true)
                axios({
                    method: 'POST',
                    url: url+"compartidos/",
                    data: {usuarioPropietario:url+"usuarios/"+idUser+"/", monto:this.state.presupuesto},
                    headers: {
                        "content-type":"application/json",
                        "Authorization":"Token "+ token
                    }, 
                }).then( res => {
                    console.log(res.data.id, res.data.monto, res.data.codigo);
                    this.props.navigation.navigate('ShareBudget',{idPresupuesto: res.data.id, monto: res.data.monto, codigo:res.data.codigo })
                }).catch(err => {
                    console.log(err)
                });
            }
            else{
                // console.log("Igual a 0")
                Alert.alert("Error","Debes ingresar un número mayor a 0");
            }
            

            

        }

        



        
    }

    render(){
        return(
            <View style={styles.todo}>
                <View style={styles.presup}>
                    <Text style={styles.tituloPres}>Ingresa el presupuesto inicial</Text>
                    <TextInput 
                        style={styles.TInput}
                        placeholder="$200"
                        keyboardType = 'numeric'
                        placeholderTextColor="#848482"
                        maxLength={6}
                        onChangeText={(presupuesto) => this.setState({ presupuesto })}
                    />
                </View>
                <View style={styles.abajoNegro}>
                    <Text style={styles.tituloNegro}>¿Que vas a necesitar?</Text>
                    <View>
                        <Text>Circulos</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.InputsNavEnter}
                        onPress={this._next}>
                        <Text style={[styles.TextColorOne, styles.TextButton]}>Crear</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    todo:{
        flex: 1,
    },
    arriba:{
        // flex:1,
        marginTop: 25,
        width:'100%',
        height: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        // backgroundColor: '#FAFAFA',
        // backgroundColor:'yellow',
    },
    container: {
        // flex: 4,
        alignItems: 'center',
        flexDirection:'column',
        justifyContent: 'center',
        backgroundColor:'#FAFAFA',
        marginTop: '8%',
        height: '5%',
        width:'100%',
    },
    botones:{
        // flex:1,
        flexDirection:'row',
        alignContent: 'center',
        // justifyContent: 'center',
        width: '100%',
        height:'40%',
        padding: 5,
        // backgroundColor:'red'
    },
    tituloP:{
        fontSize: 20
    },
     textoP:{
        flexDirection:'row',
        alignItems:'center',
        // justifyContent:'center',
        width: '100%',
        height:'100%',
        marginTop: 6

        // backgroundColor:'blue'
    },
    InputsNavEnter: {
       borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        height:40,
        width: 90,
        backgroundColor: '#393939',
        marginTop: 30
    },
    TextColorOne: {
        fontSize: 18,
        color: '#848482',
    },
    TextButton: {
        fontSize: 18,
        color: '#FAFAFA',
    },
    TInput: {
       width:'100%',
        height: 70,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        padding: 10,
        fontSize: 18,
        textAlign:'center',
        marginTop: 30
    },
    presup:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        width: '100%',
        height: '40%',
        paddingRight: 40,
        paddingLeft: 40,
    },
    tituloPres:{
        textAlign:'center',
        fontSize: 25,
    },
    abajoNegro:{
        flex:1,
        alignContent:'center',
        alignItems:'center',
        // justifyContent:'center',
        width: '100%',
        height:'70%',
        marginTop: 20,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        backgroundColor: '#1E1E1E',
        padding:20
    },
    tituloNegro:{
        textAlign:'center',
        color:'white',
        fontSize:20
    }
})