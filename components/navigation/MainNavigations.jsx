import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import History from './screens/History';
import Profile from './screens/Profile';
import MenuNavigation from './MenuNavigation';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 🔹 Tab Navigator principal
const HomeName = "Home";
const HistoryName = "history";
const ProfileName = "Profile";
export default function MainNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={HomeName}
      screenOptions={optionScreen}
    >
      <Tab.Screen name={HomeName} component={MenuNavigation} />
      <Tab.Screen name={HistoryName} component={History} />
      <Tab.Screen name={ProfileName} component={Profile} />
    </Tab.Navigator>
  );
}

const optionScreen = ({ route }) => ({
  headerShown: false,
  tabBarIcon: ({ color, size }) => {
    let iconName;

    if (route.name === HomeName) {
      iconName = 'home-outline';
    } else if (route.name === HistoryName) {
      iconName = 'time-outline';
    } else if (route.name === ProfileName) {
      iconName = 'person-outline';
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarStyle: {

  },
})