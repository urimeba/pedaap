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
    RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import Logo from '../../components/StoreIcons'

const daata=[
    {
        id:'1',
        nombre:'nombre del presupuesto',
        usuarioPropietario:'Carlos jjjjjj',
        fecha:'2019-12-10'
    }
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
            clave: '',
            server: '',
            count: ''
        };
    }

    componentDidMount = async()  =>{
        this._getBudgets();

    }

    _getBudgets = async() =>{
        server = await AsyncStorage.getItem("server");
        idUser = await AsyncStorage.getItem("userId");
        token = await AsyncStorage.getItem("userToken");

        console.log(idUser)

        axios({
            method: 'POST',
            url: server+"compartidos/getPresupuestos/",
            data: {idUser:idUser},
            headers: {
              "content-type":"application/json",
              "Authorization": "Token "+token
            },
      
            }).then( res => {
                //   console.log(res.data.Datos);
                //   this.setState({datos: res.data, count:res.data.count})
                
                a = res.data.Datos;
                let j = a.replace(/'/g,'"');
                let json_data = JSON.parse(j);
                let data = [];
                for(var i in json_data){
                    data.push(json_data[i]);
                }
                console.log()
                this.setState({datos: data})

            }).catch(err => {
                console.log(err.response.data)
              // Alert.alert("Error", err.response.data.Error);
            });
    }



    caja= ({item})=>{
        return(
            <View style={styles.caja}>
                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('ShareBudget',{idPresupuesto:item.id, monto:item.monto, codigo:item.codigo})}
                    style={styles.cajacaja}
                >
                    <View style={styles.datosCaja}>
                        <Text style={styles.titulo}>Codigo: {item.codigo}</Text>
                        <Text style={styles.titulo12}>Creador: {item.propietario}</Text>
                        <Text style={styles.titulo11}>Monto: ${item.monto}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.cajacaja2}>
                    <TouchableOpacity 
                        onPress={() => console.log('Eliminar')}
                        style={styles.caja3Boton}
                    >
                            <Icon name={'delete-outline'} size={20} color={'#DE4C63'} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render(){
        if(!this.state.loading){
            return (
                <View style={styles.todo}>
                    <View style={styles.container}>
                        <View style={styles.arriba}>
                            <View style={styles.textoP}>
                                <Text style={styles.tituloP}>Presupuestos</Text>
                            </View>
                        </View>
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.loading}
                                        onRefresh={this.componentDidMount}
                                    />
                                }
                                style={styles.flat}
                                data={this.state.datos}
                                // data={daata}
                                renderItem={this.caja}
                                keyExtractor={item => item.id.toString()}
                                extraData={this.state}
                            />
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
        marginTop: 15,
        width:'100%',
        height: '7%',
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
        fontSize: 16,
        // color: 'white'
    },
    titulo11:{
        flex: 1,
        fontSize: 15,
        color: '#71C0F2'
    },
    titulo12:{
        flex: 1,
        fontSize: 15,
        color: '#6930BF'
    },
    caja:{
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
    cajacaja:{
        flex: 9,
        height: '100%'
    },
    cajacaja2:{
        flex: 1,
        height: '100%',
        alignItems: 'center'
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
        backgroundColor:'red',
        // backgroundColor:'#F0F0F0',
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
