import React, {Component} from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const estable=[
    {
        id:'1',
        nombre:'Oxxo',
        direccion:'centro'
    },
    {
        id:'2',
        nombre:'Oxxovv',
        direccion:'centro'
    },
    {
        id:'3',
        nombre:'Oxxoww',
        direccion:'centro'
    },
    {
        id:'4',
        nombre:'Oxxoqq',
        direccion:'centro'
    },
]

export default class App extends Component{
    constructor(props) {
        super(props);
        this.state={
            establecimieniemtos: false,
            filter:false,
            datos: [],
            establecimientos: [],
            loading: false,
        };
    }

    _estable=()=>{
        if(this.state.establecimieniemtos===false){
            this.setState({establecimieniemtos:true})
        }
        if(this.state.establecimieniemtos===true){
            this.setState({establecimieniemtos:false})
        }
        
    }

    _filtro=()=>{
        if(this.state.filter===false){
            this.setState({filter:true})
        }
        if(this.state.filter===true){
            this.setState({filter:false})
        }
    }

    async componentDidMount() {
        // url = await AsyncStorage.getItem("server")+'promociones/';
        // url2 = await AsyncStorage.getItem("server")+'tiendas/';
        // token = await AsyncStorage.getItem('userToken');

        // fetch(url, {
        //     method: 'GET',
        //     mode: 'cors',
        //     credentials: 'include',
        //     headers: {
        //         'Authorization': 'Token '+token, 
        //     }
        // })
        // .then(response => response.json())
        // .then((responseJson)=>{
        //     this.setState({
        //         datos: responseJson.results
        //     });
        //     fetch(url2, {
        //         method: 'GET',
        //         mode: 'cors',
        //         credentials: 'include',
        //         headers: {
        //             'Authorization': 'Token '+token, 
        //         }
        //     })
        //     .then(response => response.json())
        //     .then((responseJson)=>{
        //         this.setState({
        //             establecimientos: responseJson.results,
        //             loading: false
        //         });
        //     })
        //     .catch(error=>console.error(error))
        // })
        // .catch(error=>console.error(error))

        url = await AsyncStorage.getItem("server")+"promociones/getPromos/";
        token = await AsyncStorage.getItem('userToken');

        axios({
            method: 'GET',
            url: url,
            data: {},
            headers: {
                "content-type":"application/json",
                "Authorization":"Token "+token
            }, 
        }).then( res => {
            // PROMOCIONESs
            // console.log(res.data);
        }).catch(err => {
            this.setState({
                error1: false,
                error2: true,
            });
        });
    }

    caja=({item})=>{
        let fechaSplit = item.fechaVencimiento.split("-");
        let fechaFormat = fechaSplit[2]+'/'+fechaSplit[1]+'/'+fechaSplit[0];
        return(
            <TouchableOpacity 
                onPress={() => this.props.navigation.navigate('Promotion', {
                    datos: item, 
                    id: item.id,
                    nombre: item.descripcion,
                    descripcion: item.descripcion,//pendiente checar
                    inicio: item.fechaInicio,
                    vencimiento: item.fechaVencimiento,//pendiente checar
                    costo: item.costo,
                    foto:item.foto,
                    kind:'acepted'
                })}
                style={styles.caja}
            >
                <View style={styles.imgCaja}>
                    <Image/>
                </View>
                <View style={styles.datosCaja}>
                    <Text style={styles.titulo}>{item.descripcion}</Text>
                    {item.costo == '0.00' &&(
                        <Text style={styles.titulo}>Promoción</Text>
                    )}
                    {item.costo != '0.00' &&(
                        <Text style={styles.titulo}>${item.costo}</Text>
                    )}
                    <Text style={styles.titulo}>Vigencia: {fechaFormat}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    caja2=({item})=>(
        <TouchableOpacity style={styles.caja}>
            <View style={styles.imgCaja}>
                <Image/>
            </View>
            <View style={styles.datosCaja}>
                <Text style={styles.titulo}>{item.nombre}</Text>
                <Text style={styles.titulo}>{item.lugar}</Text>
            </View>
        </TouchableOpacity>
    )

    render(){
        if(!this.state.loading){
            return (
                <View style={styles.todo}>
                    {console.log(this.state.establecimieniemtos)}
                    <View style={styles.container}>
                        <View style={styles.arriba}>
                            <View style={styles.textoP}>
                                <Text style={styles.tituloP}>Promociones aceptadas</Text>
                                <Icon name="bell-outline" size={22} color={'#707070'} style={styles.iconB} />
                            </View>
                            <View style={styles.botones}>
                                <TouchableOpacity style={styles.iconF}
                                    onPress={this._filtro}
                                >
                                    {this.state.filter===false &&(
                                        <Icon name="swap-vertical" size={24} color={'#707070'} />
                                    )}
                                    {this.state.filter===true &&(
                                        <Icon name="swap-vertical" size={24} color={'#71C0F2'} />
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.iconA}
                                    onPress={() => this.props.navigation.navigate('AddPromo')}
                                >
                                    <Icon name="plus" size={24} color={'#FEDB6B'}  />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.state.establecimieniemtos===false && (
                            <FlatList
                                style={styles.flat}
                                data={this.state.datos}
                                renderItem={this.caja}
                                keyExtractor={(item) => item.id.toString()}
                            />
                        )}
                        {this.state.establecimieniemtos===true && (
                            <FlatList
                                style={styles.flat}
                                data={estable}
                                renderItem={this.caja2}
                                keyExtractor={item => item.id}
                            />
                        )}
                    </View>
                </View>
            );
        }else{
            return(
                <View style={styles.indicador}>
                    <ActivityIndicator size="large" color="#DE4C63"/>
                </View>
            );
        }
    }   
}

const styles = StyleSheet.create({
    todo:{
        flex: 1,
    },
    arriba:{
        // flex:1,
        // marginTop: 25,
        width:'100%',
        height: '16%',
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
    iconE:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
    //    marginLeft: '5%',
       marginTop: 10,
       backgroundColor:'#6930BF',
       width: 170,
       height:30,
       borderRadius:10,
    },
    iconA:{
        marginLeft: '5%',
        marginTop: 12.5
    },
    iconF:{
        // marginLeft: '%',
        marginTop: 12.5
    },
    iconB:{
        marginLeft: '59%'
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
    TInput:{
        width: '60%',
        height: '70%',
        marginTop: 10,
        backgroundColor:'white',
        paddingLeft: 8,
        borderRadius: 10,
        // marginLeft: 18,
    },
    container: {
        flex: 4,
        alignItems: 'center',
        flexDirection:'column',
        justifyContent: 'center',
        backgroundColor:'#FAFAFA',
        // marginTop: '20%',
        height: '100%',
    },
    titulo:{
        flex: 1,
        fontSize: 16,
        // color: 'white'
    },
    caja:{
        flex:1,
        flexDirection: 'row',
        width:'90%',
        height: 100,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 8,
        marginLeft:'5%',
        marginTop: 20,
        backgroundColor: 'white',
    },
    flat:{
        flex: 1,
        // alignItems: 'center',
        flexDirection: 'column',
        // justifyContent: 'center',
        width: '100%',
        height: '100%',
        // backgroundColor: 'purple'
    },
    imgCaja:{
        flex: 1,
        width:'10%',
        height: '100%',
        borderRadius: 10,
        backgroundColor:'gray'
    },
    datosCaja:{
        flex:3,
        width:'70%',
        height: '100%',
        // backgroundColor: 'pink',
        marginLeft: 10,
        padding: 10,
    },
    indicador:{
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    }
});
