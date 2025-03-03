
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
import CreateWallet from "../navigation/screens/ConnectWallet/CreateWallet";
import ImportPrivateKey from "../navigation/screens/ConnectWallet/ImportPrivateKey";
import walletLogin  from "../navigation/screens/ConnectWallet/walletLogin";
import TokensList from "@/Web3/TokensList";
import { Buffer } from "buffer";
global.Buffer = global.Buffer || Buffer;


const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <>
        <Stack.Navigator initialRouteName="walletLogin" screenOptions={{headerShown : false}}>
          <Stack.Screen name="Login" component={Auth} />
          <Stack.Screen name="CreateWallet" component={CreateWallet} />
          <Stack.Screen name="ImportPrivateKey" component={ImportPrivateKey} />
          <Stack.Screen name="walletLogin" component={walletLogin} />
          <Stack.Screen name="Home" component={MainNavigations}  options={{headerShown : false}}/> 
          <Stack.Screen name="Recevoir" component={Recevoir}  />

          <Stack.Screen name="Envoyer" component={Envoyer} options={{headerShown: true,}}/>
          <Stack.Screen name="tokensList" component={TokensList} options={{headerShown: true, title : "Liste des tokens"}}/>


          <Stack.Screen name="Echanger" component={Echanger} />
          <Stack.Screen name="Encaisser" component={Encaisser} />
        </Stack.Navigator>
    </>
  );
}
