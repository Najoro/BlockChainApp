import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import History from '../screens/HistoryContent/History';
import Profile from '../screens/ProfileContent/Profile';
import MenuNavigation from './MenuNavigation';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={optionScreen}>
      <Tab.Screen name="Home" component={MenuNavigation} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const optionScreen = ({ route }) => ({
  headerShown: false,
  tabBarIcon: ({ color, size }) => {
    let iconName;
    if (route.name === "Home") iconName = "home-outline";
    if (route.name === "History") iconName = "time-outline";
    if (route.name === "Profile") iconName = "person-outline";
    return <Ionicons name={iconName} size={size} color={color} />;
  },
});

export default MainNavigation;
