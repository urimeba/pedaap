import React from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    AsyncStorage,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

import CircleTwo from '../../components/CircleTwo';

export default (props) => {
    //Data
    const [dataS, setDataS] = React.useState([]);

    React.useEffect(() => {
        async function _prefLis() {
            url = await AsyncStorage.getItem("server");
            url2 = url+'tiendas/';
            token = await AsyncStorage.getItem('userToken');

            try {
                let request = await fetch(url2, {
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Authorization': 'Token '+token, 
                    }
                });
                let resp = await request.json();
                setDataS(resp.results);

                axios({
                    method: 'POST',
                    url: url+"userTiendas/eliminarTiendas/",
                    data: {idUser:idUser},
                    headers: {
                        "content-type":"application/json",
                        "Authorization": "Token "+token
                    }, 
                }).then( res => {
                    console.log(res.data);
                }).catch(err => {
                    console.log(err.response.data);
                });

            } catch (error) {
                console.error(error);
            }
        }
        _prefLis();
    }, [setDataS]);

    //Circulos
    const [selected, setSelected] = React.useState(new Map());

    const onSelect = React.useCallback(
        (id) => {
            const newSelected = new Map(selected);
            newSelected.set(id, !selected.get(id));

            setSelected(newSelected);
        },
        [selected],
    );

    //Send Data to API
    const sendData = (s) => async() => {

        servidor = await AsyncStorage.getItem("server")
        idUser = await AsyncStorage.getItem("userId");
        token = await AsyncStorage.getItem("userToken");
        

        let obj = Object.create(null);
        for (let [k,v] of s) {
            obj[k] = v;
        }

        tamaño = Object.keys(obj).length;
        console.log(tamaño);
        console.log(JSON.stringify(obj));


        for(categoria in obj){
            if(obj[categoria]==true){
                console.log(categoria);
                url = servidor+'userTiendas/';

                urlUser = servidor+"usuarios/"+idUser+"/";
                urlTienda = servidor+"tiendas/"+categoria+"/";
                console.log(urlUser)

                axios({
                    method: 'POST',
                    url: url,
                    data: {user:urlUser, tienda: urlTienda},
                    headers: {
                        "content-type":"application/json",
                        "Authorization": "Token "+token
                    }, 
                }).then( res => {
                    console.log(res.data);
                }).catch(err => {
                    console.log(err.response.data);
                });
            }else{
                url = servidor+'userTiendas/eliminarTienda/';

                axios({
                    method: 'POST',
                    url: url,
                    data: {idUser: idUser, idTienda:categoria},
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
        Alert.alert('Preferencias actualizadas')

        props.navigation.navigate('Profile');
    }

    _eliminarCategorias = async() =>{

        servidor = await AsyncStorage.getItem("server")
        idUser = await AsyncStorage.getItem("userId");
        token = await AsyncStorage.getItem("userToken");
        url = servidor+'userCategorias/eliminarCategoria/';

        axios({
            method: 'POST',
            url: url,
            data: {idUser:idUser},
            headers: {
                "content-type":"application/json",
                "Authorization": "Token "+token
            }, 
        }).then( res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err.response.data);
        });

        props.navigation.goBack()

    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleWhite}>Selecciona tus establecimientos preferidos</Text>
            </View>
            <View style={styles.flatContainer}>
                <FlatList 
                    style={styles.flat} 
                    data={dataS}
                    renderItem={({item}) => (
                        <CircleTwo
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
                <TouchableOpacity 
                    style={styles.back} 
                    onPress={_eliminarCategorias}
                >   
                    <Icon name="keyboard-backspace" size={40} color={'#707070'} />
                </TouchableOpacity>
                <View style={styles.viewContinue}>
                    <TouchableOpacity 
                        style={styles.continue} 
                        onPress={sendData(selected)}
                    >
                    <Text style={styles.white}>Aceptar</Text>
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
    back:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleWhite:{
        color: '#FFFFFF',
        fontSize: 26,
        textAlign: 'center',
    },
    white:{
        color: '#FFFFFF',
        fontSize: 18
    }
});