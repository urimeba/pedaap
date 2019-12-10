import React,{Component} from 'react';
import { View, Text, StyleSheet ,TextInput,TouchableOpacity,Modal,Image, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { TextInput } from 'react-native-gesture-handler';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: [],
            editar:false,
            eliminar:false,
            nombre:'',
            direccion:'',
            horaApertura:'',
            horaCierre:'',
            categoria:'',
            modalVisible: false,
            error1:false,//Error al eliminar
            succes:false,
        }

    }

    _editar=()=>{
        this.setState({editar:true})
        this.setState({eliminar:false})
    }

    _eliminar=()=>{
        this.setState({modalVisible:false});
        setTimeout(()=>{
            this.props.navigation.goBack()
        }, 1000)
    }

    _ValidarEliminar=()=>{
        this.setState({modalVisible:true})
        this.setState({eliminar:true})
        this.setState({succes:false})
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    } 
    render(){
            return (
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
                                
                                {this.state.eliminar===true &&(
                                    <View style={{justifyContent:'center', alignContent:'center',alignItems:'center'}}>
                                        <Image
                                            style={{ width: 50, height: 50, alignSelf:'center', marginTop: 20}}
                                            source={require('../../img/remove.png')}
                                        />
                                        <Text style={{marginTop: 20, textAlign:'center'}} >¿Seguro que quieres eliminar este establecimiento?</Text>
                                    <View style={{justifyContent:'center',flexDirection:'row', alignContent:'center',alignItems:'center'}}>
                                        <TouchableOpacity
                                            style={styles.botonModalA}
                                                 onPress = {
                                                     this._eliminar
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
                                {this.state.error2===true &&(
                                    <View style={{justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                        <Image
                                            style={{ width: 50, height: 50, alignSelf:'center', marginTop: 20}}
                                            source={require('../../img/remove.png')}
                                        />
                                        < Text style={{marginTop: 20, textAlign:'center'}} >Error al Eliminar el establecimiento</Text>
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
                        <View style={styles.container}>
                            <ScrollView style={{flex:1, width:'100%',padding:30}}>
                                    <View style={styles.caja}>
                                        <View style={styles.datosCaja}>
                                            <Text style={styles.titulo1}>Nombre del establecimiento</Text>
                                            <View style={styles.inputs}>
                                                <TextInput style={styles.titulo}
                                                 onChangeText={(nombre)=>this.setState({nombre})}
                                                    placeholder='Nombre'
                                                />
                                            </View>
                                            <Text style={styles.titulo1}>Direccion</Text>
                                            <View style={styles.grande}>
                                                <TextInput style={styles.titulo} 
                                                 onChangeText={(direccion)=>this.setState({direccion})}
                                                placeholder = 'Direccion'
                                                />
                                            </View>
                                            <Text style={styles.titulo1}>Hora de apertura</Text>
                                            <View style={styles.inputs}>
                                                <TextInput style={ styles.titulo} 
                                                    onChangeText={(horaApertura)=>this.setState({horaApertura})}
                                                    placeholder='Hora de apertura'
                                                />
                                            </View>
                                            <Text style={styles.titulo1}>Hora de cierre</Text>
                                            <View style={styles.inputs}>
                                                <TextInput style={styles.titulo}
                                                    onChangeText={(horaCierre)=>this.setState({horaCierre})}
                                                    placeholder = 'Hora de cierre'
                                                />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.botones}>
                                        <View style={styles.botonesA}>
                                            <TouchableOpacity style={styles.editI}
                                            onPress={()=>{this.setState({editar:false,modalVisible:true,succes:true})}}>
                                                <Text>Aceptar</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                            </ScrollView>
                        </View>
                    </View>
                
               
    );
    }
}

const styles = StyleSheet.create({
    todo: {
        flex: 1,
    },
    arriba: {
        // flex:1,
        marginTop: 25,
        width: '100%',
        height: '12%',
        paddingLeft: 10,
        paddingRight: 10,
        // backgroundColor: '#FAFAFA',
        // backgroundColor:'yellow',
    },
    botones: {
        // flex:1,
        flexDirection: 'row',
        alignContent: 'center',
        // justifyContent: 'center',
        width: '100%',
        height: '50%',
        padding: 5,
        // backgroundColor:'red'
    },
    tituloP: {
        fontSize: 20
    },
    textoP: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent:'center',
        width: '100%',
        height: '30%',
        marginTop: 15

        // backgroundColor:'blue'
    },
    container: {
        flex: 1,
        // alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FAFAFA',
        // marginTop: '20%',
        height: '100%',
        width: '100%',
    },
    titulo: {
        // flex: 3,
        // alignSelf: 'center',
        // justifyContent: 'center',
        fontSize: 16,
        padding: '5%',
        // color: 'white'
    },
    caja: {
        flex:1,
        flexDirection: 'column',
        width: '100%',
        height: 500,
        // height: '100%',
        // paddingLeft: '5%',
        // paddingRight: '5%',
        // backgroundColor:'orange'
    },
    flat: {
        // flex: 1,
        // alignItems: 'center',
        flexDirection: 'column',
        // justifyContent: 'center',
        width: '100%',
        height: '100%',
        // backgroundColor: 'purple'
    },
    imgCaja: {
        // flex: 2,
        width: '100%',
        height: '25%',
        borderRadius: 10,
        backgroundColor: 'gray',
        marginBottom: 10,
    },
    datosCaja: {
        flex:1,
        // justifyContent:'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
        // backgroundColor: 'pink',
        // marginLeft: 10,
        // padding: 10,
    },
    inputs: {
        // flex:1,
        justifyContent: 'center',
        // alignItems: 'center',
        textAlign: 'left',
        width: '100%',
        height: 60,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        marginTop: 10,
        // marginBottom: 20,
    },
    grande: {
        // flex:2,
        // justifyContent:'center',
        // alignItems: 'center',
        textAlign: 'left',
        width: '100%',
        height: '15%',
        backgroundColor: '#F0F0F0',
        // backgroundColor: 'green',
        borderRadius: 10,
        marginTop: 10,
        // marginBottom: '20%',
    },
    titulo1: {
        width: '100%',
        height: 30,
        textAlign: 'left',
        // backgroundColor:'blue',
        marginTop: 10,
        marginBottom: 2,
        fontSize: 18
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
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
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
        width: '60%',
        height:30,
        backgroundColor:'#DE4C63',
        borderRadius: 10
    },
    editI:{
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
        width: 70,
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
});
