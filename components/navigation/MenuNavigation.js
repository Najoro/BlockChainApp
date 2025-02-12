import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Recevoir from "../navigation/screens/MenuContent/Recevoir";
import Envoyer from "../navigation/screens/MenuContent/Envoyer";
import Echanger from "../navigation/screens/MenuContent/Echanger";
import Encaisser from "../navigation/screens/MenuContent/Encaisser";

const Stack = createStackNavigator();

export default function MenuNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Recevoir" component={Recevoir} />
      <Stack.Screen name="Envoyer" component={Envoyer} />
      <Stack.Screen name="Échanger" component={Echanger} />
      <Stack.Screen name="Encaisser" component={Encaisser} />
    </Stack.Navigator>
  );
}
