import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/Landing';
import SignupScreen from './src/screens/Signup';
import LoginScreen from './src/screens/Login';
import CategoriesScreen from './src/screens/Categories';
import ProductsScreen from './src/screens/Products';
import CheckoutScreen from './src/screens/Checkout';
import { Provider as AuthProvider } from './src/context/authContext';
import { setNavigator } from './src/navigationRef';

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: LoginScreen, 
  }),
  mainFlow: createBottomTabNavigator({
    categoryProductFlow: createStackNavigator({
      Categories: CategoriesScreen,
      Products: ProductsScreen,
    }),
    Index: IndexScreen,
    Checkout: CheckoutScreen,
  })
})

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App ref={navigator => setNavigator(navigator)} />
    </AuthProvider>
  );
};
