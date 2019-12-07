import React, {Component} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image, TextInput,TouchableOpacity, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const preg=
    {
        pregunta:'¿Quien escribió los miserables?',
        respuestas:[
            'Victor Hugo',
            'Edgar Allan Poe',
            'Patrick Rotfuss',
            'JK Rowling',
        ],
        correcta:1
    }

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            respuestas: preg.respuestas,
            puntos: 100
        }
    }

    render(){
        console.log(preg.respuestas)
        const res = preg.respuestas
        return(
            <View style={styles.todo}>
                <View style={styles.arriba}>
                    <View style={styles.tiempo}>
                        <Text style={styles.tiempoTexto}>00:20</Text>
                    </View>
                    <View style={styles.puntos}>
                        <Text style={styles.puntsTexto}>100 pts</Text>
                        <Text style={styles.puntosMenos}>* -50 pts</Text>
                    </View>
                </View>
                <View style={styles.juego}>
                    <View style={styles.cajaPregunta}>
                        <Text style={styles.pregunta}>
                            ¿Quién escribió los miserables?
                        </Text>
                    </View>
                    <View style={styles.respuestas}>
                        <TouchableOpacity style={styles.respuesta}>
                            <Text style={styles.textoRes}>{this.state.respuestas[1]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.respuesta}>
                            <Text style={styles.textoRes}></Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.respuesta}>
                            <Text style={styles.textoRes}></Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.respuesta}>
                            <Text style={styles.textoRes}></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.abajo}>
                    {this}
                        <TouchableOpacity 
                            style={styles.btnOmitir}
                        >
                            <Text style={styles.textobtn}>Omitir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    
}

const styles= StyleSheet.create({
    todo:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        paddingTop: 10,
    },
    arriba:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        width: '100%',
        // backgroundColor:'red'
    },
    juego:{
        flex:8,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        width: '100%',
        padding:5,
        // backgroundColor:'yellow'
    },
    abajo:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        width: '100%'
    },
    tiempo:{
        flex:1,
        padding:20,
        width: '100%'
    },
    puntos:{
        flex:1,
        padding:20
    },
    cajaPregunta:{
        flex:5,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#F0F0F0',
        // backgroundColor:'purple'
    },
    pregunta:{
        fontSize: 20
    },
    respuestas:{
        flex:5,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        width: '100%',
        padding: 5,
        // backgroundColor:'blue'
    },
    respuesta:{
        flex:1,
        marginTop: 7,
        width: '100%',
        borderRadius: 10,
        backgroundColor:'#71C0F2'
        // backgroundColor:'pink'
    },
    btnOmitir:{
        width: 100,
        height:30,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        borderRadius: 10
    },
    tiempoTexto:{
        color:'#6930BF',
        fontSize:18
    },
    puntsTexto:{
        color:'#6930BF',
        fontSize:18
    },
    btnOmitir:{
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        width: 100,
        marginTop: 20,
        backgroundColor: '#393939',
    },
    textobtn:{
        color:'white',
        fontSize:18
    }

})