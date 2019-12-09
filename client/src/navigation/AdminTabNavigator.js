import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AuxScreen from '../screens/adminScreens/AuxScreen';
import PromoStack from '../navigation/PromoStack'
import ProductStack from '../navigation/ProductStack';
import StoreStack from '../navigation/StoreStack';
import ProfileAdmin from '../screens/adminScreens/ProfileAdminScreen';

const AdminTabs = createBottomTabNavigator({
    Products: {
        screen: ProductStack,
        navigationOptions: {
                tabBarLabel: 'Productos',
                tabBarIcon: ({tintColor}) => (
                    <Icon name="bottle" size={24} color={tintColor} />
                ),
            },
    },
    Promos: {
        screen: PromoStack,
        navigationOptions: {
                tabBarLabel: 'Promociones',
                tabBarIcon: ({tintColor}) => (
                    <Icon name="sale" size={24} color={tintColor} />
                ),
            },
        },
    Stores: {
        screen: StoreStack,
        navigationOptions: {
                tabBarLabel: 'Establecimientos',
                tabBarIcon: ({tintColor}) => (
                    <Icon name="store" size={24} color={tintColor} />
                ),
        },
    },
    ProfileAd: {
        screen: ProfileAdmin,
        navigationOptions: {
                tabBarLabel: 'Perfil',
                tabBarIcon: ({tintColor}) => (
                    <Icon name="account" size={24} color={tintColor} />
                ),
            },
    },
},
    {
     initialRouteName: 'Promos',
        tabBarOptions: {
            showIcon: true,
            activeTintColor: '#DE4C63',
            inactiveTintColor: '#FAFAFA',
            style: {
                backgroundColor: '#1E1E1E',
            }
        },
    }
);

export default AdminTabs;