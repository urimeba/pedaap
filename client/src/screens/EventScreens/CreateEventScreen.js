import React, {Component} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image, TextInput,TouchableOpacity, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default class Event extends Component{
    constructor(props){
        super(props);
        this.state={
            nameE:'',
            presu:''

        }
    }

    _crear=()=>{
        this.props.navigation.navigate('EventK')
    }

    render(){
        return(
            <View style={styles.todo}>
                <View style={styles.titulo1}>
                    <Text style={styles.text1}>Ingresa el nombre de tu evento</Text>
                    <TextInput
                        style={styles.nombreE}
                        placeholder="Evento"
                        placeholderTextColor = "#848482"
                        onChangeText={(nameE) => this.setState({ nameE })}
                    />
                </View>
                <View style={styles.titulo2}>
                    <Text style={styles.text2}>Ingresa el presupuesto inicial</Text>
                    <TextInput
                        style={styles.presu}
                        placeholder="$300"
                        placeholderTextColor = "#848482"
                        keyboardType = 'numeric'
                        onChangeText={(presu) => this.setState({ presu })}
                    />
                </View>
                <TouchableOpacity
                     style={styles.btnCrear}
                     onPress={this._crear}
                >
                    <Text style={styles.textC}>Crear</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    todo:{
        flex:1,
        justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
    },
    titulo1:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        width: '100%',
        height: '30%',
        marginTop:30,
        // backgroundColor:'purple',
        padding: 40,
    },
    titulo2:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        width: '100%',
        height: '30%',
        // marginTop:'30%',
        // backgroundColor:'blue',
        padding: 40,
    },
    text1:{
        fontSize:25,
        textAlign:'center',
        // fontStyle:'bold',
        marginBottom:20,
    },
    nombreE:{
        width:'100%',
        height: 70,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        padding: 10,
        fontSize: 18,
        textAlign:'center'
    },
    text2:{
        fontSize: 18,
        marginBottom: 20,
    },
    presu:{
        width:'80%',
        height: 50,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        padding: 10,
        textAlign:'center'
    },
    btnCrear:{
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 90,
        backgroundColor: '#393939',
    },
    textC:{
        textAlign:'center',
        color: 'white',
        fontSize: 18
    }
})