import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Recevoir from '../screens/MenuContent/Recevoir';
import Envoyer from '../screens/MenuContent/Envoyer';
import Echanger from '../screens/MenuContent/Echanger';
import Encaisser from '../screens/MenuContent/Encaisser';
import Home from '../screens/HomeContent/Home';

const Stack = createStackNavigator();

export default function MenuNavigation() {
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
