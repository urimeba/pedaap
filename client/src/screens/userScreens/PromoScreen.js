import React, {Component} from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
        url = await AsyncStorage.getItem("server")+'promociones/';
        token = await AsyncStorage.getItem('userToken');
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Authorization': 'Token '+token, 
            }
        })
        .then(response => response.json())
        .then((responseJson)=>{
            this.setState({
                datos: responseJson.results
            });
        })
        .catch(error=>console.error(error))
    }

    // componentDidMount(){
    //     return fetch('https://facebook.github.io/react-native/movies.json')
    //     .then((response) => response.json())
    //     .then((responseJson) => {

    //     this.setState({
    //         isLoading: false,
    //         dataSource: responseJson.movies,
    //     }, function(){

    //     });

    //     })
    //     .catch((error) =>{
    //     console.error(error);
    //     });
    // }

    caja=({item})=>(
        <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Promotion', {
                datos: item, 
                id: item.id,
                nombre: item.nombre,
                lugar: item.lugar,
                vigencia: item.vigencia,
                categoria: item.categoria,
                descripcion: item.descripcion,
                direccion: item.direccion
            })}
            style={styles.caja}
        >
            <View style={styles.imgCaja}>
                <Image/>
            </View>
            <View style={styles.datosCaja}>
                <Text style={styles.titulo}>{item.titulo}</Text>
                <Text style={styles.titulo}>{item.lugar}</Text>
                <Text style={styles.titulo}>{item.vigencia}</Text>
            </View>
        </TouchableOpacity>
    )

    caja2= ({item})=>(
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
        return (
            <View style={styles.todo}>
                {console.log(this.state.datos)}
                <View style={styles.container}>
                    <View style={styles.arriba}>
                        <View style={styles.textoP}>
                            <Text style={styles.tituloP}>Promociones</Text>
                            <Icon name="bell-outline" size={22} color={'#707070'} style={styles.iconB} />
                        </View>
                        <View style={styles.botones}>
                            <TextInput 
                                style={styles.TInput}
                                placeholder="Buscar"
                                placeholderTextColor="#848482"
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
                                <Icon name="store" size={24} color={'#DE4C63'}/>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.iconA}
                                onPress={() => this.props.navigation.navigate('New')}
                            >
                                <Icon name="plus" size={24} color={'#FEDB6B'}  />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {this.state.establecimieniemtos===false && (
                        <FlatList
                            style={styles.flat}
                            data={datos}
                            renderItem={this.caja}
                            keyExtractor={item => item.id}
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
    }   
}

function Cajas({data}){
    console.log(data)
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('Login', {datos: data})} style={styles.caja}>
            <View style={styles.imgCaja}>
                <Image/>
            </View>
            <View style={styles.datosCaja}>
                <Text style={styles.titulo}>{data.titulo}</Text>
                <Text style={styles.titulo}>{data.lugar}</Text>
                <Text style={styles.titulo}>{data.vigencia}</Text>
            </View>
        </TouchableOpacity>
    );
}

console.log(datos[0].vigencia)
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
    }
});
