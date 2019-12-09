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
// import axios from 'axios';

import Circle from '../../components/Circle';
const dataP = [{
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
    // const [dataP, setDataP] = React.useState([]);


    const [selected, setSelected] = React.useState(new Map());
    const onSelect = React.useCallback(
        (id) => {
            const newSelected = new Map(selected);
            newSelected.set(id, !selected.get(id));

            setSelected(newSelected);
        },
        [selected]
    );


    //Send Data
    const sendData = (s) => () => {
        // console.log(Array.from(selected.entries()));
        /*
            Se convierte el MAP en un JSON que se puede enviar a la API
        */
        let obj = Object.create(null);
        for (let [k,v] of s) {
            obj[k] = v;
        }
        console.log(JSON.stringify(obj));
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