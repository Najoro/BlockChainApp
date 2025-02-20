import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TabsView from "@/components/functions/TabsView";
import MyWallet from "./HomeContent/MyWallet";
import EmptyWallet from "./HomeContent/EmptyWallet";
import SellCrypto from "./HomeContent/SellCrypto";
import BuyCrypto from "./HomeContent/BuyCrypto";
import ConnectWallet from "../../web3/ConnectWallet"

// Configuration des icônes du menu
const MENU_ITEMS = [
  { id: "1", iconLibrary: Feather, iconName: "arrow-down-left", label: "Recevoir", screen: "Recevoir" },
  { id: "2", iconLibrary: Feather, iconName: "arrow-up-right", label: "Envoyer", screen: "Envoyer" },
  { id: "3", iconLibrary: Feather, iconName: "refresh-cw", label: "Échanger", screen: "Echanger" },
  { id: "4", iconLibrary: FontAwesome, iconName: "money", label: "Encaisser", screen: "Encaisser" },
];

// Composant réutilisable pour une icône de menu
const MenuIcon = ({ iconLibrary: IconLibrary, iconName, label, screen }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(screen)} style={styles.menuItem}>
      <View style={styles.icone}>
        <IconLibrary name={iconName} size={30} color="white" />
      </View>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

// Composant principal Home
const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={[styles.headerSection, styles.soldContent]}>
        <View style={styles.header}>
          <Text style={styles.soldeText}>$27,852</Text>
        </View>        
          <FlatList
            data={MENU_ITEMS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MenuIcon {...item} />}
            horizontal
            contentContainerStyle={styles.menu}
            showsHorizontalScrollIndicator={false}
          />
      </View>
      <View style={[styles.content, styles.walletContent]}>
        <ConnectWallet />
      </View>

      <View style={[styles.content, styles.walletContent]}>
        <TabsView
          routes={[
            { key: "first", title: "Mon Portefeuille" },
            { key: "second", title: "Portefeuilles vides" },
          ]}
          sceneMap={{
            first: MyWallet,
            second: EmptyWallet,
          }}
        />
      </View>

      {/* 🔹 Tabs : Achat/Vente Crypto */}
      <View style={[styles.content, styles.walletContent]}>
        <TabsView
          routes={[
            { key: "first", title: "Acheter des cryptos" },
            { key: "second", title: "Vendre des cryptos" },
          ]}
          sceneMap={{
            first: BuyCrypto,
            second: SellCrypto,
          }}
        />
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    height: "35%",
    alignItems : "center",
    justifyContent : "center",
  },
  soldContent: {
    backgroundColor: "#0000FF",
    justifyContent: "space-around",
    paddingTop: 40,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  soldeText: {
    fontSize: 50,
    fontWeight : "600",
    color: "#fff",
  },
  menu: {
    marginTop: -25,
    paddingHorizontal: 10,
  },
  text: {
    color: "white",
    fontSize: 15,
    marginTop: 5,
    textAlign: "center",
  },
  menuItem: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  icone: {
    backgroundColor: "#578FCA",
    width: 65,
    height: 65,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    minHeight: 300,
  },
  walletContent: {
    backgroundColor: "#fff",
    marginTop: 5,
  },
});

export default Home;
