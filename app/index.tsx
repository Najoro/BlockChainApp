import { Text, View } from "react-native";
import AuthScreen from "../components/Auth"
import MainNavigations from "../components/navigation/MainNavigations";
export default function Index() {
  return (
    <View style = {{flex : 1}}>
      <AuthScreen/>
      {/* <MainNavigations /> */}
    </View>
  );
}
