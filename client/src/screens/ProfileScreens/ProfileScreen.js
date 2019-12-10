import React, {Component} from 'react';
import { View, StyleSheet, Text, Image, TextInput,TouchableOpacity, ScrollView, AsyncStorage, Alert, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const datos=[{
    id:'1',
    nombre:'aixa',
    correo:'aixa@mail.com',
    telefono:'9511817723'
}]

const behavior = process.env.NODE_ENV === 'production' ? 'padding' : undefined;
export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            edit:false,
            nombre:"",
            apellido:"",
            username:"",
            correo:"",
            telefono:"",
            newPass:"",
            newPass2:"",
            image:null,
            uri:''
        }
    }

    async componentDidMount(){
        url = await AsyncStorage.getItem("server");
        token = await AsyncStorage.getItem("userToken");
        idUsuario = await AsyncStorage.getItem("userId");



        // axios({
        //     method: 'GET',
        //     url: url+"usuarios/"+idUsuario+"/",
        //     data: {},
        //     headers: {
        //         "content-type":"application/json",
        //         "Authorization": "Token "+ token
        //     },
        // }).then( res => {
        //     // console.log(res.data);

        //     tel = res.data.telefono;
        //     tel = tel.substring(3, 13);
        //     // tel = parseInt(tel)

        //     // console.log(tel)

        //     this.setState({nombre:res.data.first_name, apellido:res.data.last_name, username: res.data.username, correo:res.data.email, telefono:tel})
        // }).catch(err => {
        //     console.log(err);
        // });
    }

    _saveChanges = async() =>{
        username = this.state.username;
        nombre = this.state.nombre;
        apellido = this.state.apellido;
        correo = this.state.correo;
        telefono = this.state.telefono;
        pass1 = this.state.newPass;
        pass2 = this.state.newPass2;

        url = await AsyncStorage.getItem("server");
        token = await AsyncStorage.getItem("userToken");
        idUser = await AsyncStorage.getItem("userId");

        if(pass1=="" && pass2==""){
            console.log(nombre, apellido, correo, telefono);

            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if(reg.test(correo) === false){
                Alert.alert("Error", "Ingresa un correo válido")
            }else if(telefono.length<10 || telefono.length>10 ){
                Alert.alert("Error", "Ingresa un télefono válido")
            }else{
                // AXIOS
                axios({
                    method: 'POST',
                    url: url+"usuarios/actualizarDatos/",
                    data: {username:username, nombre:nombre, apellido:apellido, correo:correo,telefono:telefono, pass1:pass1,pass2:pass2},
                    headers: {
                        "content-type":"application/json",
                        "Authorization": "Token "+ token
                    },
                }).then( res => {
                    // console.log(res.data)
                    Alert.alert("Datos guardado", "Datos correctamente actualizados");
                    this.setState({edit:false})
                    // this.setState({nombre:res.data.first_name, apellido:res.data.last_name, username: res.data.username, correo:res.data.email, telefono:tel})
                }).catch(err => {
                    console.log("Error");
                    console.log(err.response.data.Error);
                    Alert.alert("Error", err.response.data.Error);
                });
            }
        }else if(pass1==pass2){
            // console.log("contraseñas iguales")
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if(reg.test(correo) === false){
                alert("Error", "Ingresa un correo válido")
            }else if(telefono.length<10){
                alert("Error", "Ingresa un télefono válido")
            }else{
                // AXIOS
                axios({
                    method: 'POST',
                    url: url+"usuarios/actualizarDatos/",
                    data: {username:username, nombre:nombre, apellido:apellido, correo:correo,telefono:telefono, pass1:pass1,pass2:pass2},
                    headers: {
                        "content-type":"application/json",
                        "Authorization": "Token "+ token
                    },
                }).then( res => {
                    // console.log(res.data)
                    Alert.alert("Datos guardado", "Datos correctamente actualizados");
                    this.setState({edit:false})
                   
                }).catch(err => {
                    console.log("Error");
                    // console.log(err);
                    Alert.alert("Error", err.response.data.Error)
                });
            }

        }else{
            // console.log("contraseñas no igauales")
            Alert.alert("Error", "Las contraseñas no coinciden");
        }
    }

    _editarPref=()=>{
        this.props.navigation.navigate('Prefer')
    }

    _cerrarSesion=()=>{
        this.props.navigation.navigate('Login')
    }

