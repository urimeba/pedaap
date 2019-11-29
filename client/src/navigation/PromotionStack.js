import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Promotions from '../screens/userScreens/PromoScreen';
import Promotion from '../screens/userScreens/PromotionScreen';

const PromotionStack = createStackNavigator(
    {
        //Promociones
        Promos: {
            screen: Promotions
        },
        //Promocion
        Promotion: {
            screen: Promotion,
        },
    },
    {
        initialRouteName: 'Promotions',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export default PromotionStack;