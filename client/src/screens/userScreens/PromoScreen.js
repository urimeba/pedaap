import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image, TextInput,TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const datos=[
    {
        id: '1',
        titulo: '2 x 1 Cerveza Indio',
        lugar: 'Oxxo Juriquilla',
        vigencia: '20/11/2019'
    }, 
    {
        id: '2',
        titulo: '2 x 1 Cerveza Indio',
        lugar: 'Oxxo LOoo',
        vigencia: '20/11/2019'
    }, 
    {
        id: '3',
        titulo: '2 x 1 Cerveza Indio',
        lugar: 'Oxxo Mi',
        vigencia: '20/11/2019'
    },
    {
        id: '4',
        titulo: '2 x 1 Cerveza Indio',
        lugar: 'Oxxo Mi',
        vigencia: '20/11/2019'
    },
    {
        id: '5',
        titulo: '2 x 1 Cerveza Indio',
        lugar: 'Oxxo Mi',
        vigencia: '20/11/2019'
    },
    {
        id: '6',
        titulo: '2 x 1 Cerveza Indio',
        lugar: 'Oxxo Mi',
        vigencia: '20/11/2019'
    },
    {
        id: '7',
        titulo: '2 x 1 Cerveza Indio',
        lugar: 'Oxxo Mi',
        vigencia: '20/11/2019'
    },
    {
        id: '8',
        titulo: '2 x 1 Cerveza Indio',
        lugar: 'Oxxo Mi',
        vigencia: '20/11/2019'
    },
    {
        id: '9',
        titulo: '2 x 1 Cerveza Indio',
        lugar: 'Oxxo Mi',
        vigencia: '20/11/2019'
    },
];

function Cajas({data}){
    console.log(data)
    return (
        <View style={styles.caja}>
            <View style={styles.imgCaja}>
                <Image/>
            </View>
            <View style={styles.datosCaja}>
                <Text style={styles.titulo}>{data.titulo}</Text>
                <Text style={styles.titulo}>{data.lugar}</Text>
                <Text style={styles.titulo}>{data.vigencia}</Text>
            </View>
        </View>
    );
}

export default (props) => {
    return (
        <View style={styles.todo}>
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
                        <TouchableOpacity style={styles.iconE}  onPress={() => props.navigation.navigate('Promotion')}>
                             <Icon name="store" size={24} color={'#DE4C63'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconA} onPress={() => props.navigation.navigate('Login')}>
                            <Icon name="plus" size={24} color={'#FEDB6B'}  />
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    style={styles.flat}
                    data={datos}
                    renderItem={({item})=> 
                    <Cajas data={item}/>
                }
                keyExtractor={item => item.id}
                />
            </View>
        </View>
        
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
       marginLeft: '8%',
       marginTop: 12.5
    },
    iconA:{
        marginLeft: '5%',
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
