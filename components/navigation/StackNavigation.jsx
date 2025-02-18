import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainNavigation from './MainNavigations';
import Auth from '../auth/Auth';

const Stack = createStackNavigator();

const StackNavigation = () => {
    console.log(MainNavigation)
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainNavigation} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
