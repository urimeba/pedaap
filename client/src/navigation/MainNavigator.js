import { createAppContainer, createSwitchNavigator } from 'react-navigation';

//screens
import LoginScreen from '../screens/LoginScreen';
import ConfirmScreen from '../screens/Confirm';
import SignupScreen from '../screens/SignupScreen';
import ForgotScreen from '../screens/ForgotScreen';
import UserTabs from './UserTabNavigator';
import AdminTabs from './AdminTabNavigator';
import SignupStack from './SignupStack';

export default createAppContainer(createSwitchNavigator({
    SignupPref: {
        screen: SignupStack
    },
    Login: {
        screen: LoginScreen
    },
    Signup:{
        screen: SignupScreen
    },
    Forgot:{
        screen: ForgotScreen
    },
    User: {
        screen: UserTabs
    },
    Admin: {
        screen: AdminTabs
    },
    Confirm: {
        screen: ConfirmScreen
    },
}));