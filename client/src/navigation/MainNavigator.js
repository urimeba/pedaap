import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import UserTabs from './UserTabNavigator';
import AdminTabs from './AdminTabNavigator';

const MainNavigator = createSwitchNavigator({
    Login: {
        screen: LoginScreen
    },
    User: {
        screen: UserTabs
    },
    Admin: {
        screen: AdminTabs
    }
});

export default createAppContainer(MainNavigator);