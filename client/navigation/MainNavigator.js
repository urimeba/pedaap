import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Login from '../screens/LoginScreen';

export default createAppContainer(createStackNavigator({
    Login: Login
}));