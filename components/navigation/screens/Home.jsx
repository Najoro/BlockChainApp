import React, { useState } from "react";
import {
  Text,
  View,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
} from "react-native";

import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TabsView from "../../functions/TabsView";
import MyWallet from "./HomeContent/MyWallet";
import EmptyWallet from "./HomeContent/EmptyWallet";
import SellCrypto from "./HomeContent/SellCrypto";
import BuyCrypto from "./HomeContent/BuyCrypto";

const MenuIcon = ({ iconLibrary: IconLibrary, iconName, label }) => {
  return (
    <View style={styles.flexCenter}>
      <View style={styles.icone}>
        <IconLibrary name={iconName} size={30} color="white" />
      </View>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};
function Home() {
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={[styles.content, styles.soldContent]}>
          <View style={styles.header}>
            <Text style={styles.sol}>$27,852</Text>
          </View>
          <View style={styles.menu}>
            <MenuIcon
              iconLibrary={Feather}
              iconName="arrow-down-left"
              label="Receive"
            />
            <MenuIcon
              iconLibrary={Feather}
              iconName="arrow-up-right"
              label="Send"
            />
            <MenuIcon
              iconLibrary={Feather}
              iconName="refresh-cw"
              label="Exchange"
            />
            <MenuIcon
              iconLibrary={FontAwesome}
              iconName="money"
              label="Cash out"
            />
          </View>
        </View>

        <View style={[styles.content, styles.walletContent]}>
          <TabsView
            routes={[
              { key: "first", title: "My Wallet" },
              { key: "second", title: "Empty wallets" },
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
              { key: "first", title: "But Crypto" },
              { key: "second", title: "Sell Crypto" },
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
  container: {
    // flex: 1,
    backgroundColor: "#ffff0",
  },
  content: {
    minHeight: 300,
  },
  soldContent: {
    backgroundColor: "#3674B5",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  walletContent: {
    flex: 1 / 2,
    backgroundColor: "#fff",
    marginTop: 20,
  },

  text: {
    color: "white",
    fontSize: 20,
    marginTop: 5,
  },
  header: {
    // backgroundColor :"red",
    justifyContent: "center",
    alignItems: "center",
  },
  sol: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
  },
  flexCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  icone: {
    backgroundColor: "#578FCA",
    width: 70,
    height: 70,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    flex: 1 / 2,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default Home;
