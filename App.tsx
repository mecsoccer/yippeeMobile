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
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import { Provider as AuthProvider } from './src/context/authContext';
import { Provider as LocationProvider } from './src/context/locationContext';
import { setNavigator } from './src/navigationRef';

const switchNavigator = createSwitchNavigator({
  Index: IndexScreen,
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
    TrackCreate: TrackCreateScreen,
  })
})

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <LocationProvider>
      <AuthProvider>
        <App ref={navigator => setNavigator(navigator)} />
      </AuthProvider>
    </LocationProvider>
  );
};
