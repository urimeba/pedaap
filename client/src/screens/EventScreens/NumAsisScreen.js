import React, {Component} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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


    render(){
        return(
            <View>
                <FlatList
                    data={this.state.datos}
                    renderItem={this._renderList}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        )
    }
    
}