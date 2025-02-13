// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return <Stack screenOptions={{
//     headerShown : false,
//   }} />;
// }

import Auth from "@/components/Auth";
import MainNavigations from "@/components/navigation/MainNavigations";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';


// import { Stack } from "expo-router";



const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <>
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown : false}}>
          <Stack.Screen name="Login" component={Auth} />
          <Stack.Screen name="Home" component={MainNavigations} />
        </Stack.Navigator>
    </>
  );
}
