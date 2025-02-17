import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

function Recevoir() {
  const walletAddress = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"; // Adresse fictive Bitcoin

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adresse de dépôt</Text>
      <QRCode value={walletAddress} size={200} />
      <Text style={styles.address}>{walletAddress}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  address: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Recevoir;
