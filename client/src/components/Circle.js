import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default Circle = ({data, selected, onSelect}) => {
    return (
        <View style={styles.dataBox}>
            <View style={styles.topBox}>
                <TouchableOpacity
                    onPress={() => onSelect(data.id)}
                    style={[
                        styles.circle,
                        {backgroundColor: selected ? '#FFFFFF' : '#393939'}
                    ]}          
                >
                    <Icon name="bell-outline" size={50} color={'#707070'} />
                </TouchableOpacity>
            </View>
            <View style={styles.bottomBox}>
                <Text style={styles.bottomBoxText}>{data.name}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    dataBox:{
        flex: 1,
        marginBottom: 15,
    },
    topBox:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle:{
        // backgroundColor: '#393939',
        height: 100,
        width: 100,
        borderRadius: 400,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomBox:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    bottomBoxText:{
        color: '#FFFFFF',
        fontSize: 18,
    },
});