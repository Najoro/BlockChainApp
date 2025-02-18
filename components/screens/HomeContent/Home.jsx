import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TabsView from "../../functions/TabsView";
import MyWallet from "./MyWallet";
import EmptyWallet from "./EmptyWallet";
import SellCrypto from "./SellCrypto";
import BuyCrypto from "./BuyCrypto";

const MenuIcon = ({ iconLibrary: IconLibrary, iconName, label, screen }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(screen)}>
      <View style={styles.flexCenter}>
        <View style={styles.icone}>
          <IconLibrary name={iconName} size={30} color="white" />
        </View>
        <Text style={styles.text}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

function Home() {
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={[styles.haead, styles.soldContent]}>
          <View style={styles.header}>
            <Text style={styles.sol}>$27,852</Text>
          </View>
          <View style={styles.menu}>
            <MenuIcon iconLibrary={Feather} iconName="arrow-down-left" label="Recevoir" screen="Recevoir" />
            <MenuIcon iconLibrary={Feather} iconName="arrow-up-right" label="Envoyer" screen="Envoyer" />
            <MenuIcon iconLibrary={Feather} iconName="refresh-cw" label="Échanger" screen="Échanger" />
            <MenuIcon iconLibrary={FontAwesome} iconName="money" label="Encaisser" screen="Encaisser" />
          </View>

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
    </>
  );
}

const styles = StyleSheet.create({
  haead: {
    height: "35%",
  },
  container: {
    minHeight: "auto",
  },
  content: {
    minHeight: 300,
  },
  soldContent: {
    backgroundColor: "#0000FF",
    justifyContent: "space-around",
    marginBottom: 5,
  },
  walletContent: {
    backgroundColor: "#fff",
    marginTop: 5,
  },
  text: {
    color: "white",
    fontSize: 15,
    marginTop: 5,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  sol: {
    fontSize: 40,
    color: "#fff",
  },
  flexCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  icone: {
    backgroundColor: "#578FCA",
    width: 65,
    height: 65,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    height: "auto",
    marginTop: -25,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default Home;
