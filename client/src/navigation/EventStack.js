import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import CreateEvent from '../screens/EventScreens/CreateEventScreen';
import EventKind from '../screens/EventScreens/EventKindScreen';
// import EventK from '../screens/EventScreens/EventKindScreen';
import Need from '../screens/EventScreens/NeedScreen';
import NumAsis from '../screens/EventScreens/NumAsisScreen';
import Product from '../screens/EventScreens/ProductScreen';

const EventStack = createStackNavigator(
    {
        CreateEvent: {
            screen: CreateEvent
        },
        EventK: {
            screen: EventKind,
        },
        Need:{
            screen:Need,
        },
        NumAsis:{
            screen:NumAsis,
        },
        Product:{
            screen: Product,
        },
    },
    {
        initialRouteName: 'CreateEvent',
        headerMode: 'float',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export default EventStack;