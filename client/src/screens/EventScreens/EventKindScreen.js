import React, {Component} from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
// import axios from 'axios';

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedItem: null,
            datos: [
                {id: 1, text: 'opcion 1'},
                {id: 2, text: 'opcion 2'},
                {id: 3, text: 'opcion 3'},
                {id: 4, text: 'opcion 4'},
                {id: 5, text: 'opcion 5'},
            ]
        }
    }

    async _choosen(selectedItem) {
        await this.setState({ selectedItem });
        console.log(this.state.selectedItem);
    }
      
    _renderList = ({ item }) => {
        const isSelected = (this.state.selectedItem === item.id);
        const backgroundColor = isSelected ? "#000000" : "#ffffff";
        
        return (
            <TouchableOpacity
            onPress={() => this._choosen(item.id)}
            underlayColor={"#ffffff"}
            >
                <View style={{ padding: 10, flexDirection: 'row' }}>
                    <View style={{ backgroundColor, width: 5, height: 25 }}></View>
                    <Text style={{ marginLeft: 10, fontSize: 20 }}>{item.text}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    
    _goNext = () => {
        this.props.navigation.navigate('NumAsis');
    }


    render(){
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleWhite}>Selecciona el tipo de evento</Text>
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
                <View style={styles.next}>
                    <View style={{flex: 1}}></View>
                    <View style={styles.viewContinue}>
                        <TouchableOpacity 
                            style={styles.continue} 
                            onPress={this._goNext()}
                        >
                            <Text style={styles.white}>Continuar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
    }
});