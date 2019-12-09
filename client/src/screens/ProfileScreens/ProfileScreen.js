import React, {Component} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image, TextInput,TouchableOpacity, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            edit:false
        }
    }


    render(){
        return(
            <ScrollView style={styles.todo}>
            {this.state.edit ? (
                <View>
                    <View style={styles.arriba}>
                        <View style={styles.imgA}>
                            <Image/>
                        </View>
                    </View>
                    <View style={styles.datos}>
                        <Text style={{textAlign:'left'}}>Usuario</Text>
                        <TextInput style={styles.inputData}/>
                        <Text style={{textAlign:'left'}}>Correo</Text>
                        <TextInput style={styles.inputData}/>
                        <Text style={{textAlign:'left'}}>Telefono</Text>
                        <TextInput style={styles.inputData}/>
                        <Text style={{textAlign:'left'}}>Contraseña</Text>
                        <TextInput style={styles.inputData}/>
                        <Text style={{textAlign:'left'}}>Confirmación de contraseña</Text>
                        <TextInput style={styles.inputData}/>
                    </View>
                    <View style={styles.botones}>
                        <View style={styles.botonesA}>
                            <TouchableOpacity style={styles.editI}
                            onPress={()=>{this.setState({edit:false})}}>
                                <Text>Aceptar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </View>
            ):(
                <View>
                    <View style={styles.arriba}>
                        <View style={styles.imgA}>
                            <Image/>
                        </View>
                    </View>
                    <View style={styles.datos}>
                        <View style={styles.inputData}>
                            <Text style={styles.textIn}>Nombre de usuario</Text>
                        </View>
                        <View style={styles.inputData}>
                            <Text style={styles.textIn}>emain@mail.com</Text>
                        </View>
                        <View style={styles.inputData}>
                            <Text style={styles.textIn}>4427890163</Text>
                        </View>
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
                            <TouchableOpacity style={styles.editP}>
                                <Text>Editar preferencias</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.botonesC}>
                            <TouchableOpacity style={styles.cerrarS}>
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
    botonesA:{
        flex:1,
        flexDirection:'row' ,
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