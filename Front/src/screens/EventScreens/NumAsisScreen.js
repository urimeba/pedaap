import React, { Component } from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import axios from 'axios';

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedItem: null,
            datos: [
                {id: '10', text: 'Hasta 10 personas', 'icono': 'dice-1'},
                {id: '30', text: 'Hasta 30 personas', 'icono': 'dice-2'},
                {id: '50', text: 'Hasta 50 personas', 'icono': 'dice-3'},
                {id: '100', text: 'Más de 50 personas', 'icono': 'dice-4'},
            ]
        }
    }

    async _choosen(selectedItem) {
        await this.setState({ selectedItem: selectedItem });
        // console.log(this.state.selectedItem);
        this._continuar();
    }
      
    _renderList = ({ item }) => {        
        return (
            <View style={styles.dataBox}>
                <View style={styles.topBox}>
                    <TouchableOpacity
                        onPress={() => this._choosen(item.id)}
                        style={styles.circle}          
                    >
                        <Icon name={item.icono} size={50} color={'#707070'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomBox}>
                    <Text style={styles.bottomBoxText}>{item.text}</Text>
                </View>
            </View>
        );
    }
    
    _continuar = () => {
        let x = this.props.navigation;
        // console.log(JSON.stringify(x.getParam('nombre', 'Error nombre')).replace(/"/g,''));
        // console.log(JSON.stringify(x.getParam('presupuesto', 'Error presupuesto')).replace(/"/g,''));
        // console.log(JSON.stringify(x.getParam('tipo', 'Error presupuesto')).replace(/"/g,''));
        
        this.props.navigation.navigate('Need', {
            nombre: JSON.stringify(x.getParam('nombre', 'Error nombre')).replace(/"/g,''),
            presupuesto: JSON.stringify(x.getParam('presupuesto', 'Error presupuesto')).replace(/"/g,''),
            tipo: JSON.stringify(x.getParam('tipo', 'Error presupuesto')).replace(/"/g,''),
            numAsis: this.state.selectedItem,
        });
    }

    render(){
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleWhite}>Selecciona el numero de personas</Text>
                </View>
                <View style={styles.flatContainer}>
                    <FlatList 
                        style={styles.flat} 
                        data={this.state.datos}
                        renderItem={this._renderList}
                        keyExtractor={item => item.id.toString()}
                        numColumns={3}
                    />
                </View>
                {/* <View style={styles.next}>
                    <View style={{flex: 1}}></View>
                    <View style={styles.viewContinue}>
                        <TouchableOpacity 
                            style={styles.continue} 
                            onPress={this._goNext}
                        >
                            <Text style={styles.white}>Continuar</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#1E1E1E',
        padding:20
    },
    title:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign:'center'
    },
    flatContainer:{
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flat:{
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    next:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    viewContinue:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    continue:{
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%',
        width: '70%',
        backgroundColor: '#393939',
    },
    titleWhite:{
        color: '#FFFFFF',
        fontSize: 26,
        textAlign:'center'
    },
    white:{
        color: '#FFFFFF',
        fontSize: 18
    },
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
        backgroundColor: '#393939',
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
        fontSize: 14,
        textAlign: 'center',
        width: '90%'
    },
});