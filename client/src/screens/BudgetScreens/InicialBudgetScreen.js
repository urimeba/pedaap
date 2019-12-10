import React, {Component} from 'react';
import { SafeAreaView, View, Alert, FlatList, StyleSheet, Text, Image, TextInput,TouchableOpacity, ScrollView, AsyncStorage} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Asset } from 'expo-asset';
import axios from 'axios';

import Circle from '../../components/Circle';

export default (props) => {
    // const dataP = [
    //     {
    //         id: '1',
    //         name: 'Vodka'
    //     },
    //     {
    //         id: '2',
    //         name: 'Tequila'
    //     },
    //     {
    //         id: '3',
    //         name: 'Vodka'
    //     },
    //     {
    //         id: '4',
    //         name: 'Tequila'
    //     },
    //     {
    //         id: '5',
    //         name: 'Tequila'
    //     },
    //     {
    //         id: '6',
    //         name: 'Vodka'
    //     },
    // ];

    //Data
    const [dataP, setDataP] = React.useState([]);
    React.useEffect(() => {
        async function _prefLis() {
            url = await AsyncStorage.getItem("server")+'categoriaProductos/';
            token = await AsyncStorage.getItem('userToken');

            try {
                let request = await fetch(url, {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Authorization': 'Token '+token, 
                    }
                });
                let resp = await request.json();
                setDataP(resp.results);
            } catch (error) {
                console.error(error);
            }
        }
        _prefLis();
    }, [setDataP]);

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

    //Presupuesto
    const [presupuesto, setPresupuesto] = React.useState('')


    // _next=async()=>{
    //     // Alert.alert('back')
    //     url = await AsyncStorage.getItem("server");
    //     token = await AsyncStorage.getItem("userToken");
    //     idUser = await AsyncStorage.getItem("userId");
    //     // console.log(this.state.presupuesto)


    //     if(isNaN(this.state.presupuesto)){
    //         // console.log(false)
    //         Alert.alert("Error","Ingresa un numero válido");
    //     }else{
    //         if(this.state.presupuesto>0){
    //             // console.log(true)
    //             axios({
    //                 method: 'POST',
    //                 url: url+"compartidos/",
    //                 data: {usuarioPropietario:url+"usuarios/"+idUser+"/", monto:this.state.presupuesto},
    //                 headers: {
    //                     "content-type":"application/json",
    //                     "Authorization":"Token "+ token
    //                 }, 
    //             }).then( res => {
    //                 console.log(res.data.id, res.data.monto, res.data.codigo);
    //                 this.props.navigation.navigate('ShareBudget',{idPresupuesto: res.data.id, monto: res.data.monto, codigo:res.data.codigo })
    //             }).catch(err => {
    //                 console.log(err)
    //             });
    //         }
    //         else{
    //             // console.log("Igual a 0")
    //             Alert.alert("Error","Debes ingresar un número mayor a 0");
    //         }
    //     }        
    // }

    const sendData = (s) => async() => {
        let obj = Object.create(null);
        for (let [k,v] of s) {
            obj[k] = v;
        }
        console.log(JSON.stringify(obj));

        servidor = await AsyncStorage.getItem("server")
        
        idUser = await AsyncStorage.getItem("userId");
        token = await AsyncStorage.getItem("userToken");

        for(categoria in obj){
            if(obj[categoria]==true){
                console.log(categoria);
                url = servidor+'userCategorias/';

                axios({
                    method: 'POST',
                    url: url,
                    data: {user:servidor+"usuarios/"+idUser+"/", categoria: servidor+"categoriaProductos/"+categoria+"/"},
                    headers: {
                        "content-type":"application/json",
                        "Authorization": "Token "+token
                    }, 
                }).then( res => {
                    console.log(res.data);
                }).catch(err => {
                    console.log(err.response.data);
                });
            }
        }
        goNext();
    }

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
                        maxLength={6}
                        onChangeText={(presupuesto) => setPresupuesto(presupuesto)}
                        value={presupuesto}
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
                        onPress={sendData(selected)}>
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