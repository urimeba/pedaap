import React, {Component} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image, TextInput,TouchableOpacity, ScrollView} from 'react-native';
import Constants from 'expo-constants';
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
    }
];

export default class App extends Component{
    constructor(props){
        super(props);
            this.state={
                datos: []
            }

    }

    _user =async()=>{
        this.props.navigation.goBack()
    }
    


    render(){
        return (
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
                    <ScrollView>
                            <View style={styles.caja}>
                                <View style={styles.imgCaja}>
                                    <Image/>
                                </View>
                                <View style={styles.datosCaja}>
                                    <Text style={styles.titulo1}>Nombre de la promoción</Text>
                                    <View style={styles.inputs}>
                                        <Text style={styles.titulo}>{JSON.stringify(this.props.navigation.getParam('nombre', 'promo'))}</Text>
                                    </View>
                                    <Text style={styles.titulo1}>Promocion</Text>
                                    <View style={styles.inputs}>
                                        <Text style={styles.tituloCosto}>${JSON.stringify(this.props.navigation.getParam('costo', 'promo'))}</Text>
                                    </View>
                                    <Text style={styles.titulo1}>categoría</Text>
                                    <View style={styles.inputs}>
                                        <Text style={styles.titulo}>{JSON.stringify(this.props.navigation.getParam('categoria', 'promo'))}</Text>
                                    </View>
                                    <Text style={styles.titulo1}>Descripción</Text>
                                    <View style={styles.grande}>
                                        <Text style={ styles.titulo}>{JSON.stringify(this.props.navigation.getParam('descripcion', 'promo'))}</Text>
                                    </View>
                                    <Text style={styles.titulo1}>Vigencia</Text>
                                    <View style={styles.inputs}>
                                        <Text style={styles.titulo}>{JSON.stringify(this.props.navigation.getParam('vigencia', 'promo'))}</Text>
                                    </View>
                                    <Text style={styles.titulo1}>Direccion</Text>
                                    <View style={styles.grande}>
                                        <Text style={styles.titulo}>{JSON.stringify(this.props.navigation.getParam('direccion', 'promo'))}</Text>
                                    </View>
                                    <Text style={styles.titulo1}>Lugar</Text>
                                    <View style={styles.inputs}>
                                        <Text style={styles.titulo}>{JSON.stringify(this.props.navigation.getParam('lugar', 'promo'))}</Text>
                                    </View>
                                </View>
                            </View>
                    </ScrollView>
                </View>
            </View>
            
        );
    }
}




    
// console.log(datos[0].vigencia)


const styles = StyleSheet.create({
    todo:{
        flex: 1,
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
    titulo:{
        // flex: 3,
        alignSelf:'center',
        justifyContent:'center',
         fontSize: 16,
        padding:'5%',
        // color: 'white'
    },
    tituloCosto:{
        // flex: 3,
        alignSelf:'center',
        justifyContent:'center',
        fontSize: 20,
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
