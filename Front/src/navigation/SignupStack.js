import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import PreferencesScreen from '../screens/RegisterStackScreens/PreferencesScreen';
import StoresScreen from '../screens/RegisterStackScreens/StoreScreen';

const RegisterStack = createStackNavigator(
    {
        //Gustos
        Preferences: {
            screen: PreferencesScreen
        },
        //Establecimientos
        Stores: {
            screen: StoresScreen,
        },
    },
    {
        initialRouteName: 'Preferences',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export default RegisterStack;