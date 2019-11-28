import { createAppContainer, createSwitchNavigator } from 'react-navigation';

//screens
import LoginScreen from '../screens/LoginScreen';
import ConfirmScreen from '../screens/Confirm';
import SignupScreen from '../screens/SignupScreen';
import ForgotScreen from '../screens/ForgotScreen';
import UserTabs from './UserTabNavigator';
import AdminTabs from './AdminTabNavigator';
import PromotionScreen from '../screens/userScreens/PromotionScreen';

export default createAppContainer(createSwitchNavigator({
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
    Promotion: {
        screen:PromotionScreen
    },
}));