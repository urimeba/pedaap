import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default Caja = ({data}) => {
    return (
        <View style={styles.circleBox}>
            <View style={styles.circle}>
                <Icon name="bell-outline" size={24} color={'#707070'} />
            </View>
            <View>
                <Text>data.name</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

});