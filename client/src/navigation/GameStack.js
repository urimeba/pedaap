import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import CreateGame from '../screens/GameScreens/CreateGameScreen';
import GameRoom from '../screens/GameScreens/GameRoomScreen';
import Game from '../screens/GameScreens/GameScreen';
import JoinGame from '../screens/GameScreens/JoinGame';

const GameStack = createStackNavigator(
    {
        CreateGame: {
            screen: CreateGame
        },
        GameRoom: {
            screen: GameRoom,
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
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export default GameStack;