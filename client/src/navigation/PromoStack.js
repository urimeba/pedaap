import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import AddPromo from '../screens/adminScreens/AddPromoScreen';
import NewPromos from '../screens/adminScreens/NewPromosScreen';
import Acepted from '../screens/adminScreens/AceptedPromoScreen';
import ViewPromo from '../screens/adminScreens/ViewPromo';

const PromoStack = createStackNavigator(
    {
        NewPromos: {
            screen: NewPromos
        },
        AddPromo: {
            screen: AddPromo,
        },
        Acepted:{
            screen: Acepted,
        },
        ViewPromo:{
            screen: ViewPromo,
        }
       
    },
    {
        initialRouteName: 'NewPromos',
        headerMode: 'screen',
        headerStyle: { backgroundColor: 'red' },
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export default PromoStack;