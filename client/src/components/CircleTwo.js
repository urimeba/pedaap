import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';

export default CircleTwo = ({data, selected, onSelect}) => {
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
                    <Image source={require('../img/stores/Oxxo.svg')} />
                </TouchableOpacity>
            </View>
            <View style={styles.bottomBox}>
                <Text style={styles.bottomBoxText}>{data.nombre}</Text>
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
        textAlign: 'center',
    },
    bottomBoxText:{
        color: '#FFFFFF',
        fontSize: 18,
    },
});