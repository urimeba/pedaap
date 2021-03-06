import React, {Component} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image, TextInput,TouchableOpacity, ScrollView, AsyncStorage, Alert} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NetInfo} from 'react-native';
import axios from 'axios';


// NetInfo.isConnected.addEventListener('connectionChange', (hasInternetConnection) = console.debug(`hasInternetConnection:`, hasInternetConnection));

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            pres:200,
            presIni:200,
            aporte:0,
            aportes:0,
            monto:0,
            creador:"",
            aportacion:0,
        }
    }

    componentDidMount(){
        // console.log("#######",this.props.navigation.getParam("idPresupuesto", "NOID"))
        // console.log("$$$$$$$",this.props.navigation.getParam("idAportacion", "NOID"))

        this._getInfo();

    }

    _getInfo =async() =>{
        server = await AsyncStorage.getItem("server");
        idUser = await AsyncStorage.getItem("userId");
        token = await AsyncStorage.getItem("userToken");
        idPresupuesto = this.props.navigation.getParam("idPresupuesto", "NOID");
        idAportacion = this.props.navigation.getParam("idAportacion", "NOID");

        axios({
            method: 'GET',
            url: server+"compartidos/"+idPresupuesto+"/",
            data: {},
            headers: {
                "content-type":"application/json",
                "Authorization": "Token "+token
            },
        
            }).then( res => {
                    console.log(res.data);
                    this.setState({monto:res.data.monto})

                    axios({
                        method: 'GET',
                        url: res.data.usuarioPropietario,
                        data: {},
                        headers: {
                            "content-type":"application/json",
                            "Authorization": "Token "+token
                        },
                    
                        }).then( res => {
                                console.log(res.data);
                                this.setState({creador:res.data.username})
                        }).catch(err => {
                            console.log(err.response.data)
                        });


            }).catch(err => {
                console.log(err.response.data)
            });


            axios({
                method: 'GET',
                url: server+"usuariosCompartido"+idAportacion,
                data: {},
                headers: {
                    "content-type":"application/json",
                    "Authorization": "Token "+token
                },
            
                }).then( res => {
                        console.log(res.data);
                        this.setState({aportacion:res.data.monto})
                }).catch(err => {
                    console.log(err.response.data)
                });

    }

    _aporte=()=>{
        var total= parseInt(this.state.aporte)+ parseInt(this.state.pres);

        // console.log(total, 'total')
        // console.log(this.state.aporte,'thisaporte')
        // console.log(this.state.pres,'pres')
         var apor = parseInt(this.state.aportes) + parseInt(this.state.aporte)
         console.log(apor, 'apor')

    

        this.setState({pres:total,aportes:apor})

        if(this.state.aportacion>0){
            console.log("Mayor a cero");


            axios({
                method: 'PATCH',
                url: server+"usuariosCompartido"+idAportacion,
                data: {monto: this.state.aportacion},
                headers: {
                    "content-type":"application/json",
                    "Authorization": "Token "+token
                },
            
                }).then( res => {
                        console.log(res.data);
                        this.setState({aportacion:res.data.monto})
                }).catch(err => {
                    console.log(err.response.data)
                });

                axios({
                method: 'POST',
                url: server+"compartidos/sumAportaciones/",
                data: {idAportacion: this.props.navigation.getParam("idAportacion", "NOID")},
                headers: {
                    "content-type":"application/json",
                    "Authorization": "Token "+token
                },
            
                }).then( res => {
                        console.log(res.data);
                        // this.setState({aportacion:res.data.monto})
                }).catch(err => {
                    console.log(err.response.data)
                });

        }
        else{
            Alert.alert("Error", "Ingresa un numero mayor a cero");
        }
    }

    // aporte(aporte){
    //     console.log(aporte,'aporte')
    //     if(aporte>0){
    //         this.setState({aporte: aporte})
    //     }
    // }
    

    _combo=()=>{
        this.props.navigation.navigate('ComboBudget', );
    }

    _salir=async()=>{

        // if(this.state.pres>=this.state.presIni){
        //     const total = parseInt(this.state.pres) - parseInt(this.state.aportes)
        //     this.setState({pres:total})
        // }

        server = await AsyncStorage.getItem("server");
        idUser = await AsyncStorage.getItem("userId");
        token = await AsyncStorage.getItem("userToken");
        idAportacion = this.props.navigation.getParam("idAportacion", "NOID");

        axios({
            method: 'DELETE',
            url: server+"usuariosCompartido/"+idAportacion+"/",
            data: {},
            headers: {
                "content-type":"application/json",
                "Authorization": "Token "+token
            },
        
            }).then( res => {
                    console.log(res.data);
                    this.props.navigation.goBack();
            }).catch(err => {
                console.log(err.response.data)
            });


        
    }

    render(){
        return(
            <ScrollView style={styles.todo}>
                <View style={styles.titulo1}>
                    <Text style={styles.text1}>Presupuesto</Text>
                    <View style={styles.nombreE}>
                        <Text style={styles.textC2}>{this.state.monto}</Text> 
                    </View>
                </View>
                <TouchableOpacity style={styles.verCombos} onPress={this._combo}>
                    <Text style={styles.verCombosText}>Ver promociones</Text>
                </TouchableOpacity>
                <View style={styles.codigoC}>
                    <Text style={styles.titulo3}>Creado por:</Text>
                    <View style={styles.caja}>
                        <View style={styles.imgCaja}>
                            <Image/>
                        </View>
                        <View style={styles.datosCaja}>
                            <Text style={styles.nombre}>{this.state.creador}</Text>
                            <Text style={styles.aporte}>$200</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.titulo2}>
                    <View style={styles.abajo} >
                        <Text style={styles.text2}>Ingresa tu aporte</Text>
                        <TouchableOpacity
                            onPress={this._salir}
                            style={styles.salir}
                        >
                            <Text style={{color:'#71C0F2'}}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:3,justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%',height:'70%'}}>
                        <TextInput
                            style={styles.presu}
                            placeholder="$300"
                            placeholderTextColor = "#848482"
                            keyboardType = 'numeric'
                            onChangeText={(aportacion)=>this.setState({aportacion})}
                            value={`${this.state.aportacion}`}
                        />
                        <TouchableOpacity
                            style={styles.btnCrear}
                            onPress={this._aporte}
                        >
                            <Text style={styles.textC}>Aceptar</Text>
                        </TouchableOpacity>
                     </View>
                </View>
            </ScrollView>
        )
    }
    
}

