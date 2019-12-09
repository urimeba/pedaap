import React, {Component} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image, TextInput,TouchableOpacity, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const datos=[
    {
        id:'1',
        nombre:'Aixa',
    },
    {
        id:'2',
        nombre:'Aris',
    },
    {
        id:'3',
        nombre:'Uriel',
    },
    {
        id:'4',
        nombre:'Uriel',
    },
    {
        id:'5',
        nombre:'Uriel',
    },
    {
        id:'6',
        nombre:'Uriel',
    },
    {
        id:'7',
        nombre:'Uriel',
    },
    {
        id:'8',
        nombre:'Uriel',
    },
    {
        id:'9',
        nombre:'Uriel',
    },
]
export default class App extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

        caja= ({item})=>(
        <View style={styles.caja}>
            <View style={styles.imgCaja}>
                <Image/>
            </View>
            <View style={styles.datosCaja}>
                <Text style={styles.nombre}>{item.nombre}</Text>
            </View>
            <View style={styles.cerrar}>
                <TouchableOpacity style={styles.btnCerrar} onPress={this._eliminar}>
                    <Icon name="close" size={24} color={'#D5D5D5'}/>
                </TouchableOpacity>
            </View>
        </View>
    )

    render(){
        return(
            <ScrollView style={styles.todo}>
                <View style={styles.titulo}>
                    <Text style={styles.textTitulo}>Te has unido a la sala de juego</Text>
                </View>
                <View style={styles.cajaCodigo}>
                    <Text style={styles.codigo}>Espera que el juego empiece</Text>
                </View>
                <View style={styles.tituloJ}>
                        <Text style={styles.textJuga}>Creador</Text>
                    </View>
                <View style={styles.caja}>
                    <View style={styles.imgCaja}>
                        <Image/>
                    </View>
                    <View style={styles.datosCaja}>
                        <Text style={styles.nombre}>Juan Perez</Text>
                    </View>
                    <View style={styles.cerrar}></View>
                </View>
                <View style={styles.tituloJugadores}>
                    <View style={styles.tituloJ}>
                        <Text style={styles.textJuga}>Jugadores</Text>
                    </View>
                    <View style={styles.botonJ}>
                    </View>
                </View>
                 <FlatList
                    style={styles.flat}
                    data={datos}
                    renderItem={this.caja}
                    keyExtractor={item => item.id}
                />
            </ScrollView>
        )
    }
    
}

const styles= StyleSheet.create({
    todo:{
        flex:1,
        // justifyContent:'center',
        // alignContent:'center',
        // alignItems:'center',
        padding:10
    },
    titulo:{
        flex:2,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        // backgroundColor:'red',
        textAlign:'center',
        width:'100%',
        marginTop:20,
        marginBottom:20
    },
    textTitulo:{
        textAlign:'center',
        fontSize:25,
        width:'100%'
    },
    cajaCodigo:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignContent:'center',
        width:'100%',
        textAlign:'center',
        // backgroundColor:'blue'
    },
    tituloCodigo:{
        fontSize:20
    },
    codigo:{
        fontSize:20,
        color:'#71C0F2',
        textAlign:'center'
    },
    tituloJugadores:{
        flex:1,
        flexDirection:'row',
        marginTop:20

    },
    tituloJ:{
        flex:1,
        textAlign:'left',
        marginTop:20

    },
    textJuga:{
        textAlign:'left',
        fontSize:20

    },
    botonJ:{
        flex:2,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center'
    },
    btnJuga:{
        width:100,
        height:40,
        borderRadius:10,
        backgroundColor:'#FEDB6B'

    },
    flat:{
        flex:6,
        // backgroundColor:'purple'
    },
     caja:{
        justifyContent:'center',
        flex:1,
        flexDirection: 'row',
        width:'90%',
        height: 80,
        borderRadius: 10,
       shadowColor: "#000",
        shadowOffset: {
               width: 0,
               height: 2,
           },
           shadowOpacity: 0.25,
           shadowRadius: 3.84,
           elevation: 5,
        padding: 10,
        marginLeft:'5%',
        marginTop: 20,
        backgroundColor: 'white',
     },
     imgCaja:{
         justifyContent: 'center',
         width: 50,
         height: 50,
         borderRadius: 40,
         backgroundColor:'blue',
         marginTop: 5,
         marginLeft: 10,
     },
     datosCaja:{
         justifyContent: 'center',
         width:'60%',
         height:'100%',
         marginLeft: 20
     },
     nombre:{
         fontSize:15,
         color: '#8A8A8A',
     },
     aporte:{
         fontSize:15,
         color: '#6930BF',
     },
     cerrar:{
         justifyContent:'center',
         alignItems:'center',
         alignContent:'center',
         width:'20%',
         height: '100%',
     },
     btnCerrar:{
         justifyContent:'center',
         alignItems:'center',
         alignContent:'center',
         width:'100%',
         height: '100%',
     }



})