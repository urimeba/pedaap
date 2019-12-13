import React, {Component} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image, TextInput,TouchableOpacity, ScrollView, AsyncStorage, Alert} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

let datos=[
    {
        id:'1',
        nombre:'Aixa',
        aporte:'$200',
    },
    {
        id:'2',
        nombre:'Aris',
        aporte:'$200',
    },
    {
        id:'3',
        nombre:'Uriel',
        aporte:'$200',
    },
    {
        id:'4',
        nombre:'Uriel',
        aporte:'$200',
    },
    {
        id:'5',
        nombre:'Uriel',
        aporte:'$200',
    },
    {
        id:'6',
        nombre:'Uriel',
        aporte:'$200',
    },
    {
        id:'7',
        nombre:'Uriel',
        aporte:'$200',
    },
    {
        id:'8',
        nombre:'Uriel',
        aporte:'$200',
    },
    {
        id:'9',
        nombre:'Uriel',
        aporte:'$200',
    },
]

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            datos: []

        }
    }

    componentDidMount(){
        this._getInfo();
      }

    _getInfo = async() =>{
        // console.log("HOLA-----");
        // console.log(JSON.stringify(this.props.navigation.getParam('idPresupuesto', 'NO-ID')));
        id = JSON.stringify(this.props.navigation.getParam('idPresupuesto', 'NO-ID'));
        id= id.replace('"','');
        id= id.replace('"','');
        url = await AsyncStorage.getItem("server");
        token = await AsyncStorage.getItem("userToken");
        // console.log(id, url);

        axios({
            method: 'POST',
            url: url+"usuariosCompartido/getUsuariosCompartido/",
            data: {id:id},
            headers: {
                "content-type":"application/json",
                "Authorization":"Token "+ token
            }, 
        }).then( res => {
            a = res.data.datos;
            let j = a.replace(/'/g,'"');
            let json_data = JSON.parse(j);
            let data = [];
            for(var i in json_data){
                data.push(json_data[i]);
            }
            this.setState({datos: data})
            // console.log(data)
            

        }).catch(err => {
            console.log(err)
        });
    }

    _eliminar=(id, aportador)=>{
        // console.log(id);

        Alert.alert(
            'Confirmar',
            '¿Deseas eliminar a '+aportador+" de este presupuesto?",
            [
              {
                text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel',
              },

              {text: 'OK', onPress: () => this._deleteUser(id)},
            ],
            {cancelable: false},
          );

    }

    _deleteUser= async(id) =>{
        url = await AsyncStorage.getItem("server");
        token = await AsyncStorage.getItem("userToken");
        // console.log(id, url);
        axios({
            method: 'DELETE',
            url: url+"usuariosCompartido/"+id+"/",
            data: {},
            headers: {
                "content-type":"application/json",
                "Authorization":"Token "+ token
            }, 
        }).then( res => {
            console.log(res.data);
            this._getInfo();
        }).catch(err => {
            console.log(err)
        });

    }

    _combo = () => {
        this.props.navigation.navigate('ComboBudget')
    }

    caja= ({item})=>(
        <TouchableOpacity 
        onPress={()=>{this.props.navigation.navigate('AportBudget')}}
        style={styles.caja}>
            <View style={styles.imgCaja}>
                <Image/>
            </View>
            <View style={styles.datosCaja}>
                <Text style={styles.nombre}>{item.usuario}</Text>
                <Text style={styles.aporte}>{item.monto}</Text>
            </View>
            <View style={styles.cerrar}>
                <TouchableOpacity style={styles.btnCerrar} onPress={() => this._eliminar(item.id, item.usuario)}>
                    <Icon name="close" size={24} color={'#D5D5D5'}/>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )

    render(){
        return(
            <ScrollView style={styles.todo}>
                <View style={styles.presupuesto}>
                    <Text style={styles.textoPresup}>Presupuesto</Text>
                    <Text style={styles.BoxPresup}>{JSON.stringify(this.props.navigation.getParam('monto', 'NO-MONTO'))}</Text>
                </View>
                <TouchableOpacity style={styles.verCombos} onPress={this._combo}>
                    <Text style={styles.verCombosText}>Ver promociones</Text>
                </TouchableOpacity>
                <View style={styles.codigoC}>
                    <Text style={styles.titulo1}>Comparte tu código</Text>
                    <Text style={styles.codigo}>{JSON.stringify(this.props.navigation.getParam('codigo', 'NO-CODE'))}</Text>
                </View>
                <View style={styles.aportadores}>
                    <Text style={styles.titulAporta}>Aportadores</Text>
                </View>
                <FlatList
                    style={styles.flat}
                    data={this.state.datos}
                    renderItem={this.caja}
                    keyExtractor={item => item.id.toString()}
                />
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
    arriba: {
        // flex:1,
        // marginTop: 25,
        width: '100%',
        height: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        // backgroundColor: '#FAFAFA',
        // backgroundColor:'orange',
    },
     presupuesto:{
         justifyContent: 'center',
         alignItems:'center',
         alignContent:'center',
         width: '100%',
         height:200,
         paddingLeft:40,
         paddingRight:40,
         marginTop:10,
        //  backgroundColor:'red'
     },
     textoPresup:{
         justifyContent: 'center',
         textAlign:'center',
         fontSize:25
     },
     BoxPresup:{
         justifyContent: 'center',
         alignItems:'center',
         alignContent:'center',
         width:'80%',
         height: '30%',
         backgroundColor: '#F0F0F0',
         color: '#8A8A8A',
         borderRadius: 20,
         marginTop: 20,
         textAlign: 'center',
         padding: 20,
        //  backgroundColor:'blue'
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
     },
     verCombosText:{
        fontSize: 15,
        color:'white'
     },
     codigoC:{
        width: '100%',
        height: '10%',
        textAlign: 'left',
        marginTop: 20,
        padding: 20,
        // backgroundColor:'yellow'
     },
     titulo1:{
         textAlign:'left',
         fontSize: 18,
     },
     codigo:{
        fontSize:25,
        textAlign:'left',
        color: '#71C0F2',
        marginTop:20
     },
     aportadores:{
         width: '100%',
         height:'5%',
         textAlign:'left',
         fontSize:18,
        //  marginTop:10,
         padding:20,
        //  backgroundColor:'purple'
     },
     titulAporta:{
         textAlign:'left',
         fontSize:18
     },
     flat:{
         width:'100%',
         paddingLeft: 20,
         paddingRight: 20,
         paddingBottom:20,
        //  backgroundColor:'green'
        //  height: 200
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
