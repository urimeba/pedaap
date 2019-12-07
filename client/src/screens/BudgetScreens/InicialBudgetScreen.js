import React from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    AsyncStorage,
    TextInput,
    ScrollView
} from 'react-native';
// import axios from 'axios';

import Circle from '../../components/Circle';

export default (props) => {
    
    // const [dataP, setDataP] = React.useState([]);

    
const dataP = [
    {
        id: '1',
        name: 'Vodka'
    },
    {
        id: '2',
        name: 'Tequila'
    },
    {
        id: '3',
        name: 'Vodka'
    },
    {
        id: '4',
        name: 'Tequila'
    },
    {
        id: '5',
        name: 'Tequila'
    },
    {
        id: '6',
        name: 'Vodka'
    },
];

    // React.useEffect(() => {
    //     async function _prefLis() {
    //         url = await AsyncStorage.getItem("server")+'categoriaProductos/';
    //         token = await AsyncStorage.getItem('userToken');

    //         try {
    //             let request = await fetch(url, {
    //                 method: 'GET',
    //                 mode: 'cors',
    //                 credentials: 'include',
    //                 headers: {
    //                     'Authorization': 'Token '+token, 
    //                 }
    //             });
    //             let resp = await request.json();
    //             setDataP(resp.results);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    //     _prefLis();
    // }, [setDataP]);

    //Cirulos
    const [selected, setSelected] = React.useState(new Map());

    const onSelect = React.useCallback(
        (id) => {
            const newSelected = new Map(selected);
            newSelected.set(id, !selected.get(id));

            setSelected(newSelected);
        },
        [selected]
    );

    const goNext = () => {
        props.navigation.navigate('ShareBudget');
    }

    return (
       <View style={styles.todo}>
                <View style={styles.presup}>
                    <Text style={styles.tituloPres}>Ingresa el presupuesto inicial</Text>
                    <TextInput 
                        style={styles.TInput}
                        placeholder="$200"
                        keyboardType = 'numeric'
                        placeholderTextColor="#848482"
                        // onChangeText={(presupuesto) => this.setState({ presupuesto })}
                    />
                </View>
                <ScrollView style={styles.abajoNegro}>
                    <Text style={styles.tituloNegro}>¿Que vas a necesitar?</Text>
                        <View style={styles.flatContainer}>
                            <FlatList 
                                style={styles.flat} 
                                data={dataP} 
                                renderItem={({item}) => (
                                    <Circle 
                                        data={item}
                                        selected={!!selected.get(item.id)}
                                        onSelect={onSelect}
                                    />
                                )}
                                keyExtractor={item => item.id}
                                extraData={selected}
                                numColumns={3}
                            />
                        </View>
                    <TouchableOpacity 
                        style={styles.InputsNavEnter}
                        onPress={goNext}>
                        <Text style={[styles.TextColorOne, styles.TextButton]}>Crear</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
    );
}

const styles = StyleSheet.create({
    todo:{
        flex: 1,
    },
    arriba:{
        // flex:1,
        marginTop: 25,
        width:'100%',
        height: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        // backgroundColor: '#FAFAFA',
        // backgroundColor:'yellow',
    },
    container: {
        // flex: 4,
        alignItems: 'center',
        flexDirection:'column',
        justifyContent: 'center',
        backgroundColor:'#FAFAFA',
        marginTop: '8%',
        height: '5%',
        width:'100%',
    },
    botones:{
        // flex:1,
        flexDirection:'row',
        alignContent: 'center',
        // justifyContent: 'center',
        width: '100%',
        height:'40%',
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
        height:'100%',
        marginTop: 6

        // backgroundColor:'blue'
    },
    InputsNavEnter: {
       borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        height:40,
        width: 90,
        backgroundColor: '#393939',
        marginTop: 15,
        marginBottom:20
    },
    TextColorOne: {
        fontSize: 18,
        color: '#848482',
    },
    TextButton: {
        fontSize: 18,
        color: '#FAFAFA',
    },
    TInput: {
       width:'100%',
        height: 70,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        padding: 10,
        fontSize: 18,
        textAlign:'center',
        marginTop: 30
    },
    presup:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        width: '100%',
        height: '30%',
        paddingRight: 40,
        paddingLeft: 40,
    },
    tituloPres:{
        textAlign:'center',
        fontSize: 25,
    },
    abajoNegro:{
        flex:2,
        // alignContent:'center',
        // alignItems:'center',
        // justifyContent:'center',
        width: '100%',
        height:'80%',
        marginTop: 20,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        backgroundColor: '#1E1E1E',
        padding:20
    },
    tituloNegro:{
        textAlign:'center',
        color:'white',
        fontSize:20,
        marginBottom: 10
    },
     flatContainer:{
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flat:{
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
})