import React from 'react';
import { FlatList, StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Circle from '../../components/Circle';

const p = [
    {
        id: '1',
        name: 'Oxxo'
    },
    {
        id: '2',
        name: 'Fresko'
    },
    {
        id: '3',
        name: 'Oxxo'
    },
    {
        id: '4',
        name: 'Fresko'
    },
    {
        id: '5',
        name: 'Fresko'
    },
    {
        id: '6',
        name: 'Oxxo'
    },
    {
        id: '7',
        name: 'Fresko'
    },
    {
        id: '8',
        name: 'Oxxo'
    },
    {
        id: '9',
        name: 'Fresko'
    },
    {
        id: '10',
        name: 'Fresko'
    }
];

export default (props) => {
    const [selected, setSelected] = React.useState(new Map());

    const onSelect = React.useCallback(
        (id) => {
            const newSelected = new Map(selected);
            newSelected.set(id, !selected.get(id));

            setSelected(newSelected);
        },
        [selected],
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleWhite}>Selecciona tus establecimientos preferidos</Text>
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
                <TouchableOpacity 
                    style={styles.back} 
                    onPress={() => props.navigation.goBack()}
                >   
                    <Icon name="keyboard-backspace" size={40} color={'#707070'} />
                </TouchableOpacity>
                <View style={styles.viewContinue}>
                    <TouchableOpacity 
                        style={styles.continue} 
                        onPress={() => props.navigation.navigate('Login')}
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