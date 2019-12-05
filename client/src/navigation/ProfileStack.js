import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Prefer from '../screens/ProfileScreens/PreferScreen';
import Profile from '../screens/ProfileScreens/ProfileScreen';

const ProfileStack = createStackNavigator(
    {
        Profile: {
            screen: Profile
        },
        Prefer: {
            screen: Prefer,
        },
       
    },
    {
        initialRouteName: 'Profile',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export default ProfileStack;