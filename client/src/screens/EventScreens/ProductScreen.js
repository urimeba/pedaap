import React, {Component} from 'react';
import { SafeAreaView, View, FlatList,SectionList, StyleSheet, Text, Image, TextInput,TouchableOpacity, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const item=[
    {
        id: '1',
        nombre: 'Cerveza oscura',
        productos:[
            {
                id:'1',
                producto:'cerveza indio',
                precio: 20,
                lugar:'Oxxo'
            },
            {
                id:'2',
                producto:'cerveza indio',
                precio: 20,
                lugar:'Oxxo'
            },
            {
                id:'3',
                producto:'cerveza indio',
                precio: 20,
                lugar:'Oxxo'
            },
        ]
    }, 
    {
        id: '2',
        nombre: 'Cerveza clara',
        productos:[
            {
                id:'1',
                producto:'cerveza indio',
                precio: 20,
                lugar:'Oxxo'
            },
            {
                id:'2',
                producto:'cerveza indio',
                precio: 20,
                lugar:'Oxxo'
            },
            {
                id:'3',
                producto:'cerveza indio',
                precio: 20,
                lugar:'Oxxo'
            },
        ]
    }, 
    {
        id: '3',
        nombre: 'Cerveza Ambar',
        productos:[
            {
                id:'1',
                producto:'cerveza indio',
                precio: 20,
                lugar:'Oxxo'
            },
            {
                id:'2',
                producto:'cerveza indio',
                precio: 20,
                lugar:'Oxxo'
            },
            {
                id:'3',
                producto:'cerveza indio',
                precio: 20,
                lugar:'Oxxo'
            },
        ]
    },
];

//  const daata = datos.productos


export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            filter: false,
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

    caja= ({item})=>(
        <TouchableOpacity style={styles.caja}>
            <View style={styles.imgCaja}>
                <Image/>
            </View>
            <View style={styles.datosCaja}>
                <Text style={styles.titulo}>{item.producto}</Text>
                <Text style={styles.titulo2}>${item.precio}</Text>
                <Text style={styles.titulo3}>{item.lugar}</Text>
            </View>
        </TouchableOpacity>
    )

    render(){
        console.log(item)
        console.log(item.productos)
        return(
            <View style={styles.todo}>
            <View style={styles.container}>
                <View style={styles.arriba}>
                    <View style={styles.textoP}>
                        <Text style={styles.tituloP}>Productos</Text>
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
                    data={item}
                    renderItem={this.prod}
                    keyExtractor={item => item.id}
                />
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
    titulo2:{
        flex: 1,
        fontSize: 16,
        color:'#DE4C63'
        // color: 'white'
    },
    titulo3:{
        flex: 1,
        fontSize: 16,
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
    tituloCajas:{
        width:'100%',
        height:45,
        fontSize:18,
        // marginBottom:20,
        marginTop:10,
        padding:10
    }
});
