import React, {Component} from 'react';
import { Button, SafeAreaView, Platform, View, FlatList, StyleSheet, Text, Image, TextInput,TouchableOpacity, ScrollView, Modal, Alert, Picker, AsyncStorage}  from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import axios from 'axios';
import DatePicker from 'react-native-datepicker';

export default class App extends Component{
    constructor(props){
        super(props);
            this.state={

                hasPermission: null,
                type: Camera.Constants.Type.back,
                camera: false,
                photo:'',
                take: false,
                error1: false, //campos vacios
                error2: false, //error al mandarlos
                succes: true, //todo bien


                fechaInicio:"01-12-2019",
                fechaExpiracion:"01-12-2019",

                // establecimiento:'',
                // nombre: '',
                costo:'',
                descrip:'',
                // inicio:'',
                // vencimiento:'',

                categorias:[],
                categoria:'',

                productos: [],
                producto:'',

                tiendas: [],
                tienda: '',


                 modalVisible: false,
            }
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    } 

    _enviar =async () => {
        // console.log("kfnvfnk")
        console.log(this.state.categoria)
        if (this.state.fechaInicio =="" || this.state.fechaExpiracion =="" || this.state.costo =="" || this.state.descrip == "" || this.state.producto == "" || this.state.tienda == "") {
            console.log(this.state.fechaExpiracion, this.state.fechaInicio, this.state.costo, this.state.descrip, this.state.producto, this.state.tienda)
            this.setState({error1:true})
            this.setState({error2:false})
            this.setState({succes:false})
            this.setModalVisible(true);
        } else if (this.state.error1 === true) {
            this.setState({error2:true})
            this.setState({error1:false})
            this.setModalVisible(true);
        } else if (this.state.correcto === true) {
           this.setState({succes:true})
            this.setState({error1:false})
            this.setState({error1:false})
            this.setModalVisible(true);
        }

    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });

        token = await AsyncStorage.getItem("userToken");
        url = await AsyncStorage.getItem("server");
        // idUser = await AsyncStorage.setItem("userId",idUser);


        axios({
            method: 'GET',
            url: url+"categoriaProductos/",
            data: {},
            headers: {
                "content-type":"application/json",
                "Authorization": "Token "+token

            }, 
        }).then( res => {
            console.log(res.data.results);
            this.setState({categorias: res.data.results})

            
        }).catch(err => {
            console.log(err)
        });

        axios({
            method: 'GET',
            url: url+"tiendas/",
            data: {},
            headers: {
                "content-type":"application/json",
                "Authorization": "Token "+token

            }, 
        }).then( res => {
            console.log(res.data.results);
            this.setState({tiendas: res.data.results, tienda:""})

            
        }).catch(err => {
            console.log(err)
        });




    }

    _user =async()=>{
        this.props.navigation.goBack()
    }

    snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            console.log(photo.uri);
            this.setState({camera:false});
            this.setState({photo: photo.uri})
            this.setState({take: true})
        }
    };

    _selectCategoria = async(itemValue, itemIndex) =>{
        this.setState({categoria: itemValue});

        // console.log(this.state.categoria);
        // AsyncStorage.getItem("server").then((obj)=>{
        //     this.state.server = obj
        //     this.forceUpdate();
        //   })

        token = await AsyncStorage.getItem("userToken");
        url = await AsyncStorage.getItem("server");


        axios({
            method: 'POST',
            url: url+"productos/busqueda/",
            data: {idCategoria: this.state.categoria},
            headers: {
                "content-type":"application/json",
                "Authorization": "Token "+token

            }, 
        }).then( res => {
            // console.log(res.data.results);
            this.setState({productos: res.data.results, producto:""});
            // this.setState({productos: res.data.results})

            
        }).catch(err => {
            console.log(err)
        });
        
    }

    _sendPromo = async() =>{

        token = await AsyncStorage.getItem("userToken");
        url = await AsyncStorage.getItem("server");


        axios({
            method: 'POST',
            url: url+"promociones/altas/",
            data: {descripcion:this.state.descrip, fechaInicio:this.state.fechaInicio, fechaVencimiento:this.state.fechaExpiracion, foto:this.state.photo, costo:this.state.costo, producto:this.state.producto, tienda:this.state.tienda},
            headers: {
                "content-type":"application/json",
                "Authorization": "Token "+token

            }, 
        }).then( res => {
            console.log(res.data);
            
        }).catch(err => {
            console.log(err.response.data.Error)
        });

    }


    render(){
        const { show, date, mode } = this.state;
        console.log(this.state.hasPermission, this.state.camera)
    const { hasPermission } = this.state
        if (hasPermission === null) {
              return <View/> ;
        } else if (hasPermission === false) {
                return <Text> No access to camera </Text>;
        } else {
    return(
       <View style={styles.todo}>
           <Modal
                animationType="slide"
                transparent={true}
                // transparent={false}
                style={{width: 80, height: 80, backgroundColor: 'pink'}}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    this.setState({modalVisible:false})
                }}>
                <View style = {styles.modal} >
                    
                    {this.state.error1===true &&(
                        <View style={{justifyContent:'center', alignContent:'center',alignItems:'center'}}>
                            <Image
                                 style={{ width: 50, height: 50, alignSelf:'center', marginTop: 20}}
                                 source={require('../../img/remove.png')}
                            />
                            <Text style={{marginTop: 20}} >Completa los campos</Text>
                            <TouchableOpacity
                               style={styles.botonModal}
                                onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                                }}>
                            <Text style={{color: 'white'}}>Aceptar</Text>
                        </TouchableOpacity>
                        </View>
                           
                    )}
                    {this.state.error2===true &&(
                        <View style={{justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                            <Image
                                 style={{ width: 50, height: 50, alignSelf:'center', marginTop: 20}}
                                 source={require('../../img/remove.png')}
                            />
                            < Text style={{marginTop: 20}} >Error al mandar la promocion</Text>
                            <TouchableOpacity
                            style={styles.botonModal}
                            onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Text style={{color: 'white'}}>Aceptar</Text>
                        </TouchableOpacity>

                        </View>
                        
                    )}
                    {this.state.succes===true &&(
                        <View style={{justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                            <Image
                                 style={{ width: 50, height: 50, alignSelf:'center', marginTop: 20}}
                                 source={require('../../img/check.png')}
                            />
                            < Text style={{marginTop: 20}}>Enviado correctamente</Text>
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
            <View style={styles.container}>
                <View style={styles.arriba}>
                    <View style={styles.textoP}>
                        <TouchableOpacity onPress={this._user} >
                             <Icon name="arrow-left" size={22} color={'#707070'} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.botones}>
                        <Text style={styles.tituloP}>Promoción</Text>
                    </View>
                </View>
           
                                <View style={{ flex: 1 }}>
                                    
                                </View>
                <ScrollView style={styles.container2}>
                        <View style={styles.caja}>
                            <TouchableOpacity
                             style={styles.imgCaja}
                              onPress={()=>{this.setState({camera:true})}}>
                            {this.state.camera===true && (
                                <Camera style={{ flex: 1 }} type={this.state.cameraType} ref={ref => { this.camera = ref; }}>
                                        <View style={styles.camerabuttonview}>
                                            <TouchableOpacity
                                                style={styles.cameraButtons}
                                                onPress={this.snap}
                                            >
                                                <Text
                                                style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                                                >
                                                foto
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                </Camera>
                            )}
                            {this.state.take===true && (
                                <Image
                                    style={styles.imgCaja2}
                                    source={{uri:this.state.photo}}
                                />
                            )}
                            </TouchableOpacity>
                           
                            <View style={styles.datosCaja}>
                            
                                <Text style={styles.titulo1}>Categoría</Text>
                                <Picker
                                    selectedValue={this.state.categoria}
                                    style={{height: 50, width: "100%"}}
                                    onValueChange={(itemValue, itemIndex) => this._selectCategoria(itemValue, itemIndex)
                                    }>
                                    {this.state.categorias.map(
                                        c => (<Picker.Item key={c.id} label={c.nombre} value={c.id} />)
                                    )}
                                </Picker>
                                <Text style={styles.titulo1}>Producto</Text>
                                <Picker
                                    selectedValue={this.state.producto}
                                    style={{height: 50, width: "100%"}}
                                    // onValueChange={ () => this.selectCategoria(itemValue, itemIndex)
                                    // }>
                                    onValueChange={(itemValue, itemIndex) =>
                                         this.setState({producto: itemValue})
                                     }>
                                        {this.state.productos.map(
                                            p => (<Picker.Item key={p.id} label={p.descripcion} value={p.id} />)
                                        )}
                                </Picker>
                                <Text style={styles.titulo1}>Tienda</Text>
                                <Picker
                                    selectedValue={1}
                                    style={{height: 50, width: "100%"}}
                                    // onValueChange={ () => this.selectCategoria(itemValue, itemIndex)
                                    // }>
                                    onValueChange={(itemValue, itemIndex) =>
                                         this.setState({tienda: itemValue})
                                     }>
                                        {this.state.tiendas.map(
                                            t => (<Picker.Item key={t.id} label={t.nombre} value={t.id} />)
                                        )}
                                </Picker>
                                <Text style={styles.titulo1}>Descripción</Text>
                                <View style={styles.grande}>
                                    <TextInput multiline style={ styles.titulo2}
                                     placeholder="Descripción"
                                        placeholderTextColor="#848482"
                                        onChangeText={(descrip) => this.setState({ descrip })}></TextInput>
                                </View>
                                <Text style={styles.titulo1}>Costo</Text>
                                <View style={styles.inputs}>
                                    <TextInput style={styles.titulo2} 
                                        placeholder="Costo"
                                        placeholderTextColor="#848482"
                                        keyboardType='numeric'
                                        onChangeText={(costo) => this.setState({ costo })}
                                    ></TextInput>
                                </View>
                                <Text style={styles.titulo1}>Fecha de inicio</Text>
                                <View >
                                    {/* <TextInput style={styles.titulo2}
                                        placeholder="2019-12-10"
                                        placeholderTextColor="#848482"
                                        onChangeText={(inicio) => this.setState({ inicio })}
                                    ></TextInput> */}
                                    <DatePicker
                                        style={{width: '100%'}}
                                        date={this.state.fechaInicio} //initial date from state
                                        mode="date" //The enum of date, datetime and time
                                        placeholder="Fecha de inicio "
                                        format="DD-MM-YYYY"
                                        minDate="01-12-2019"
                                        maxDate="31-12-2019"
                                        confirmBtnText="Aceptar"
                                        cancelBtnText="Cancel"
                                        customStyles={{
                                            dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0
                                            },
                                            dateInput: {
                                            marginLeft: 36
                                            }
                                        }}
                                        onDateChange={(fechaInicio) => {this.setState({fechaInicio: fechaInicio})}}
                                        />
                                </View>
                                
                                <Text style={styles.titulo1}>Fecha de vencimiento</Text>
                                <View>
                                    {/* <TextInput multiline style={styles.titulo2} 
                                        placeholder = "2019-12-20"
                                        placeholderTextColor="#848482"
                                        onChangeText={(vencimiento) => this.setState({ vencimiento })}
                                    ></TextInput> */}
                                    <DatePicker
                                        style={{width: '100%'}}
                                        date={this.state.fechaExpiracion} //initial date from state
                                        mode="date" //The enum of date, datetime and time
                                        placeholder="Fecha de vencimiento "
                                        format="DD-MM-YYYY"
                                        minDate={this.state.fechaInicio}
                                        maxDate="31-12-2019"
                                        confirmBtnText="Aceptar"
                                        cancelBtnText="Cancel"
                                        customStyles={{
                                            dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0
                                            },
                                            dateInput: {
                                            marginLeft: 36
                                            }
                                        }}
                                        onDateChange={(fechaExpiracion) => {this.setState({fechaExpiracion: fechaExpiracion})}}
                                        />
                                </View>
                                
                            </View>
                        </View>
                    <View style={styles.send}>
                        <TouchableOpacity
                            style={styles.enviar}
                             onPress={ this._enviar}
                        >
                            <Text style={{color:'white', width:'100%',height:'100%',textAlign:'center', fontSize:15, alignSelf:'center'}}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
  }
  }
}




    
// console.log(datos[0].inicio)


