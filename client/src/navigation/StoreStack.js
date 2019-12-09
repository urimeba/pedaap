import React from 'react';
import {
    createStackNavigator
} from 'react-navigation-stack';

import ViewStore from '../screens/adminScreens/ViewStore';
import StoreScreen from '../screens/adminScreens/StoreScreen'
import NewStore from '../screens/adminScreens/NewStore'

const StoreStack = createStackNavigator({
    Stores: {
        screen: StoreScreen
    },
    ViewStore: {
        screen: ViewStore,
    },
    NewStore: {
        screen: NewStore,
    },

}, {
    initialRouteName: 'Stores',
    headerMode: 'screen',
    headerStyle: {
        backgroundColor: 'red'
    },
    navigationOptions: {
        headerVisible: false,
    }
});

export default StoreStack;