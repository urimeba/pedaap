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

const p = [
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
    {
        id: '7',
        name: 'Tequila'
    },
    {
        id: '8',
        name: 'Vodka'
    },
    {
        id: '9',
        name: 'Tequila'
    },
    {
        id: '10',
        name: 'Tequila'
    }
];

export default (props) => {
    //Data
    const [dataP, setDataP] = React.useState([])

    React.useEffect(() => {
        async function _prefLis() {
            console.log('useEffect')
            url = await AsyncStorage.getItem("server")+'categoriaProductos/';
            token = await AsyncStorage.getItem('userToken');
            console.log(url);
            console.log(token);

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
                console.log(resp)
                setDataP(resp.results)
            } catch (error) {
                console.error(error)
            }
            // axios({
            //     method: 'get',
            //     url: url,
            //     data: {},
            //     headers: {
            //         // "content-type": "application/json",
            //         'Authorization': 'Token '+token,
            //         'Access-Control-Allow-Origin': '*',
            //     }, 
            // }).then(res => {
            //     console.log(res.data);
            //     console.log(res);
            //     setDataP(res.data);
            // }).catch(err => {
            //     console.error(err);
            // });
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

    // function onSelect(id) {
    //     const newSelected = new Map(selected);
    //     newSelected.set(id, !selected.get(id));

    //     setSelected(newSelected);
    // }

    /*
    const onContinue = React.useCallback(
        //Filter & Map
        () => {
            console.log(Array.from(selected.entries()));
        },
        [selected],
    );
    */

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleWhite}>Selecciona tus gustos</Text>
            </View>
            <View style={styles.flatContainer}>
                <FlatList 
                    style={styles.flat} 
                    data={p}
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
                        //onPress={() => props.navigation.navigate('Stores')}
                        onPress={props._prefList}
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
    },
    white:{
        color: '#FFFFFF',
        fontSize: 18
    }
});