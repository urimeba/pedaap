import React, {Component} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image, TextInput,TouchableOpacity, AsyncStorage} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import Logo from '../../components/StoreIcons';

const datos=[
    {
        id: '1',
        nombre: '2 x 1 Cerveza Indio',
        lugar: 'Oxxo Juriquilla',
        vigencia: '20/11/2019',
        categoria: 'bebidas',
        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        direccion: 'google maps'
    }, 
    {
        id: '2',
       nombre: '2 x 1 Cerveza Indio',
        lugar: 'Oxxo 1',
        vigencia: '20/11/2019',
        categoria: 'bebidas',
        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        direccion: 'google maps'
    }, 
    {
        id: '3',
        nombre: '2 x 1 Cerveza Indio',
        lugar: 'Oxxo 2',
        vigencia: '20/11/2019',
        categoria: 'bebidas',
        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        direccion: 'google maps'
    },
    {
        id: '4',
        nombre: '2 x 1 Cerveza Indio',
        lugar: 'Oxxo 3',
        vigencia: '20/11/2019',
        categoria: 'bebidas',
        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        direccion: 'google maps'
    },
    {
        id: '5',
       nombre: '2 x 1 Cerveza Indio',
        lugar: 'Oxxo 4',
        vigencia: '20/11/2019',
        categoria: 'bebidas',
        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        direccion: 'google maps'
    },
    {
        id: '6',
        nombre: '2 x 1 Cerveza Indio',
        lugar: 'Oxxo 5',
        vigencia: '20/11/2019',
        categoria: 'bebidas',
        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        direccion: 'google maps'
    },
    {
        id: '7',
        nombre: '2 x 1 Cerveza Indio',
        lugar: 'Oxxo 6',
        vigencia: '20/11/2019',
        categoria: 'bebidas',
        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        direccion: 'google maps'
    },
    {
        id: '8',
        nombre: '2 x 1 Cerveza Indio',
        lugar: 'Oxxo 7',
        vigencia: '20/11/2019',
        categoria: 'bebidas',
        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        direccion: 'google maps'
    },
    {
        id: '9',
        nombre: '2 x 1 Cerveza Indio',
        lugar: 'Oxxo 8',
        vigencia: '20/11/2019',
        categoria: 'bebidas',
        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        direccion: 'google maps'
    },
];


export default class App extends Component{
    constructor(props) {
            super(props);
            this.state={
                establecimieniemtos: false,
                filter:false,
                idPresupuesto:'',
                promociones: [],
                server: ''
            };
    }

    componentDidMount(){
        // id = JSON.stringify(this.props.navigation.getParam('idPresupuesto', 'NO-ID'));
        // id= id.replace('"','');
        // id= id.replace('"','');
        // this.setState({idPresupuesto:id})
        
        this._getPromos();

    }

