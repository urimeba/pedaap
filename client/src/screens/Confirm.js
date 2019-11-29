import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default (props) =>{
    return(
        <View style={styles.container}>
            <View style={styles.Image}>
                <Image
                    style={{width:'100%', height:'100%', borderBottomLeftRadius: 60,}}
                    source={require('../img/principal.jpg')}
                 />
            </View>
            <View style={styles.Inputs}>
                <View style={styles.InputsTitle}>
                    <Text style={styles.TextColorOne}>Ingresa a tu código</Text>
                </View>
                <View style={styles.InputsUser}>
                    <View style={styles.TInput1}>
                        <Icon name="code-brackets" size={24} color={'#FAFAFA'} style={styles.icon} />
                        <TextInput 
                            style={styles.TInput}
                            placeholder="|  Código"
                            placeholderTextColor="#848482"
                        />
                    </View>
                </View>
            </View>
            <View style={styles.InputsNavEnter}>
                        <TouchableOpacity 
                            style={styles.InputsNavEnterButton} 
                            onPress={() => props.navigation.navigate('SignupPref')}
                        >
                            <Text style={[styles.TextColorOne, styles.TextButton]}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
    },
    Image: {
        height: '35%',
        // backgroundColor: 'red',
        borderBottomLeftRadius: 60,
    },
    Inputs: {
        height: '25%',
        marginTop: '20%',
        // backgroundColor:'red'
    },
    InputsTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    InputsUser: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '40%',
        // backgroundColor:'purple',
        paddingTop: '4%',
        paddingBottom:'4%',
        marginTop: '10%',
    },
    TInput: {
        flex:1,
        width: '80%',
        height: '80%',
        backgroundColor: '#393939',
        borderRadius: 35,
        // paddingLeft: '%',
        paddingTop:'2%',
        marginTop:'2%',
        paddingBottom:'2%',
        fontSize: 18,
        color: '#FAFAFA',
        // backgroundColor:'blue',
    },
    TInput1: {
        flex:1,
        flexDirection:'row',
        width:'80%',
        height: 40,
        // backgroundColor:'pink',
        backgroundColor: '#393939',
        borderRadius: 35,
        paddingLeft: '4%',
        fontSize: 18,
        color: '#FAFAFA',
    },
     TextColorOne: {
        fontSize: 18,
        color: '#848482',
    },
    TextButton: {
        fontSize: 18,
        color: '#FAFAFA',
    },
    icon:{
        // flex:1,
        justifyContent: 'center',
        padding:'3%',
        width: '15%',
        height:'55%',
        // backgroundColor: 'pink',
        marginTop:'5%',
    },
    InputsNavEnter: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        InputsNavEnterButton: {
            borderRadius: 35,
            justifyContent: 'center',
            alignItems: 'center',
            height: '15%',
            width: '40%',
            backgroundColor: '#393939',
        },
});