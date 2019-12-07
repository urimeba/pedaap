import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AsyncStorage } from 'react-native';
import MainNavigator from './src/navigation/MainNavigator';

//Pedaap v2
export default class App extends React.Component {
    componentDidMount = () => {
        this._initdata();
    }
    
    _initdata = async() =>{
      AsyncStorage.setItem("server", "http://192.168.100.9:8000/")
      AsyncStorage.getItem("server").then((obj)=>{
        this.state.server = obj
        this.forceUpdate();
      })
    }
    
    state = {server: AsyncStorage.getItem("server")}


    render() {
        return (
            <View style={styles.container}>
                <MainNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});