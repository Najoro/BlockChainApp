import { Text, View } from "react-native";
import AuthScreen from "../components/Auth"
import { NavigationContainer } from '@react-navigation/native';
import MainNavigations from "../components/navigation/MainNavigations";
export default function Index() {
  return (
    <View style={{flex:1}}>
      <MainNavigations />
    </View>
  );
}
