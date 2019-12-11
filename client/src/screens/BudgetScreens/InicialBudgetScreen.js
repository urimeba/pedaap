import React, {Component} from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default class Event extends Component{
    constructor(props){
        super(props);
        this.state={
            nameE:'',
            presu:'',
            presupuesto:'',
            nombrePres:'',
            error1:false

        }
    }

    //  servidor = await AsyncStorage.getItem("server")
        
    //     idUser = await AsyncStorage.getItem("userId");
    //     token = await AsyncStorage.getItem("userToken");



    goNext = () => {

        if(this.state.presupuesto=="" || this.state.nombrePres==""){
            this.setState({error1:true})
        }else{
             this.props.navigation.navigate('CategoriasS');
        }
    }


    

    render(){
        return(
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.caja1}>
                        <View style={styles.container}>
                            <Text style={styles.text1}>Ingresa el nombre de tu presupuesto</Text>
                        </View>
                        <View style={styles.container}>
                            <TextInput
                                style={styles.nombreE}
                                placeholder="Presupuesto"
                                placeholderTextColor = "#848482"
                                onChangeText={(nombrePres) => this.setState({ nombrePres })}
                            />
                        </View>
                    </View>
                    <View style={styles.titulo2}>
                        <View style={styles.container}>
                            <Text style={styles.text2}>Ingresa el presupuesto inicial</Text>
                        </View>
                        <View style={styles.container}>
                            <TextInput
                                style={styles.presu}
                                placeholder="$300"
                                placeholderTextColor = "#848482"
                                keyboardType = 'numeric'
                                onChangeText={(presupuesto) =>this.setState({presupuesto})}
                            />
                        </View>
                    </View>
                   {this.state.error1=== true &&(
                    <Text style={styles.warning}>Completa los campos</Text>
                )}
                    <View style={styles.titulo3}>
                        <View style={styles.container}>
                            <TouchableOpacity
                                style={styles.btnCrear}
                                onPress={this.goNext}
                            >
                                <Text style={styles.textC}>Crear</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.container}></View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
    },
    caja1:{
        flex: 3,
        justifyContent:'center',
        alignItems:'center',
        width: '100%'
    },
    titulo2:{
        flex: 2,
        justifyContent:'center',
        alignItems:'center',
        width: '100%'
    },
    titulo3: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    text1:{
        fontSize:25,
        textAlign:'center',
        width: '90%'
    },
    nombreE:{
        width:'80%',
        height: 60,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        padding: 10,
        fontSize: 18,
        textAlign:'center'
    },
    text2:{
        fontSize: 18,
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
        backgroundColor: '#393939',
        width: '30%',
        height: '30%'
    },
    textC:{
        textAlign:'center',
        color: 'white',
        fontSize: 18
    },
     warning: {
            color: '#FEDB6B',
            fontSize: 16,
            // marginLeft: 120,
        },
        error: {
            color: '#DE4C63',
            fontSize: 16,
            // marginLeft: 70,
        },
})