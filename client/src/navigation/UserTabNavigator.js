import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import BudgetScreen from '../screens/userScreens/BudgetScreen';
import EventScreen from '../screens/userScreens/EventScreen';
import PromoScreen from '../screens/userScreens/PromoScreen';
import GameScreen from '../screens/userScreens/GameSceen';
import ProfileScreen from '../screens/userScreens/ProfileScreen';

import PromotionStack from '../navigation/PromotionStack';
import EventStack from '../navigation/EventStack';
import GameStack from '../navigation/GameStack';
import BudgetStack from '../navigation/BudgetStack';
import ProfileStack from '../navigation/ProfileStack';

const UserTabs = createBottomTabNavigator(
    {
        Budget: {
            screen: BudgetStack,
            navigationOptions: {
                tabBarLabel: 'Presupuesto',
                tabBarIcon: ({tintColor}) => (
                    <Icon name="shopify" size={24} color={tintColor} />
                ),
            },
        },
        Event: {
            screen: EventStack,
            navigationOptions: {
                tabBarLabel: 'Evento',
                tabBarIcon: ({tintColor}) => (
                    <Icon name="account-group" size={24} color={tintColor} />
                ),
            },
        },
        Promo: {
            screen: PromotionStack,
            navigationOptions: {
                tabBarLabel: 'Promociones',
                tabBarIcon: ({tintColor}) => (
                    <Icon name="sale" size={24} color={tintColor} />
                ),
            },
        },
        Game: {
            screen: GameStack,
            navigationOptions: {
                tabBarLabel: 'Juego',
                tabBarIcon: ({tintColor}) => (
                    <Icon name="gamepad-variant" size={24} color={tintColor} />
                ),
            },
        },
        Profile: {
            screen: ProfileStack,
            navigationOptions: {
                tabBarLabel: 'Perfil',
                tabBarIcon: ({tintColor}) => (
                    <Icon name="account" size={24} color={tintColor} />
                ),
            },
        },
    },
    {
        initialRouteName: 'Promo',
        tabBarOptions: {
            showIcon: true,
            activeTintColor: '#DE4C63',
            inactiveTintColor: '#FAFAFA',
            style: {
                backgroundColor: '#1E1E1E',
            }
        },
    },
    
);

export default UserTabs;