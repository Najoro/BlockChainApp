import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import Recevoir from './screens/MenuContent/Recevoir';
import Envoyer from './screens/MenuContent/Envoyer';
import Echanger from './screens/MenuContent/Echanger';
import Encaisser from './screens/MenuContent/Encaisser';
import Home from './screens/Home';
import History from './screens/History';
import Profile from './screens/Profile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 🔹 Stack Navigator pour Home et ses écrans secondaires
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="Recevoir" component={Recevoir} />
      <Stack.Screen name="Envoyer" component={Envoyer} />
      <Stack.Screen name="Échanger" component={Echanger} />
      <Stack.Screen name="Encaisser" component={Encaisser} />
    </Stack.Navigator>
  );
}

// 🔹 Tab Navigator principal
export default function MainNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "History") {
            iconName = "time-outline";
          } else if (route.name === "Profile") {
            iconName = "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Profile" component={Profile} />
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