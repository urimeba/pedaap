import React from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
import axios from 'axios';

import Circle from '../../components/Circle';


export default (props) => {
    //Data
    const [dataP, setDataP] = React.useState([]);

    React.useEffect(() => {
        async function _prefLis() {
            url = await AsyncStorage.getItem("server")+'categoriaProductos/';
            // AsyncStorage.setItem('userId',"1")
            token = await AsyncStorage.getItem('userToken');

            try {
                console.log(token)
                let request = await fetch(url, {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Authorization': 'Token '+token, 
                    }
                });
                let resp = await request.json();
                // console.log(resp.results);
                setDataP(resp.results);
            } catch (error) {
                console.log(error);
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

    const [presupuesto, setPresupuesto] = React.useState('')

    //Send Data
    const sendData = (s) => async() => {
        // console.log(Array.from(selected.entries()));
        /*
            Se convierte el MAP en un JSON que se puede enviar a la API
        */

       
        server = await AsyncStorage.getItem("server")
        idUser = await AsyncStorage.getItem("userId");
        token = await AsyncStorage.getItem("userToken");
        monto = props.navigation.getParam("monto", 0);
        nombre = props.navigation.getParam("nombre", "nombre");

        urlUser = server+"usuarios/"+idUser+"/";

        axios({
        method: 'POST',
        url: server+"compartidos/",
        data: {usuarioPropietario:urlUser, monto:monto},
        headers: {
            "content-type":"application/json",
            "Authorization": "Token "+token
        }, 
        }).then( res => {
            // console.log(res.data);

            let obj = Object.create(null);
            for (let [k,v] of s) {
                obj[k] = v;
            }
            // // console.log(JSON.stringify(obj));

            for(categoria in obj){
                if(obj[categoria]==true){
                    // console.log(categoria);

                    urlPresupuesto = server+"compartidos/"+res.data.id+"/"
                    urlCategoria = server+"categoriaProductos/"+categoria+"/"

                    axios({
                        method: 'POST',
                        url: server+"categoriasCompartido/",
                        data: {presupuestoCompartido:urlPresupuesto , categoria:urlCategoria},
                        headers: {
                            "content-type":"application/json",
                            "Authorization": "Token "+token
                        }, 
                    }).then( res => {
                        // console.log(res.data);
                    }).catch(err => {
                        console.log(err.response.data);
                    });
                }
            }

            goNext(res.data.id);


        }).catch(err => {
            console.log(err.response.data);
        });


        
    }

    const goNext = (id) => {
        // console.log("###############33", id)
        props.navigation.navigate('ShareBudget',{idPresupuesto: id});
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleWhite}>¿Que vas a necesitar?</Text>
            </View>
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
            <View style={styles.next}>
                {/* <View style={{flex: 1}}></View> */}
                <View style={styles.viewContinue}>
                    <TouchableOpacity 
                        style={styles.continue} 
                        onPress={sendData(selected)}
                        // onPress={() => props.navigation.navigate('Stores')}
                    >
                        <Text style={styles.white}>Continuar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#1E1E1E',
    },
    title:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatContainer:{
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
        padding:5,
    },
    flat:{
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    next:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    viewContinue:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    continue:{
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%',
        width: '40%',
        backgroundColor: '#393939',
    },
    titleWhite:{
        color: '#FFFFFF',
        fontSize: 26,
    },
    white:{
        color: '#FFFFFF',
        fontSize: 18
    }
});