    _getPromos = async() =>{
        id = this.props.navigation.getParam('idPresupuesto', 'NO-ID');
        id= id.replace('"','');
        id= id.replace('"','');
        server = await AsyncStorage.getItem("server");
        idUser = await AsyncStorage.getItem("userId");
        token = await AsyncStorage.getItem("userToken");

        this.setState({
            server: server
        })

        axios({
            method: 'POST',
            url: server+"categoriasCompartido/getCategorias/",
            data: {idPresupuesto:id},
            headers: {
              "content-type":"application/json",
              "Authorization": "Token "+token
            },
        }).then( res => {
            //   console.log(res.data.Datos);
            
            a = res.data.Datos;
            let j = a.replace(/'/g,'"');
            let json_data = JSON.parse(j);
            let data = [];
            for(var i in json_data){
                data.push(json_data[i]);
            }
            
            this.setState({promociones: data})
            console.log(data)

        }).catch(err => {
            console.log(err.response.data)
        });

    }

    caja= ({item})=>{
        let fechaSplit = item.vigencia.split("-");
        let fechaFormat = fechaSplit[2]+'/'+fechaSplit[1]+'/'+fechaSplit[0];

        if(item.foto == "None"){
            return(
                <TouchableOpacity onPress={() => this.props.navigation.navigate('PromotionB', {
                    datos: item, 
                    id: item.id,
                    nombre: item.nombre,
                    foto: item.foto,
                    lugar: item.lugar,
                    vigencia: item.vigencia,
                    categoria: item.categoria,
                    descripcion: item.descripcion,
                    direccion: item.direccion,
                    costo: item.costo,
                    icono: item.icono
                    })} style={styles.caja}>
                    <View style={styles.imgCaja}>
                        <Image
                            style={styles.pngImage}
                           source={Logo[item.icono]}
                            resizeMode="center"
                        />
                    </View>
                    <View style={styles.datosCaja}>
                        <Text style={styles.titulo}>{item.nombre}</Text>
                        <Text style={styles.titulo}>{item.lugar}</Text>
                        <Text style={styles.titulo}>Vigencia: {fechaFormat}</Text>
                    </View>
                </TouchableOpacity>
            );
        }else{
            return(
                <TouchableOpacity onPress={() => this.props.navigation.navigate('PromotionB', {
                    datos: item, 
                    id: item.id,
                    nombre: item.nombre,
                    foto: item.foto,
                    lugar: item.lugar,
                    vigencia: item.vigencia,
                    categoria: item.categoria,
                    descripcion: item.descripcion,
                    direccion: item.direccion,
                    costo: item.costo,
                    icono: item.icono
                    })} style={styles.caja}>
                    <View style={styles.imgCaja}>
                        <Image
                            // style={styles.pngImage}
                            source={{uri: this.state.server+'media/'+item.foto}}
                            resizeMode="center"
                        />
                    </View>
                    <View style={styles.datosCaja}>
                        <Text style={styles.titulo}>{item.nombre}</Text>
                        <Text style={styles.titulo}>{item.lugar}</Text>
                        <Text style={styles.titulo}>Vigencia: {fechaFormat}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
        
    }

    // caja= ({item})=>(
    //     <TouchableOpacity onPress={() => this.props.navigation.navigate('PromotionB', {
    //         datos: item, 
    //         id: item.id,
    //         nombre: item.nombre,
    //         foto: item.foto,
    //         lugar: item.lugar,
    //         vigencia: item.vigencia,
    //         categoria: item.categoria,
    //         descripcion: item.descripcion,
    //         direccion: item.direccion,
    //         costo: item.costo,
    //         icono: item.icono
    //          })} style={styles.caja}>
    //         <View style={styles.imgCaja}>
    //             <Image
    //                 // style={styles.pngImage}
    //                 source={{uri: this.state.server+'media/'+item.foto}}
    //                 resizeMode="center"
    //             />
    //         </View>
    //         <View style={styles.datosCaja}>
    //             <Text style={styles.titulo}>{item.nombre}</Text>
    //             <Text style={styles.titulo}>{item.lugar}</Text>
    //             <Text style={styles.titulo}>{item.vigencia}</Text>
    //         </View>
    //     </TouchableOpacity>
    // )

     _filtro=()=>{
        if(this.state.filter===false){
            this.setState({filter:true})
        }
        if(this.state.filter===true){
            this.setState({filter:false})
        }
    }

render(){
    return (
        <View style={styles.todo}>
            <View style={styles.container}>
                <View style={styles.arriba}>
                    <View style={styles.textoP}>
                        <Text style={styles.tituloP}>Promociones</Text>
                    </View>
                     <TouchableOpacity style={styles.iconF}
                        onPress={this._filtro}
                    >
                            {this.state.filter===false &&(
                                <Icon name="swap-vertical" size={26} color={'#707070'} />
                        )}
                            {this.state.filter===true &&(
                                <Icon name="swap-vertical" size={26} color={'#71C0F2'} />
                        )}
                        
                    </TouchableOpacity>
                </View>
                    <FlatList
                    style={styles.flat}
                    data={this.state.promociones}
                    renderItem={this.caja}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
        
    );
}

    
}

console.log(datos[0].vigencia)
const styles = StyleSheet.create({
    todo:{
        flex: 1,
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
