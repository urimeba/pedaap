import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import CreateGame from '../screens/GameScreens/CreateGameScreen';
import GameRoom from '../screens/GameScreens/GameRoomScreen';
import GameRoomJ from '../screens/GameScreens/GameRoomJScreen';
import Game from '../screens/GameScreens/GameScreen';
import JoinGame from '../screens/GameScreens/JoinGame';

const GameStack = createStackNavigator(
    {
        CreateGame: {
            screen: CreateGame,
            navigationOptions: {
                title: 'Crear sala',
                header: null
            }
        },
        GameRoom: {
            screen: GameRoom,
        },
        GameRoom2: {
            screen: GameRoomJ,
        },
        Game:{
            screen:Game,
        },
        JoinGame:{
            screen:JoinGame,
        },
    },
    {
        initialRouteName: 'CreateGame',
        headerMode: 'float',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export default GameStack;