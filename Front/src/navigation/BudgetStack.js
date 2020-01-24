import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import AportBudget from '../screens/BudgetScreens/AportBudgetScreen';
import CombosScreen from '../screens/BudgetScreens/ComboScreen';
import CreateBudget from '../screens/BudgetScreens/CreateBudgetScreen';
import InicialBudget from '../screens/BudgetScreens/InicialBudgetScreen';
import JoinBudget from '../screens/BudgetScreens/JoinBudgetScreen';
import ShareBudget from '../screens/BudgetScreens/ShareBudgetScreen';
import CategoriasS from '../screens/BudgetScreens/CategoScreen';
import MyBudgets from '../screens/BudgetScreens/MyBudgets';
import PromotionB from '../screens/userScreens/PromotionScreen';

const BudgetStack = createStackNavigator(
    {
        AportBudget: {
            screen: AportBudget
        },
        ComboBudget: {
            screen: CombosScreen,
        },
        CreateBudget:{
            screen:CreateBudget,
            navigationOptions: {
                title: 'Crear presupuesto',
                header: null
            }
        },
        InicialBudget:{
            screen:InicialBudget,
        },
        JoinBudget:{
            screen: JoinBudget,
        },
        ShareBudget:{
            screen: ShareBudget,
        },
        CategoriasS:{
            screen:CategoriasS
        },
        MyBudgets:{
            screen:MyBudgets
        },
        PromotionB:{
            screen:PromotionB
        }
    },
    {
        initialRouteName: 'CreateBudget',
        headerMode: 'float',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export default BudgetStack;