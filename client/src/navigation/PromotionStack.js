import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Promotions from '../screens/userScreens/PromoScreen';
import Promotion from '../screens/userScreens/PromotionScreen';
import NewPromo from '../screens/PromoScreens/NewPromo'

const PromotionStack = createStackNavigator(
    {
        //Promociones
        Promos: {
            screen: Promotions,
            navigationOptions: {
                title: 'Promociones',
                header: null
            }
        },
        //Promocion
        Promotion: {
            screen: Promotion,
        },
        New:{
            screen:NewPromo,
        }
    },
    {
        initialRouteName: 'Promos',
    }
);

export default PromotionStack;