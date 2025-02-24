import { Text, View } from "react-native";
import AuthScreen from "../components/Auth"
import MainNavigations from "@/navigation/MainNavigations";
import { Buffer } from "buffer";
global.Buffer = global.Buffer || Buffer;



export default function Index() {
  return (
    <View style={{flex:1}}>
      <MainNavigations />
    </View>
  );
}
