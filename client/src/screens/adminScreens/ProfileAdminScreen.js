import React, {Component} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image, TextInput,TouchableOpacity,Platform, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
            nombre:'aixa',
            correo:'aixa@mail.com',
            telefono:'9511817723',
            pass1:'********',
            pass2:'********',
            image:null,
            uri:''
        }
    }


    _editarPref=()=>{
        this.props.navigation.navigate('Prefer')
    }

    _cerrarSesion=()=>{
        this.props.navigation.navigate('Login')
    }

// ------------------------------------------Imagen--------------
componentDidMount() {
    this.getPermissionAsync();
    console.log('hi');
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    this.setState({uri:result.uri})

    console.log(result);
    console.log(this.state.uri);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

    
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
                                <TouchableOpacity 
                                onPress={this._pickImage}
                                style={styles.imgA}>
                                    <Image style={{flex:1,borderRadius:100}} source={{uri:this.state.image}} />
                                </TouchableOpacity>
                            </View>
                        ):(
                             <View style={styles.arriba}>
                                <TouchableOpacity 
                                onPress={this._pickImage}
                                style={styles.imgA}>
                                    <Image />
                                </TouchableOpacity>
                            </View>
                        ) }
                   
                    <View style={styles.datos2}>
                        <Text style={{textAlign:'left'}}>Usuario</Text>
                        <TextInput
                             style={styles.inputData}
                             placeholder={this.state.nombre}
                             onChangeText={(nombre)=>this.setState({nombre})}
                        />
                        <Text style={{textAlign:'left'}}>Correo</Text>
                        <TextInput
                             style={styles.inputData}
                             placeholder={this.state.correo}
                            //  value={this.state.correo}
                             keyboardType = 'email-address'
                             onChangeText={(correo)=>this.setState({correo})}
                        />
                        <Text style={{textAlign:'left'}}>Telefono</Text>
                        <TextInput
                             style={styles.inputData}
                             placeholder={this.state.telefono}
                             keyboardType = 'numeric'
                             blurOnSubmit={true}
                             onChangeText={(telefono)=>this.setState({telefono})}
                        />
                        <Text style={{textAlign:'left'}}>Contraseña</Text>
                        <TextInput
                             style={styles.inputData}
                             placeholder={this.state.pass1}
                             secureTextEntry={true}
                             onChangeText={(pass1)=>this.setState({pass1})}
                        />
                        <Text style={{textAlign:'left'}}>Confirmación de contraseña</Text>
                        <TextInput
                             style={styles.inputData}
                             placeholder={this.state.pass2}
                             secureTextEntry={true}
                             onChangeText={(pass2)=>this.setState({pass2})}
                        />
                    </View>
                    <View style={styles.botones2}>
                        <View style={styles.botonesA}>
                            <TouchableOpacity style={styles.editI2}
                                onPress={()=>{this.setState({edit:false})}}>
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
                                <TouchableOpacity 
                                style={styles.imgA}>
                                    <Image style={{flex:1,borderRadius:100}} source={{uri:this.state.image}} />
                                </TouchableOpacity>
                            </View>
                        ):(
                             <View style={styles.arriba}>
                                <TouchableOpacity 
                                style={styles.imgA}>
                                    <Image />
                                </TouchableOpacity>
                            </View>
                        ) }
                    <View style={styles.datos}>
                        <Text style={{textAlign:'left'}}>Usuario</Text>
                        <View style={styles.inputData}>
                            <Text style={styles.textIn}>{this.state.nombre}</Text>
                        </View>
                        <Text style={{textAlign:'left'}}>Correo</Text>
                        <View style={styles.inputData}>
                            <Text style={styles.textIn}>{this.state.correo}</Text>
                        </View>
                        <Text style={{textAlign:'left'}}>Telefono</Text>
                        <View style={styles.inputData}>
                            <Text style={styles.textIn}>{this.state.telefono}</Text>
                        </View>
                        <Text style={{textAlign:'left'}}>Contraseña</Text>
                        <View style={styles.inputData}>
                            <Text style={styles.textIn}>********</Text>
                        </View>
                    </View>
                    <View style={styles.botones}>
                        <View style={styles.botonesA}>
                            <TouchableOpacity style={styles.editI}
                            onPress={()=>{this.setState({edit:true})}}>
                                <Text>Editar información</Text>
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
        width:200,
        height:200,
        borderRadius:100,
        backgroundColor:'pink'
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
        // alignItems:'center',
        // alignContent:'center',
        // width:'100%',
        // marginTop:20,
        // marginBottom:40,
        width:'100%',
        marginTop:20,
        marginBottom:40,
        // backgroundColor:'magenta'
    },
    botonesA:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        // paddingLeft: 10,
        // paddingRight: 10,
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
        // paddingLeft: 20,
        // paddingRight: 20,
        marginRight:5,
    },
    editI2:{
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