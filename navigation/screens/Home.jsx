import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, ScrollView, StyleSheet, FlatList } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { Feather, FontAwesome } from "@expo/vector-icons";
import TabsView from "@/components/functions/TabsView";
import MyWallet from "./HomeContent/MyWallet";
import EmptyWallet from "./HomeContent/EmptyWallet";
import SellCrypto from "./HomeContent/SellCrypto";
import BuyCrypto from "./HomeContent/BuyCrypto";
import ConnectWallet from "../../Web3/ConnectWallet";

// Configuration des icônes du menu
const MENU_ITEMS = [
  { id: "1", iconLibrary: Feather, iconName: "arrow-down-left", label: "Recevoir", screen: "Recevoir" },
  { id: "2", iconLibrary: Feather, iconName: "arrow-up-right", label: "Envoyer", screen: "tokensList" },
  { id: "3", iconLibrary: Feather, iconName: "refresh-cw", label: "Échanger", screen: "Echanger" },
  { id: "4", iconLibrary: FontAwesome, iconName: "money", label: "Encaisser", screen: "Encaisser" },
];

// Composant réutilisable pour une icône de menu
const MenuIcon = ({ iconLibrary: IconLibrary, iconName, label, screen }) => {
  const navigation = useNavigation();
  return (
    <Button
      mode="contained"
      icon={({ size, color }) => <IconLibrary name={iconName} size={size} color={color} />}
      onPress={() => navigation.navigate(screen)}
      style={styles.menuButton}
      labelStyle={styles.menuLabel}
    >
      {label}
    </Button>
  );
};

// Composant principal Home
const Home = () => {
  return (
    <ScrollView style={styles.container}>
      {/* 🔹 Solde total */}
      <Card style={styles.balanceCard}>
        <Card.Content style={styles.balanceContent}>
          <Text style={styles.balanceText}>$27,852</Text>
          <FlatList
            data={MENU_ITEMS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MenuIcon {...item} />}
            horizontal
            contentContainerStyle={styles.menuContainer}
            showsHorizontalScrollIndicator={false}
          />
        </Card.Content>
      </Card>

      {/* 🔹 Connexion au Wallet */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <ConnectWallet />
        </Card.Content>
      </Card>

    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 10,
  },
  balanceCard: {
    backgroundColor: "#3674B5",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  balanceContent: {
    alignItems: "center",
  },
  balanceText: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  menuButton: {
    backgroundColor: "#0056b3",
    marginHorizontal: 5,
    borderRadius: 10,
  },
  menuLabel: {
    fontSize: 12,
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default Home;
