import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import CreateEvent from '../screens/EventScreens/CreateEventScreen';
import EventKind from '../screens/EventScreens/EventKindScreen';
import Need from '../screens/EventScreens/NeedScreen';
import NumAsis from '../screens/EventScreens/NumAsisScreen';
import Product from '../screens/EventScreens/ProductScreen';
import MyEvents from '../screens/EventScreens/MyEvents';
import PromosEvent from '../screens/EventScreens/promosEvent';
import { NavigationEvents } from 'react-navigation';


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
            navigationOptions: {
                headerMode: 'none',  // doesn't work
                header: null, // only this works
              }
        },
        MyEvents:{
            screen: MyEvents,
        },
        PromosEvent:{
            screen: PromosEvent,
        },
    },
    {
        initialRouteName: 'CreateEvent',
    }
);

export default EventStack;