// ------------------------------------------Imagen--------------
    // componentDidMount() {
    //     this.getPermissionAsync();
    //     console.log('hi');
    // }

    // getPermissionAsync = async () => {
    //     if (Constants.platform.ios) {
    //         const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //         if (status !== 'granted') {
    //             alert('Sorry, we need camera roll permissions to make this work!');
    //         }
    //     }
    // }

    // _pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1
    //     });

    //     this.setState({uri:result.uri})

    //     console.log(result);
    //     console.log(this.state.uri);

    //     if (!result.cancelled) {
    //         this.setState({ image: result.uri });
    //     }
    // };
// ------------------------------------------Imagen--------------

    render(){
        return(
            <ScrollView style={styles.todo}>
                {this.state.edit ? (
                    <View>
                    <KeyboardAwareScrollView
                        keyboardVerticalOffset={30}
                        behavior={Platform.OS === "ios" ? 'padding' : 'height'}
                        enableOnAndroid={true}
                        style={{width:'100%'}}
                        // resetScrollToCoords={{ x: 0, y: 0 }}
                        contentContainerStyle={{flexGrow:1}}
                        scrollEnabled={true}
                        >
                            {this.state.image!=null?
                            (
                                <View style={styles.arriba}>
                                    <View style={styles.imgA}>
                                        <Icon name={'face-profile'} size={100} color={'#FAFAFA'} />
                                    </View>
                                </View>
                            ):(
                                <View style={styles.arriba}>
                                    <View style={styles.imgA}>
                                        <Icon name={'face-profile'} size={100} color={'#FAFAFA'} />
                                    </View>
                                </View>
                            ) }
                    
                        <View style={styles.datos2}>
                            <Text style={{textAlign:'left'}}>Usuario</Text>
                            <TextInput style={styles.inputData} editable={false} value={this.state.username}  />
                            <Text style={{textAlign:'left'}}>Correo</Text>
                            <TextInput style={styles.inputData} value={this.state.correo} onChangeText={(correo) => this.setState({correo})} />
                            <Text style={{textAlign:'left'}}>Telefono</Text>
                            <TextInput style={styles.inputData} value={this.state.telefono} onChangeText={(telefono) => this.setState({telefono})}  keyboardType={"numeric"} maxLength={10} />
                            <Text style={{textAlign:'left'}}>Nombre(s)</Text>
                            <TextInput style={styles.inputData} value={this.state.nombre} onChangeText={(nombre) => this.setState({nombre})}  />
                            <Text style={{textAlign:'left'}}>Apellidos(s)</Text>
                            <TextInput style={styles.inputData} value={this.state.apellido} onChangeText={(apellido) => this.setState({apellido})} />
                            <Text style={{textAlign:'left'}}>Contraseña</Text>
                            <TextInput style={styles.inputData} secureTextEntry={true} onChangeText={(newPass) => this.setState({newPass})}  />
                            <Text style={{textAlign:'left'}}>Confirmación de contraseña</Text>
                            <TextInput style={styles.inputData} secureTextEntry={true} onChangeText={(newPass2) => this.setState({newPass2})} />
                        </View>
                        <View style={styles.botones2}>
                            <View style={styles.botonesA}>
                                <TouchableOpacity style={styles.editI}
                                onPress={this._saveChanges}>
                                    <Text>Aceptar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
                ):(
                    <View>
                        {this.state.image!=null?
                            (
                                <View style={styles.arriba}>
                                    <View style={styles.imgA}>
                                        <Icon name={'face-profile'} size={100} color={'#FAFAFA'} />
                                    </View>
                                </View>
                            ):(
                                <View style={styles.arriba}>
                                    <View style={styles.imgA}>
                                        <Icon name={'face-profile'} size={100} color={'#FAFAFA'} />
                                    </View>
                                </View>
                            ) }
                        <View style={styles.datos}>
                            <Text style={{textAlign:'left'}}>Usuario</Text>
                            <View style={styles.inputData}>
                                <Text style={styles.textIn}>{this.state.username}</Text>
                            </View>
                            <Text style={{textAlign:'left'}}>Nombre</Text>
                            <View style={styles.inputData}>
                                <Text style={styles.textIn}>{this.state.nombre}</Text>
                            </View>
                            <Text style={{textAlign:'left'}}>Apellido(s)</Text>
                            <View style={styles.inputData}>
                                <Text style={styles.textIn}>{this.state.apellido}</Text>
                            </View>
                            <Text style={{textAlign:'left'}}>Correo electrónico</Text>
                            <View style={styles.inputData}>
                                <Text style={styles.textIn}>{this.state.correo}</Text>
                            </View>
                            <Text style={{textAlign:'left'}}>Telefono</Text>
                            <View style={styles.inputData}>
                                <Text style={styles.textIn}>{this.state.telefono}</Text>
                            </View>
                            {/* <View style={styles.inputData}>
                                <Text style={styles.textIn}>********</Text>
                            </View> */}
                        </View>
                        <View style={styles.botones}>
                            <View style={styles.botonesA}>
                                <TouchableOpacity style={styles.editI}
                                onPress={()=>{this.setState({edit:true})}}>
                                    <Text>Editar información</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                onPress={this._editarPref}
                                style={styles.editP}>
                                    <Text>Editar preferencias</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.botonesC}>
                                <TouchableOpacity 
                                onPress={this._cerrarSesion}
                                style={styles.cerrarS}>
                                    <Text>Cerrar sesión</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    todo:{
        flex:1,
        padding:20
    },
    arriba:{
        flex:3,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        width:'100%',
        // backgroundColor:'coral',
        marginTop:20,
        marginBottom:20,
    },
    imgA:{
        width:120,
        height:120,
        borderRadius:100,
        backgroundColor:'#71C0F2',
        justifyContent: 'center',
        alignItems: 'center'
    },
    datos:{
        flex:4,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        // backgroundColor:'violet'
    },
    datos2:{
        flex:4,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        textAlign:'center',
        fontSize:18,
        paddingLeft:20
        // backgroundColor:'violet'
    },
    inputData:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        width:'90%',
        borderRadius:20,
        marginTop:10,
        marginBottom:10,
        height: 50,
        padding:10,
        textAlign:'center',
        fontSize:18,
        // backgroundColor:'#FAFAFA'
        backgroundColor: '#F0F0F0'
    },
    textIn:{
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        textAlign:'center',
        fontSize:18
    },
    botones:{
        flex:2,
        width:'100%',
        marginTop:20,
        marginBottom:40,
        // backgroundColor:'magenta'
    },
    botones2:{
        flex:2,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        width:'100%',
        marginTop:20,
        marginBottom:40,
        // backgroundColor:'magenta'
    },
    botonesA:{
        flex:1,
        flexDirection:'row' ,
        paddingLeft: 10,
        paddingRight: 10,
    },
    botonesA2:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    botonesC:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        marginTop:20
    },
    cerrarS:{
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        width: 100,
        height:30,
        backgroundColor:'#DE4C63',
        borderRadius: 10
    },
    editI:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        backgroundColor:'#FEDB6B',
        borderRadius:10,
        width:'60%',
        height:30,
        marginRight:5,
    },
    editI2:{
        // flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        backgroundColor:'#FEDB6B',
        borderRadius:10,
        width:'60%',
        height:30,
        marginRight:5,
    },
    editP:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        backgroundColor:'#FEDB6B',
        borderRadius:10,
        width: '60%',
        height:30,
        marginLeft:5
    }

})