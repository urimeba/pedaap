import React, {Component} from 'react';
import { SafeAreaView, View, FlatList,SectionList, StyleSheet, Text, Image, TextInput,TouchableOpacity, ScrollView, AsyncStorage} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import Logo from '../../components/StoreIcons'

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            filter: false,
            item: [],
            datos: [],
            server: ''
        }
    }

    componentDidMount(){
        // console.log(this.props.navigation.getParam('idEvento', 'Error ID'));

        this._getPromos();


    }

    _getPromos = async() =>{
        server = await AsyncStorage.getItem("server");
        idUser = await AsyncStorage.getItem("userId");
        token = await AsyncStorage.getItem("userToken");
        this.setState({
            server: await AsyncStorage.getItem("server"),
        });
        id = JSON.stringify(this.props.navigation.getParam('id', '0')).replace(/"/g, '');
        console.log('##################################'+id);

        axios({
            method: 'POST',
            url: server+"presupuestosCategorias/busqueda/",
            // data: {idPresupuesto: "AQUI VA EL ID DEL EVENTO"},
            data: {idPresupuesto: parseInt(id)},
            headers: {
                "content-type":"application/json",
                "Authorization": "Token "+token
            }, 
        }).then( res => {
            let j = res.data.Datos.replace(/'/g,'"');
            // console.log(j)
            let json_data = JSON.parse(j);
            // console.log(json_data)
            let data = [];
            // console.log(json_data[1] );

            for(var i in json_data){
                data.push(json_data[i]);
            }

            console.log(data);

            this.setState({
                datos: data,
            });
        }).catch(err => {
            console.log(err.response.data);
        });
    }

    _filtro=()=>{
        if(this.state.filter===false){
            this.setState({filter:true})
        }
        if(this.state.filter===true){
            this.setState({filter:false})
        }
    }

    prod=({item})=>(
        <View>
            <Text style={styles.tituloCajas}>{item.nombre}</Text>
            <FlatList
                style={styles.flat}
                data={item.productos}
                renderItem={this.caja}
                keyExtractor={item => item.id}
            />
        </View>
    )

    caja= ({item})=>{
        let fechaSplit = item.vigencia.split("-");
        let fechaFormat = fechaSplit[2]+'/'+fechaSplit[1]+'/'+fechaSplit[0];

        if(item.foto == "None"){
            return(
                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('PromotionE', {
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
                    onPress={() => this.props.navigation.navigate('PromotionE', {
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

     _filtro=()=>{
        if(this.state.filter===false){
            this.setState({filter:true})
        }
        if(this.state.filter===true){
            this.setState({filter:false})
        }
    }

    render(){
        // console.log(item)
        // console.log(item.productos)
        return(
            <View style={styles.todo}>
                <View style={styles.container}>
                    <View style={styles.arriba}>
                        <View style={styles.textoP}>
                            <Text style={styles.tituloP}>Promociones</Text>
                        </View>
                            <FlatList
                            style={styles.flat}
                            data={this.state.item}
                            renderItem={this.prod}
                            keyExtractor={item => item.id}
                        />
                    </View>
                        <FlatList
                        style={styles.flat}
                        data={this.state.datos}
                        renderItem={this.caja}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    todo:{
        flex: 1,
        paddingTop: 20,
    },
     iconE: {
         marginTop: 12.5
     },
    arriba:{
        // flex:1,
        // marginTop: 25,
        width:'100%',
        height: 75,
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
        width: '25%',
        height:'35%',
        // padding: 5,
        marginTop:10,
        backgroundColor:'white',
        borderRadius: 15,
         shadowColor: "#000",
        shadowOffset: {
               width: 0,
               height: 2,
           },
           shadowOpacity: 0.25,
           shadowRadius: 3.84,
           elevation: 5,
        padding: 8,
        // backgroundColor:'red'
    },
    tituloP:{
        fontSize: 20
    },
    iconE:{
       marginLeft: '2%',
       marginTop: 12.5
    },
    iconA:{
        marginLeft: '2%',
        marginTop: 12.5
    },
    iconB:{
        // marginLeft: 10
    },
    iconF: {
        marginLeft: '2%',
        marginTop: 12.5
    },
    textoP:{
        flexDirection:'row',
        alignItems:'center',
        // justifyContent:'center',
        width: '100%',
        height:'25%',
        marginTop: 15

        // backgroundColor:'blue'
    },
    TInput:{
        width: '70%',
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
