import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Prefer from '../screens/ProfileScreens/PreferScreen';
import PreferStore from '../screens/ProfileScreens/PreferStoreScreen';
import Profile from '../screens/ProfileScreens/ProfileScreen';

const ProfileStack = createStackNavigator(
    {
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil',
                header: null
            }
        },
        Prefer: {
            screen: Prefer,
        },
        PreferStore:{
            screen: PreferStore,
        }
       
    },
    {
        initialRouteName: 'Profile',
        headerMode: 'screen',
        headerStyle: { backgroundColor: 'red' },
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export default ProfileStack;