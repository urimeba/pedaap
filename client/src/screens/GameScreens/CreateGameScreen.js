import React, {Component} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image, TextInput,TouchableOpacity, ScrollView, AsyncStorage} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    _create=async(props)=>{
        url = await AsyncStorage.getItem("server");
        token =  await AsyncStorage.getItem("userToken");
        idUser =  await AsyncStorage.getItem("userId");
        url2 = url+"usuarios/"+idUser+"/";

        // console.log(url2);

        axios({
            method: 'POST',
            url: url+"salas/",
            data: {creador:url2, participantes:1},
            headers: {
                "content-type":"application/json",
                "Authorization":"Token " +token
            }, 
        }).then( res => {
            console.log(res.data);
            this.props.navigation.navigate('GameRoom', {idSala:res.data.id, codigo:res.data.codigo, participantes:res.data.participantes})
        }).catch(err => {
            console.log(err)
        });

        
    }

    _join=async()=>{
         this.props.navigation.navigate('JoinGame')
    }

    render(){
        return(
            <View style={styles.todo}>
                <View style={styles.titulo}>
                    <Text style={styles.textTitulo}>Selecciona una opción</Text>
                </View>
                <View style={styles.botones}>
                    <TouchableOpacity
                        onPress={this._create}
                        style={styles.btnCreate}
                    
                    >
                        <Text style={styles.btnText}>Crear Juego</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this._join}
                        style={styles.btnJoin}
                    >
                        <Text style={styles.btnText}>Unirse al Juego</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    todo:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
    },
    titulo:{
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        height:'10%',
        width:'100%',
        paddingLeft: 40,
        paddingRight: 40,
        // marginTop: 80

    },
    textTitulo:{
        alignSelf:'center',
        textAlign:'center',
        fontSize: 25
    },
    botones:{
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
        height: '60%',
        width:'100%',
        paddingLeft:40,
        paddingRight:40
    },
    btnCreate:{
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        width: '100%',
        height: '27%',
        borderRadius: 20,
        backgroundColor: '#6930BF',
    },
    btnJoin:{
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        width: '100%',
        height: '27%',
        borderRadius: 20,
        marginTop: 70,
        backgroundColor: '#71C0F2',
    },
    btnText:{
        textAlign:'center',
        fontSize: 20,
        color:'white'
    }
})