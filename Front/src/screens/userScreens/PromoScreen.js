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
    RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import Logo from '../../components/StoreIcons'

export default class App extends Component{
    constructor(props) {
        super(props);
        this.state={
            establecimieniemtos: false,
            filter:false,
            datos: [],
            establecimientos: [],
            loading: true,
            clave: '',
            server: '',
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
        if(this.state.establecimieniemtos===true){
            if(this.state.filter===false){
                let sortData = this.state.establecimientos;
                sortData.sort((a, b) => ((a.nombre === b.nombre) ? 0 : ((a.nombre > b.nombre) ? 1 : -1)));
                this.setState({
                    establecimientos: sortData,
                    filter:true
                })
            }
            if(this.state.filter===true){
                let sortData = this.state.establecimientos;
                sortData.sort((a, b) => ((b.nombre === a.nombre) ? 0 : ((b.nombre > a.nombre) ? 1 : -1)));
                this.setState({
                    establecimientos: sortData,
                    filter:false
                })
            }
        }else{
            if(this.state.filter===false){
                let sortData = this.state.datos;
                sortData.sort((a, b) => parseFloat(a.costo) - parseFloat(b.costo));
                this.setState({
                    datos: sortData,
                    filter:true
                })
            }
            if(this.state.filter===true){
                let sortData = this.state.datos;
                sortData.sort((a, b) => parseFloat(b.costo) - parseFloat(a.costo));
                this.setState({
                    datos: sortData,
                    filter:false
                })
            }
        }
    }

    _busqueda=async(value)=>{
        this.setState({
            clave: value,
        });

        url = await AsyncStorage.getItem("server")+'promociones/busqueda/'
        token = await AsyncStorage.getItem('userToken');

        axios({
            method: 'POST',
            url: url,
            data: {"clave":this.state.clave},
            headers: {
                "content-type":"application/json",
                "Authorization": 'Token '+token

            }, 
        }).then(res => {
            // console.log(res.data.Datos)
            let j = res.data.Datos.replace(/'/g,'"');
            let json_data = JSON.parse(j);
            let data = [];
            // console.log(json_data);

            for(var i in json_data){
                data.push(json_data[i]);
            }

            // console.log(data);

            this.setState({
                datos: data,
            });
        }).catch(err => {
            console.log(err);
        })
    }

    componentDidMount = async() => {
        url = await AsyncStorage.getItem("server")+"promociones/getPromos/";
        token = await AsyncStorage.getItem('userToken');
        url2 = await AsyncStorage.getItem("server")+"tiendas/";
        this.setState({
            server: await AsyncStorage.getItem("server"),
        });

        // console.log(url);

        fetch(url, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Authorization': 'Token '+token,
                }
            }
        )
        .then(response => response.json())
        .then((responseJson)=>{
            let j = responseJson.Datos.replace(/'/g,'"');
            // console.log(j)
            let json_data = JSON.parse(j);
            // console.log(json_data)
            let data = [];
            // console.log(json_data[1] );

            for(var i in json_data){
                data.push(json_data[i]);
            }
            
            this.setState({
                datos: data,
            });

            fetch(url2, {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Authorization': 'Token '+token,
                    }
                }
            )
            .then(response => response.json())
            .then((responseJson)=>{
                // console.log(responseJson.results);
                this.setState({
                    establecimientos: responseJson.results,
                    loading: false,
                });
            })
            .catch(error=>console.log(error))
        })
        .catch((error)=>{
            console.log(error)
            this.props.navigation.navigate('Login');
        })
    }

    caja= ({item})=>{
        let fechaSplit = item.vigencia.split("-");
        let fechaFormat = fechaSplit[2]+'/'+fechaSplit[1]+'/'+fechaSplit[0];

        if(item.foto == "None"){
            return(
                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('Promotion', {
                        datos: item,
                        id: item.id,
                        nombre: item.nombre,
                        lugar: item.lugar,
                        vigencia: item.vigencia,
                        categoria: item.categoria,
                        descripcion: item.descripcion,
                        direccion: item.direccion,
                        costo: item.costo,
                        icono: item.icono,
                    })}
                    style={styles.caja}
                >
                    <View style={styles.imgCaja}>
                        <Image
                            style={styles.pngImage}
                            source={Logo[item.icono]}
                            resizeMode="center"
                        />
                    </View>
                    <View style={styles.datosCaja}>
                        <Text style={styles.titulo}>{item.nombre}</Text>
                        {item.costo == '0.00' &&(
                            <Text style={styles.tituloPromo}>Promoción</Text>
                        )}
                        {item.costo != '0.00' &&(
                            <Text style={styles.tituloCosto}>${item.costo}</Text>
                        )}
                        <Text style={styles.titulo}>Vigencia: {fechaFormat}</Text>
                    </View>
                </TouchableOpacity>
            );
        }else{
            return(
                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('Promotion', {
                        datos: item,
                        id: item.id,
                        nombre: item.nombre,
                        lugar: item.lugar,
                        vigencia: item.vigencia,
                        categoria: item.categoria,
                        descripcion: item.descripcion,
                        direccion: item.direccion,
                        costo: item.costo,
                        foto: this.state.server+'media/'+item.foto,
                        fotoRaw: item.foto
                    })}
                    style={styles.caja}
                >
                    <View style={styles.imgCaja}>
                        <Image
                            style={styles.pngImagePhoto}
                            source={{uri: this.state.server+'media/'+item.foto}}
                            resizeMode="center"
                        />
                    </View>
                    <View style={styles.datosCaja}>
                        <Text style={styles.titulo}>{item.nombre}</Text>
                        {item.costo == '0.00' &&(
                            <Text style={styles.tituloPromo}>Promoción</Text>
                        )}
                        {item.costo != '0.00' &&(
                            <Text style={styles.tituloCosto}>${item.costo}</Text>
                        )}
                        <Text style={styles.titulo}>Vigencia: {fechaFormat}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }

