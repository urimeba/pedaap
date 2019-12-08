import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { AsyncStorage, Platform, NetInfo, Alert } from 'react-native';
import MainNavigator from './src/navigation/MainNavigator';

import Offline from './src/components/Offline';

//Pedaap v2
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            online: true,
        };
    }
    
    componentDidMount = () => {
        this._initdata();
        this.timer = setInterval(()=>this.CheckConnectivity(), 10000);
    }
    
    _initdata = async() =>{
        AsyncStorage.setItem("server", "http://192.168.100.9:8000/")
        AsyncStorage.getItem("server").then((obj)=>{
            this.state.server = obj
            this.forceUpdate();
        })
    }
    
    state = {server: AsyncStorage.getItem("server")}

    CheckConnectivity = async() => {
        // Android
        if (Platform.OS === "android") {
            NetInfo.isConnected.fetch().then(isConnected => {
                if (isConnected) {
                    // Alert.alert("You are online!");
                    this.setState({online: true});
                } else {
                    // Alert.alert("You are offline!");
                    this.setState({online: false});
                }
            });
        } else {
            // iOS
            NetInfo.isConnected.addEventListener(
                "connectionChange",
                this.handleFirstConnectivityChange
            );
        }
    };

    handleFirstConnectivityChange = isConnected => {
        NetInfo.isConnected.removeEventListener(
            "connectionChange",
            this.handleFirstConnectivityChange
        );

        if (isConnected === false) {
            // Alert.alert("You are offline!"); 
            this.setState({online: false});
        } else {
            // Alert.alert("You are online!");
            this.setState({online: true});
        }
    };


    render() {
        if(this.state.online){
            return (
                <View style={styles.container}>
                    <MainNavigator />
                </View>
            );
        }else{
            return(
                <View style={styles.container}>
                    <Offline />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});