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

    _iniciar=()=>{
        this.props.navigation.navigate('Game')
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
                    <Text style={styles.textTitulo}>Se ha creado la sala de juego</Text>
                </View>
                <View style={styles.cajaCodigo}>
                    <Text style={styles.tituloCodigo}>Comparte tu código</Text>
                    <Text style={styles.codigo}>CY678900</Text>
                </View>
                <View style={styles.tituloJugadores}>
                    <View style={styles.tituloJ}>
                        <Text style={styles.textJuga}>Jugadores</Text>
                    </View>
                    <View style={styles.botonJ}>
                        <TouchableOpacity style={styles.btnJuga}
                        onPress={this._iniciar}>
                            <Text style={styles.textbtn}>Iniciar partida</Text>
                        </TouchableOpacity>
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
        flex:5,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        marginTop:20,
        marginBottom:20,
        // backgroundColor:'red',
        textAlign:'center',
        width:'100%'
    },
    textTitulo:{
        textAlign:'center',
        fontSize:25,
        width:'100%'
    },
    cajaCodigo:{
        flex:5,
        alignContent:'center',
        alignContent:'center',
        width:'100%',
        textAlign:'left',
        // backgroundColor:'blue',
        marginTop:20,
        marginBottom:20
    },
    tituloCodigo:{
        fontSize:20
    },
    codigo:{
        fontSize:25,
        color:'#71C0F2',
        marginTop:20
    },
    tituloJugadores:{
        flex:1,
        flexDirection:'row'

    },
    tituloJ:{
        flex:1,
        textAlign:'left'

    },
    textJuga:{
        textAlign:'left',
        fontSize:18

    },
    botonJ:{
        flex:2,
        // justifyContent:'center',
        alignItems:'center',
        alignContent:'center'
    },
    btnJuga:{
        
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        width: 130,
        height:30,
        marginLeft:60,
        borderRadius:10,
        backgroundColor:'#FEDB6B'

    },
    textbtn:{
        fontSize:18
    },
    flat:{
        flex:4,
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