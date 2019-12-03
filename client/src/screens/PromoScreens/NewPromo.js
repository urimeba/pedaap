import React, {Component} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image, TextInput,TouchableOpacity, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

const datos=[
    {
        id: '1',
        nombre: '2 x 1 Cerveza Indio',
        lugar: 'Oxxo Juriquilla',
        vigencia: '20/11/2019',
        categoria: 'bebidas',
        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        direccion: 'google maps'
    }
];

export default class App extends Component{
    constructor(props){
        super(props);
            this.state={
                hasPermission: null,
                type: Camera.Constants.Type.back,
                camera: false,
                photo:'',
                take: false,
            }
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });
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


    render(){
        console.log(this.state.hasPermission, this.state.camera)
    const { hasPermission } = this.state
        if (hasPermission === null) {
              return <View/> ;
        } else if (hasPermission === false) {
                return <Text> No access to camera </Text>;
        } else {
    return(
       <View style={styles.todo}>
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
                                <Text style={styles.titulo1}>Nombre de la promoción</Text>
                                <View style={styles.inputs}>
                                    <Text style={styles.titulo}>njn</Text>
                                </View>
                                <Text style={styles.titulo1}>categoría</Text>
                                <View style={styles.inputs}>
                                    <Text style={styles.titulo}>n n </Text>
                                </View>
                                <Text style={styles.titulo1}>Descripción</Text>
                                <View style={styles.grande}>
                                    <Text style={ styles.titulo}>m m ñ</Text>
                                </View>
                                <Text style={styles.titulo1}>Vigencia</Text>
                                <View style={styles.inputs}>
                                    <Text style={styles.titulo}>ggg</Text>
                                </View>
                                <Text style={styles.titulo1}>Direccion</Text>
                                <View style={styles.grande}>
                                    <Text style={styles.titulo}>yyy</Text>
                                </View>
                                <Text style={styles.titulo1}>Lugar</Text>
                                <View style={styles.inputs}>
                                    <Text style={styles.titulo}>eee</Text>
                                </View>
                            </View>
                        </View>
                </ScrollView>
            </View>
        </View>
    )
  }
  }
}




    
// console.log(datos[0].vigencia)


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
    }
});