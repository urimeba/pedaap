import React, {Component} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Modal,Text, Image, TextInput,TouchableOpacity, ScrollView, AsyncStorage, Alert} from 'react-native';
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
            aportadorE:'',
            eliminar:false,
            modalVisible:false,
        }
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    } 
    componentDidMount(){
        this._getInfo();
      }

    _getInfo = async() =>{
        // console.log("HOLA-----");
        // console.log(JSON.stringify(this.props.navigation.getParam('idPresupuesto', 'NO-ID')));
        id = JSON.stringify(this.props.navigation.getParam('idPresupuesto', 'NO-ID'));
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
            console.log(res.data.datos);
            data = JSON.parse(res.data.datos);
            datos.push(data);
        }).catch(err => {
            console.log(err)
        });
    }

    _eliminar=(id, aportador)=>{
        // console.log(id);
        this.setState({aportadorE:aportador, eliminar:true})
        this.setModalVisible(true);
        // Alert.alert(
        //     'Confirmar',
        //     '¿Deseas eliminar a '+aportador+" de este presupuesto?",
        //     [
        //       {
        //         text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel',
        //       },

        //       {text: 'OK', onPress: () => this._deleteUser(id)},
        //     ],
        //     {cancelable: false},
        //   );

    }

    _deleteUser= async(id) =>{
        this.setModalVisible(!this.state.modalVisible);
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
                <Text style={styles.nombre}>{item.nombre}</Text>
                <Text style={styles.aporte}>{item.aporte}</Text>
            </View>
            <View style={styles.cerrar}>
                <TouchableOpacity style={styles.btnCerrar} onPress={() => this._eliminar(item.id, item.nombre)}>
                    <Icon name="close" size={24} color={'#D5D5D5'}/>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )

    render(){
        return(
            <ScrollView style={styles.todo}>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            // transparent={false}
                            style={{width: 80, height: 80, backgroundColor: 'pink'}}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                this.setState({modalVisible:false})
                            }}>
                            <View style = {styles.modal} >
                                
                                {this.state.eliminar===true &&(
                                    <View style={{justifyContent:'center', alignContent:'center',alignItems:'center'}}>
                                        <Image
                                            style={{ width: 50, height: 50, alignSelf:'center', marginTop: 20}}
                                            source={require('../../img/remove.png')}
                                        />
                                        <Text style={{marginTop: 20, textAlign:'center'}} >¿Deseas eliminar a {this.state.aportadorE} de este presupuesto?</Text>
                                    <View style={{justifyContent:'center',flexDirection:'row', alignContent:'center',alignItems:'center'}}>
                                        <TouchableOpacity
                                            style={styles.botonModalA}
                                                 onPress = {
                                                     this._deleteUser
                                                 } >
                                            <Text style={{color: 'white'}}>Aceptar</Text>
                                        </TouchableOpacity>
                                            <TouchableOpacity
                                            style={styles.botonModalC}
                                             onPress={() => {
                                                this.setModalVisible(!this.state.modalVisible);
                                                }}
                                               >
                                            <Text style={{color: 'white'}}>Cancelar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                    
                                )}
                                {this.state.succes===true &&(
                                    <View style={{justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                        <Image
                                            style={{ width: 50, height: 50, alignSelf:'center', marginTop: 20}}
                                            source={require('../../img/check.png')}
                                        />
                                        < Text style={{marginTop: 20}}>Modificdo correctamente</Text>
                                        <TouchableOpacity
                                            style={styles.botonModal}
                                            onPress={() => {
                                            this.setModalVisible(!this.state.modalVisible);
                                            }}>
                                            <Text style={{color: 'white'}}>Aceptar</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
        </Modal>




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
                    data={datos}
                    renderItem={this.caja}
                    keyExtractor={item => item.id}
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
     },
      botonModal:{
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEDB6B',
        color: 'white',
        width: 70,
        height: 30,
        padding: 5,
        borderRadius: 8,
        marginTop: 20,
    },
     botonModalA:{
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#71C0F2',
        color: 'white',
        width: 70,
        height: 30,
        padding: 5,
        borderRadius: 8,
        marginTop: 20,
        marginRight:10
    },
     botonModalC:{
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#DE4C63',
        color: 'white',
        width: 75,
        height: 30,
        marginLeft: 10,
        padding: 5,
        borderRadius: 8,
        marginTop: 20,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        textAlign:'center',
        // backgroundColor: '#F0F0F0',
        backgroundColor: 'white',
        width: '80%',
        height: 230,
        borderRadius: 10,
        marginLeft: '10%',
        marginTop: '10%',
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }

})
