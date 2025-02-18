import { Text, View } from "react-native";
import AuthScreen from "../components/Auth"
import MainNavigations from "@/navigation/MainNavigations";
export default function Index() {
  return (
    <View style={{flex:1}}>
      <MainNavigations />
    </View>
  );
}