const styles = StyleSheet.create({
    todo:{
        flex: 1,
        width: '100%',
        // backgroundColor: 'red',
    },
    arriba:{
        // flex:1,
        marginTop: 25,
        width:'100%',
        height: '12%',
        paddingLeft: 10,
        paddingRight: 10,
        // backgroundColor: '#FAFAFA',
        // backgroundColor:'yellow',
    },
    botones:{
        // flex:1,
        flexDirection:'row',
        alignContent: 'center',
        // justifyContent: 'center',
        width: '100%',
        height:'50%',
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
        height:'30%',
        marginTop: 15

        // backgroundColor:'blue'
    },
    container: {
        // flex: 4,
        alignItems: 'center',
        flexDirection:'column',
        justifyContent: 'center',
        backgroundColor:'#FAFAFA',
        // marginTop: '20%',
        height: '100%',
        width:'100%',
    },
    container: {
        // flex: 4,
        // alignItems: 'center',
        // flexDirection:'column',
        // justifyContent: 'center',
        backgroundColor:'#FAFAFA',
        // marginTop: '20%',
        height: '100%',
        width:'100%',
    },
    titulo:{
        // flex: 3,
        alignSelf:'center',
        justifyContent:'center',
         fontSize: 16,
        padding:'5%',
        // color: 'white'
    },
    caja:{
        // flex:4,
        flexDirection: 'column',
        width:'100%',
        height: 1500,
        // height: '100%',
        paddingLeft: '5%',
        paddingRight: '5%',
        // backgroundColor:'orange'
    },
    flat:{
        // flex: 1,
        // alignItems: 'center',
        flexDirection: 'column',
        // justifyContent: 'center',
        width: '100%',
        height: '100%',
        // backgroundColor: 'purple'
    },
    imgCaja:{
        // flex: 2,
        width:'100%',
        height: '25%',
        borderRadius: 10,
        backgroundColor:'gray',
        marginBottom: 10,
    },
    imgCaja2:{
        // flex: 2,
        width:'100%',
        height: '100%',
        borderRadius: 10,
        // backgroundColor:'gray',
        // marginBottom: 10,
    },
    datosCaja:{
        // flex:3,
        // justifyContent:'center',
        alignContent:'center',
        width:'100%',
        height: '100%',
        // backgroundColor: 'pink',
        // marginLeft: 10,
        // padding: 10,
    },
    inputs:{
        // flex:1,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        width: '100%',
        height: 60,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        marginTop: 10,
        padding: 10,
        // marginBottom: 20,
    },
    grande:{
        // flex:2,
        // justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        width: '100%',
        height: '15%',
        backgroundColor: '#F0F0F0',
        // backgroundColor: 'green',
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'row',
        padding: 10,
        // marginBottom: '20%',
    },
    titulo1:{
        width: '100%',
        height: 30,
        textAlign:'left',
        // backgroundColor:'blue',
        marginTop: 10,
        marginBottom: 2,
        fontSize: 18
    },
    titulo2:{
        flex: 1,
        flexWrap: 'wrap',
        flexGrow: 2,
        width: '100%',
        height: '100%',
        textAlign:'left',
        fontSize: 18,
    },
    send:{
        // flex: 1,
        alignItems:'center',
        justifyContent:'center',
        width: '100%',
        height: 100,
        // backgroundColor:'purple',
        // marginTop: 20
    },
    enviar:{
        // flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        width: 70,
        height: 40,
        backgroundColor: 'blue',
        color: 'white',
        fontSize: 18,
        borderRadius: 5,
        textAlign:'center',
        padding:5
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
        marginTop: 40,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        // backgroundColor: '#F0F0F0',
        backgroundColor: 'white',
        width: '80%',
        height: 200,
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
    
});
