import React, {Component} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image, TextInput,TouchableOpacity, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    _create=()=>{
        this.props.navigation.navigate('InicialBudget')
    }

    _join=()=>{
        this.props.navigation.navigate('JoinBudget')
    }

    render(){
        return(
            <View style={styles.todo}>
                <View style={styles.titulo}>
                    <Text style={styles.textTitulo}>Selecciona una opción</Text>
                </View>
                <View style={styles.botones}>
                    <TouchableOpacity
                        onPress={this._create}
                        style={styles.btnCreate}
                    
                    >
                        <Text style={styles.btnText}>Crear presupuesto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this._join}
                        style={styles.btnJoin}
                    >
                        <Text style={styles.btnText}>Unirse a un presupuesto</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.abajo}>
                    <TouchableOpacity
                        style={styles.btnMy}
                        onPress={()=>{this.props.navigation.navigate("MyBudget")}}
                    >
                        <Text style={{fontSize: 15, color:'white'}}>Ver mis presupuestos</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    todo:{
        flex:1
    },
    titulo:{
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        height:'10%',
        width:'100%',
        paddingLeft: 40,
        paddingRight: 40,
        marginTop: 60

    },
    textTitulo:{
        alignSelf:'center',
        textAlign:'center',
        fontSize: 25
    },
    botones:{
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
        height: '60%',
        width:'100%',
        paddingLeft:40,
        paddingRight:40

    },
    btnCreate:{
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        width: '100%',
        height: '30%',
        borderRadius: 20,
        backgroundColor: '#6930BF',
    },
    btnJoin:{
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        width: '100%',
        height: '30%',
        borderRadius: 20,
        marginTop: 70,
        backgroundColor: '#71C0F2',
    },
    btnText:{
        textAlign:'center',
        fontSize: 20,
        color:'white'
    },
    abajo:{
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        width:'100%',
        height: 50,
        marginTop:20,
        // backgroundColor:'magenta'
    },
    btnMy:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        width: 180,
        height:30,
        borderRadius:10,
        backgroundColor: '#FEDB6B'

    }
})