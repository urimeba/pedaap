import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import Circle from '../components/Circle'

const p = [
    {
        id: '1',
        name: 'Vodka'
    },
    {
        id: '2',
        name: 'Tequila'
    }
]

export default (props) => {
    return (
        <FlatList 
            style={styles.flat} 
            data={p} 
            renderItem={({item}) => {
                <Circle data={item}/>
            }}
            keyExtractor={item => item.id}
        />
    );
}

const styles = StyleSheet.create({
    flat:{
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
});