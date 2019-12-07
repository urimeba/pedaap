import React, {Component} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image, TextInput,TouchableOpacity, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const preg=
    {
        pregunta:'¿Quien escribió los miserables?',
        respuestas:{
            1: 'Victor Hugo',
            2:'Edgar Allan Poe',
            3: 'Patrick Rotfuss',
            4:'JK Rowling',
        },
        correcta:1
    }

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            respuestas: '',
            puntos: 100,
            correcta: preg.correcta,
            puntosMen: false,
            error:false,
            correcta:false,
            incorrecta:false,
            resCo:0,
            resIn:0,
            presionado:false,
        }
    }

    _omitir=()=>{
        var menos= parseInt(this.state.puntos) - 50
        this.setState({puntos:menos,puntosMen:true})

        setTimeout(()=>{
            this.setState({ puntosMen:false})
        },2000)

    }

    _omitirNo=()=>{
        this.setState({error:true})

        setTimeout(()=>{
            this.setState({error:false})
        },2000)

    }

    res=(num)=>{
        if (num == preg.correcta) {
            this.setState({presionado:true,resCo:num})
        }
        
    }

    render(){
        // console.log(preg.respuestas)
        // const res = preg.respuestas
        return(
            <View style={styles.todo}>
                <View style={styles.arriba}>
                    <View style={styles.tiempo}>
                        <Text style={styles.tiempoTexto}>00:20</Text>
                    </View>
                    <View style={styles.puntos}>
                        <Text style={styles.puntsTexto}>{this.state.puntos}pts</Text>
                        {this.state.puntosMen===true &&(
                            <Text style={styles.puntosMenos}>* -50 pts</Text>
                        )}
                        {this.state.error===true &&(
                            <Text style={styles.puntosMenos}>No tienes puntos</Text>
                        )}

                    </View>
                </View>
                <View style={styles.juego}>
                    <View style={styles.cajaPregunta}>
                        <Text style={styles.pregunta}>
                            ¿Quién escribió los miserables?
                        </Text>
                    </View>
                        <View style={styles.respuestas}>
                            <TouchableOpacity style={styles.respuesta}
                                onPress={this.res(this)}
                            >
                                <Text style={styles.textoRes}>{preg.respuestas[1]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.respuesta}
                                onPress={this.res(2)}>
                                <Text style={styles.textoRes}>{preg.respuestas[2]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.respuesta}
                                onPress={this.res(3)}
                            >
                                <Text style={styles.textoRes}>{preg.respuestas[3]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.respuesta}
                                onPress={this.res(4)}
                            >
                                <Text style={styles.textoRes}>{preg.respuestas[4]}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.abajo}>
                    {this.state.puntos >= 50 &&(
                        <TouchableOpacity 
                            style={styles.btnOmitir}
                            onPress={this._omitir}
                        >
                            <Text style={styles.textobtn}>Omitir</Text>
                        </TouchableOpacity>
                    )}
                    {this.state.puntos < 50 &&(
                        <TouchableOpacity 
                            style={styles.btnOmitirNo}
                            onPress={this._omitirNo}
                        >
                            <Text style={styles.textobtn}>Omitir</Text>
                        </TouchableOpacity>
                    )}
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
        // paddingLeft:20,
        // paddingLeft:20,
        width: '100%'
    },
    puntos:{
        flex:1,
        textAlign:'right',
        paddingLeft:20,
        paddingRight:20,
        // backgroundColor:'coral'
    },
    puntosMenos:{
        color:'#DE4C63',
        textAlign: 'right',
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
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        marginTop: 7,
        width: '100%',
        borderRadius: 10,
        backgroundColor:'#71C0F2'
        // backgroundColor:'pink'
    },
    respuestaCo:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        marginTop: 7,
        width: '100%',
        borderRadius: 10,
        backgroundColor:'#FEDB6B'
        // backgroundColor:'pink'
    },
    textoRes:{
        fontSize:18,
        color:'white'
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
        fontSize:18,
        textAlign: 'right',
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
    btnOmitirNo:{
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        width: 100,
        marginTop: 20,
        backgroundColor: '#848482',
    },
    textobtn:{
        color:'white',
        fontSize:18
    }

})