    caja2=({item})=>(
        <View style={styles.caja2}>
            <View style={styles.imgCaja}>
                <Image
                    style={styles.pngImage}
                    source={Logo[item.icono]}
                    resizeMode="center"
                />
            </View>
            <View style={styles.datosCaja}>
                <View style={{flex:4}}>
                    <Text style={styles.titulo}>{item.nombre}</Text>
                    <Text style={styles.titulod}>{item.direccion}</Text>
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                    <Text style={styles.titulo11}>Apertura:{item.horaApertura}</Text>
                    <Text style={styles.titulo12}>Cierre:{item.horaCierre}</Text>
                </View>
            </View>
        </View>
    )

    render(){
        if(!this.state.loading){
            return (
                <View style={styles.todo}>
                    <View style={styles.container}>
                        <View style={styles.arriba}>
                            <View style={styles.textoP}>
                                <Text style={styles.tituloP}>Promociones</Text>
                            </View>
                            <View style={styles.botones}>
                                <TextInput 
                                    style={styles.TInput}
                                    placeholder="Buscar"
                                    placeholderTextColor="#848482"
                                    onChangeText={(value)=>this._busqueda(value)}
                                />
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
                                    style={styles.iconE}  
                                    onPress={this._estable}
                                >
                                    {this.state.establecimieniemtos===false &&(
                                        <Icon name="store" size={24} color={'#707070'}/>
                                    )}
                                    {this.state.establecimieniemtos===true &&(
                                        <Icon name="store" size={24} color={'#DE4C63'}/>
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.iconA}
                                    onPress={() => this.props.navigation.navigate('New')}
                                >
                                    {this.state.establecimieniemtos===false &&(
                                        <Icon name="plus" size={24} color={'#FEDB6B'}  />
                                    )}
                                    {this.state.establecimieniemtos===true &&(
                                        <Icon name="plus" size={24} color={'#FAFAFA'}  />
                                    )}
                                    
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.state.establecimieniemtos===false && (
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.loading}
                                        onRefresh={this.componentDidMount}
                                    />
                                }
                                style={styles.flat}
                                data={this.state.datos}
                                renderItem={this.caja}
                                keyExtractor={item => item.id.toString()}
                                extraData={this.state}
                            />
                        )}
                        {this.state.establecimieniemtos===true && (
                            <FlatList
                                style={styles.flat}
                                data={this.state.establecimientos}
                                renderItem={this.caja2}
                                keyExtractor={item => item.id.toString()}
                                extraData={this.state}
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
        marginTop: 25,
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
       marginLeft: '5%',
       marginTop: 12.5
    },
    iconA:{
        marginLeft: '5%',
        marginTop: 12.5
    },
    iconF:{
        marginLeft: '6%',
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
    tituloCosto:{
        flex: 1,
        fontSize: 16,
        color: '#6930BF'
        // color: 'white'
    },
    tituloPromo:{
        flex: 1,
        fontSize: 16,
        color: '#71C0F2'
        // color: 'white'
    },
    titulod:{
        flex: 2,
        fontSize: 12,
        // color: 'white'
    },
    titulo11:{
        flex: 1,
        fontSize: 12,
        color: '#71C0F2'
    },
    titulo12:{
        flex: 1,
        fontSize: 12,
        color: '#6930BF'
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
    caja2:{
        flex:1,
        flexDirection: 'row',
        width:'90%',
        height: 120,
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
        // backgroundColor:'red',
        backgroundColor:'#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center'
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
    },
    pngImage:{
        height: 50,
        width: 50,
    },
    pngImagePhoto:{
        height: '100%',
        width: '100%',
        borderRadius: 10,
    }
});