const styles= StyleSheet.create({
    todo: {
        flex: 3,
        height: '100%',
        width:'100%'
    },
     verCombos:{
         justifyContent: 'center',
         alignContent:'center',
         alignItems:'center',
         width:140,
         height: 40,
         backgroundColor: '#FEDB6B',
         borderRadius: 20,
         textAlign:'center',
         marginLeft:'60%',
         marginTop:20
     },
     verCombosText:{
        fontSize: 15,
        color:'white'
     },
     codigoC:{
        width: '100%',
        height: 180,
        textAlign: 'left',
        // marginTop: 20,
        padding:20,
        // backgroundColor:'yellow'
     },
     caja:{
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        flex:1,
        flexDirection: 'row',
        width:'90%',
        height: 90,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
               width: 0,
               height: 2,
           },
           shadowOpacity: 0.25,
           shadowRadius: 3.84,
           elevation: 5,
        // padding: 5,
        marginLeft:'5%',
        marginTop: 10,
        backgroundColor: 'white',
     },
     imgCaja:{
         justifyContent: 'center',
         width: 50,
         height: 50,
         borderRadius: 40,
         backgroundColor:'blue',
        //  marginTop: ,
        //  marginLeft: 3,
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
      titulo1:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        width: '100%',
        height:140,
        marginTop:10,
        // backgroundColor:'purple',
        padding: 40,
    },
      titulo3:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        width: '100%',
        height:40,
        marginTop:5,
        fontSize: 18,
        // backgroundColor:'brown',
        // padding: 40,
    },
    titulo2:{
        justifyContent: 'center',
        width: '100%',
        height: 250,
        marginTop:20,
        padding:20
        // backgroundColor:'pink'
    },
    abajo:{
        flex: 1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        width:'100%',
        height:60,
        paddingLeft: 20,
        paddingLeft: 10,
        paddingRight: 20,
        // backgroundColor:'red'
    },
    text1:{
        fontSize:25,
        textAlign:'center',
        justifyContent:'center',
        marginBottom:20,
    },
    presu:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        width:'90%',
        height: 70,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        padding: 10,
        fontSize: 18,
        textAlign:'center'
    },
    nombreE:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        width:'100%',
        height: 70,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        padding: 10,
        fontSize: 18,
        textAlign:'center'
    },
    text2:{
        alignContent:'center',
        alignItems:'center',
        fontSize: 18,
        // marginBottom: 20,
        width:'90%'
    },
    salir:{
        alignContent:'center',
        alignItems:'center',
        width:'20%',
        fontSize: 18,
        color: '#71C0F2'
    },
    btnCrear:{
        justifyContent: 'center',
        alignContent:'center',
        alignContent:'center',
        borderRadius: 20,
        alignItems: 'center',
        height: 40,
        width: 100,
        marginTop:30,
        backgroundColor: '#393939',
    },
    textC:{
        textAlign:'center',
        color: 'white',
        fontSize: 18
    },
    textC2:{
        textAlign:'center',
        // color: 'white',
        fontSize: 18,
        color: "#848482"
    }
})
