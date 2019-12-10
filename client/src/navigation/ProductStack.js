import React from 'react';
import {
    createStackNavigator
} from 'react-navigation-stack';

import Products from '../screens/adminScreens/ProductScreen';
import ViewProduct from '../screens/adminScreens/ViewProduct';
import NewProduct from '../screens/adminScreens/NewProduct';

const ProductStack = createStackNavigator({
    ViewProduct: {
        screen: ViewProduct
    },
    Products: {
        screen: Products,
    },
    NewProduct: {
        screen: NewProduct,
    }

}, {
    initialRouteName: 'Products',
    headerMode: 'screen',
    headerStyle: {
        backgroundColor: 'red'
    },
    navigationOptions: {
        headerVisible: false,
    }
});

export default ProductStack;