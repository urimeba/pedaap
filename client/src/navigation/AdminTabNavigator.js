import { createBottomTabNavigator } from 'react-navigation-tabs';

import AuxScreen from '../screens/adminScreens/AuxScreen';

const AdminTabs = createBottomTabNavigator({
    Aux: {
        screen: AuxScreen,
        navigationOptions: {
            tabBarLabel: 'Aux',
        },
    },
});

export default AdminTabs;