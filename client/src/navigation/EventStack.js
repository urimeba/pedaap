import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import CreateEvent from '../screens/EventScreens/CreateEventScreen';
import EventKind from '../screens/EventScreens/EventKindScreen';
import Need from '../screens/EventScreens/NeedScreen';
import NumAsis from '../screens/EventScreens/NumAsisScreen';
import Product from '../screens/EventScreens/ProductScreen';
import MyEvents from '../screens/EventScreens/MyEvents';
import PromosEvent from '../screens/EventScreens/promosEvent';
import PromotionE from '../screens/userScreens/PromotionScreen';


const EventStack = createStackNavigator(
    {
        CreateEvent: {
            screen: CreateEvent,
            navigationOptions: {
                title: 'Crear evento',
                header: null
            }
        },
        EventK: {
            screen: EventKind,
        },
        NumAsis:{
            screen:NumAsis,
        },
        Need:{
            screen:Need,
        },
        Product:{
            screen: Product,
        },
        MyEvents:{
            screen: MyEvents,
        },
        PromosEvent:{
            screen: PromosEvent,
        },
        PromotionE:{
            screen: PromotionE,
        },
    },
    {
        initialRouteName: 'CreateEvent',
    }
);

export default EventStack;