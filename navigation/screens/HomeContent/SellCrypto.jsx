import React from "react";
import { Text, View, StyleSheet } from "react-native";
import InputCustom from "./InputCustom";

function SellCrypto() {
  return (
    <>
      <View style={styles.container}>
        <InputCustom label="Depuis" />
        <InputCustom label="Vers" />
      </View>
    </>
)
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row', // Alignement côte à côte
      justifyContent: 'space-between',
      padding: 10,
    },
});
export default SellCrypto
