import React from "react";
import { Text, View, StyleSheet } from "react-native";
import InputCustom from "./InputCustom";

function BuyCrypto() {
  return (
    <>
      <View style={styles.container}>
        <InputCustom label="From" />
        <InputCustom label="To" />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row', // Alignement côte à côte
      justifyContent: 'space-between',
      padding: 10,
    },
});
export default BuyCrypto;
