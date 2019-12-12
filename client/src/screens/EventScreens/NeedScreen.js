import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
// import axios from 'axios';

import Circle from '../../components/Circle';

export default (props) => {
    //** las de la izquierda son variables que se van a guardar como state
    // Todas estas variables son equivalentes a this.state.<<variable>> para usarse
    // cada set<<Variable>> es una funcion equivalente a this.setState()
    const [nombre, setNombre] = useState('');
    const [presupuesto, setPresupuesto] = useState('');
    const [tipo, setTipo] = useState('');
    const [numAsis, setNumAsis] = useState('');

    //** selected ** variable equivalente a this.state.selected que es un []
    const [selected, setSelected] = useState(new Map());
    const onSelect = React.useCallback(
        (id) => {
            const newSelected = new Map(selected);
            newSelected.set(id, !selected.get(id));

            setSelected(newSelected);
        },
        [selected]
    );

    //Data
    //** dataP ** variavle equivalente a this.state.dataP que es un []
    const [dataP, setDataP] = useState([]);
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
                console.log(resp.results);
                setDataP(resp.results);

                //set de todos los state
                setNombre(JSON.stringify(props.navigation.getParam('nombre', 'Error nombre')).replace(/"/g, ''));
                setPresupuesto(JSON.stringify(props.navigation.getParam('presupuesto', 'Error presupuesto')).replace(/"/g, ''));
                setTipo(JSON.stringify(props.navigation.getParam('tipo', 'Error tipo')).replace(/"/g, ''));
                setNumAsis(JSON.stringify(props.navigation.getParam('numAsis', 'Error numAsis')).replace(/"/g, ''));

            } catch (error) {
                console.log(error);
            }
        }
        _prefLis();
    }, [setDataP]);


    //Send Data
    const sendData = (s) => async() => {
        console.log(nombre+'-'+presupuesto+'-'+tipo+'-'+numAsis);
        /*
            Se convierte el MAP en un JSON que se puede enviar a la API
        */
        let obj = Object.create(null);
        for (let [k,v] of s) {
            obj[k] = v;
        }
        console.log(JSON.stringify(obj));

        servidor = await AsyncStorage.getItem("server")
        
        idUser = await AsyncStorage.getItem("userId");
        token = await AsyncStorage.getItem("userToken");

        // for(categoria in obj){
        //     if(obj[categoria]==true){
        //         console.log(categoria);
        //         url = servidor+'userCategorias/';

        //         axios({
        //             method: 'POST',
        //             url: url,
        //             data: {user:servidor+"usuarios/"+idUser+"/", categoria: servidor+"categoriaProductos/"+categoria+"/"},
        //             headers: {
        //                 "content-type":"application/json",
        //                 "Authorization": "Token "+token
        //             }, 
        //         }).then( res => {
        //             console.log(res.data);
        //         }).catch(err => {
        //             console.log(err.response.data);
        //         });
        //     }
        // }

        goNext();
    }

    const goNext = () => {
        props.navigation.navigate('Product');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleWhite}>Selecciona lo que necesitas</Text>
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
                <View style={{flex: 1}}></View>
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
        padding: 20
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
        width: '70%',
        backgroundColor: '#393939',
    },
    titleWhite:{
        color: '#FFFFFF',
        fontSize: 26,
        textAlign:'center'
    },
    white:{
        color: '#FFFFFF',
        fontSize: 18
    }
});