import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";

import Home from './screens/Home';
import History from './screens/History';
import Profile from './screens/Profile';

const homeName = "Home";
const historyName ="History";
const profileName ="Profile";

const Tab = createBottomTabNavigator();

export default function MainNavigations() {
  return (
        <Tab.Navigator 
          initialRouteName={homeName}
          screenOptions={optionScreen}
        >
          <Tab.Screen name={homeName} component={Home} />
          <Tab.Screen name={historyName} component={History} />
          <Tab.Screen name={profileName} component={Profile} />
        </Tab.Navigator>
  );
}


const optionScreen = ({ route }) => ({
  headerShown: false,
  tabBarIcon: ({ color, size }) => {
    let iconName;

    if (route.name === homeName) {
      iconName = 'home-outline';
    } else if (route.name === historyName) {
      iconName = 'time-outline';
    } else if (route.name === profileName) {
      iconName = 'person-outline';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarStyle: {

  },
})