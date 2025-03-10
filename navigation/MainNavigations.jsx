import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens Import
import Invoice from "./screens/Invoice";
import Home from './screens/Home';
import History from './screens/History';
import Profile from './screens/Profile';
import SecurePayment from './screens/SecurePayment';

//  Création du Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Configuration des onglets : nom + icône
const TABS_CONFIG = [
  { name: "Home", component: Home, icon: "home-outline" },
  { name: "History", component: History, icon: "time-outline" },
  { name: "Facture", component: Invoice, icon: "receipt-outline" },
  { name: "Payement Securiser", component: SecurePayment, icon: "document-lock-outline" },
  { name: "Profile", component: Profile, icon: "person-outline" },
  
];

// Fonction de configuration des icônes
const getScreenOptions = ({ route }) => ({
  headerShown: false,
  tabBarIcon: ({ color, size }) => {
    const tab = TABS_CONFIG.find(tab => tab.name === route.name);
    return tab ? <Ionicons name={tab.icon} size={size} color={color} /> : null;
  },
});

// Navigation principale
export default function MainNavigation() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={getScreenOptions}>
      {TABS_CONFIG.map(({ name, component }) => (
        <Tab.Screen key={name} name={name} component={component} />
      ))}
    </Tab.Navigator>
  );
}
