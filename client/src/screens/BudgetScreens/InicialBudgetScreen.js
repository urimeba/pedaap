import React, {Component} from 'react';
import { SafeAreaView, View,Alert, FlatList, StyleSheet, Text, Image, TextInput,TouchableOpacity, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            presupuesto:0,
        }
    }

    _back=()=>{
        // Alert.alert('back')
        this.props.navigation.goBack()
    }
    _next=()=>{
        // Alert.alert('back')
        this.props.navigation.navigate('ShareBudget',{presupuesto: this.state.presupuesto})
    }

    render(){
        return(
            <View style={styles.todo}>
                <View style={styles.container}>
                    <View style={styles.arriba}>
                        <View style={styles.textoP}>
                            <TouchableOpacity onPress={this._back} >
                                <Icon name="arrow-left" size={25} color={'#707070'} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.presup}>
                    <Text style={styles.tituloPres}>Ingresa el presupuesto inicial</Text>
                    <TextInput 
                        style={styles.TInput}
                        placeholder="$200"
                        keyboardType = 'numeric'
                        placeholderTextColor="#848482"
                        onChangeText={(presupuesto) => this.setState({ presupuesto })}
                    />
                </View>
                <View style={styles.abajoNegro}>
                    <Text style={styles.tituloNegro}>¿Que vas a necesitar?</Text>
                    <View>
                        <Text>Circulos</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.InputsNavEnter}
                        onPress={this._next}>
                        <Text style={[styles.TextColorOne, styles.TextButton]}>Crear</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    todo:{
        flex: 1,
    },
    arriba:{
        // flex:1,
        marginTop: 25,
        width:'100%',
        height: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        // backgroundColor: '#FAFAFA',
        // backgroundColor:'yellow',
    },
    container: {
        // flex: 4,
        alignItems: 'center',
        flexDirection:'column',
        justifyContent: 'center',
        backgroundColor:'#FAFAFA',
        marginTop: '8%',
        height: '5%',
        width:'100%',
    },
    botones:{
        // flex:1,
        flexDirection:'row',
        alignContent: 'center',
        // justifyContent: 'center',
        width: '100%',
        height:'40%',
        padding: 5,
        // backgroundColor:'red'
    },
    tituloP:{
        fontSize: 20
    },
     textoP:{
        flexDirection:'row',
        alignItems:'center',
        // justifyContent:'center',
        width: '100%',
        height:'100%',
        marginTop: 6

        // backgroundColor:'blue'
    },
    InputsNavEnter: {
       borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        height:40,
        width: 90,
        backgroundColor: '#393939',
        marginTop: 30
    },
    TextColorOne: {
        fontSize: 18,
        color: '#848482',
    },
    TextButton: {
        fontSize: 18,
        color: '#FAFAFA',
    },
    TInput: {
       width:'100%',
        height: 70,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        padding: 10,
        fontSize: 18,
        textAlign:'center',
        marginTop: 30
    },
    presup:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        width: '100%',
        height: '40%',
        paddingRight: 40,
        paddingLeft: 40,
    },
    tituloPres:{
        textAlign:'center',
        fontSize: 25,
    },
    abajoNegro:{
        alignContent:'center',
        alignItems:'center',
        // justifyContent:'center',
        width: '100%',
        height:'50%',
        marginTop: 20,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        backgroundColor: '#1E1E1E',
        padding:20
    },
    tituloNegro:{
        textAlign:'center',
        color:'white',
        fontSize:20
    }
})