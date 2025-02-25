
import Auth from "@/components/Auth";
import MainNavigations from "@/navigation/MainNavigations";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import Recevoir from "@/navigation/screens/MenuContent/Recevoir";
import Echanger from "@/navigation/screens/MenuContent/Echanger";
import Encaisser from "@/navigation/screens/MenuContent/Encaisser";
import Envoyer from "@/navigation/screens/MenuContent/Envoyer";
import Home from "@/navigation/screens/Home";
import History  from "@/navigation/screens/History";
import Invoice from "@/navigation/screens/Invoice";
import { Buffer } from "buffer";
global.Buffer = global.Buffer || Buffer;


const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown : true}}>
          <Stack.Screen name="Login" component={Auth} />
          <Stack.Screen name="Home" component={MainNavigations}  options={{headerShown : false}}/> 
          <Stack.Screen name="Recevoir" component={Recevoir} />
          <Stack.Screen name="Envoyer" component={Envoyer} />
          <Stack.Screen name="Echanger" component={Echanger} />
          <Stack.Screen name="Encaisser" component={Encaisser} />
        </Stack.Navigator>
    </ NavigationContainer>
  );
}
