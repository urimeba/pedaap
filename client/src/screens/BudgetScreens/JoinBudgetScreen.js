import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput,TouchableOpacity } from 'react-native';

export default class Join extends Component{
    constructor(props){
        super(props);
        this.state={
            codigo: '',
            error1: false,//no existe el codigo
            error2: false,//campo vacio
            succes: false,// se encontro el codigo
        };
    }

    _unirme = async() => {
        if(this.state.codigo === ''){
            this.setState({error2:true});
            this.setState({error1:false});
            this.setState({succes:false});
        }else {
            this.setState({error1:false})
            this.setState({error2:false})
            // this.props.navigation.navigate('AportBudget',)
            url = await AsyncStorage.getItem("server");
            token = await AsyncStorage.getItem("userToken");
            // console.log(id, url);

            axios({
                method: 'POST',
                url: url+"compartidos/getPresupuesto/",
                data: {id:id},
                headers: {
                    "content-type":"application/json",
                    "Authorization":"Token "+ token
                }, 
            }).then( res => {
                console.log(res.data);
                data = JSON.parse(res.data.datos);
                this.setState({
                    datos: data,
                });
            }).catch(err => {
                console.log(err)
            });
        }
    }

    ontext = (codigo) => {
        this.setState({codigo: codigo})
    }


    render(){
        return(
             <View style={styles.todo}>
                <View style={styles.titulo1}>
                    <Text style={styles.text1}>Ingresa el codigo del evento</Text>
                    <TextInput
                        style={styles.nombreE}
                        placeholder="Codigo"
                        placeholderTextColor = "#848482"
                        onChangeText={this.ontext}
                        value={this.state.codigo}
                    />
                </View>
                {this.state.error1=== true &&(
                    <Text style={styles.error}>No existe ese código de presupuesto</Text>
                )}
                {this.state.error2=== true &&(
                     <Text style={styles.warning}>Completa el campo</Text>
                )}
                <TouchableOpacity
                     style={styles.btnCrear}
                     onPress={this._unirme}
                >
                    <Text style={styles.textC}>Unirme</Text>
                </TouchableOpacity>
            </View>
        )
    }    
}

const styles = StyleSheet.create({
    todo:{
        flex:1,
        // justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
    },
    titulo1:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        width: '100%',
        height: '35%',
        marginTop:150,
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
        fontSize:26,
        textAlign:'center',
        // fontStyle:'bold',
        marginBottom:40,
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
    btnCrear:{
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        width: 100,
        marginTop: 20,
        backgroundColor: '#393939',
    },
    textC:{
        textAlign:'center',
        color: 'white',
        fontSize: 18
    }, warning:{
        color:'#FEDB6B',
        fontSize: 16,
        // marginLeft: 120,
    },
    error:{
        color:'#DE4C63',
        fontSize: 16,
        // marginLeft: 70,
    },
})