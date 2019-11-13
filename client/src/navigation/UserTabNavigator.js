import { createBottomTabNavigator } from 'react-navigation-tabs';

import BudgetScreen from '../screens/userScreens/BudgetScreen';
import EventScreen from '../screens/userScreens/EventScreen';
import PromoScreen from '../screens/userScreens/EventScreen';
import GameScreen from '../screens/userScreens/GameSceen';
import PromoScreen from '../screens/userScreens/ProfileScreen';

const UserTabs = createBottomTabNavigator({
    Budget: {
        screen: BudgetScreen,
        navigationOptions: {
            tabBarLabel: 'Presupuesto',
        },
    },
    Event: {
        screen: EventScreen,
        navigationOptions: {
            tabBarLabel: 'Evento',
        },
    },
    Promo: {
        screen: PromoScreen,
        navigationOptions: {
            tabBarLabel: 'Promociones',
        },
    },
    Game: {
        screen: GameScreen,
        navigationOptions: {
            tabBarLabel: 'Juego',
        },
    },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            tabBarLabel: 'Perfil',
        },
    },
});

export default UserTabs;