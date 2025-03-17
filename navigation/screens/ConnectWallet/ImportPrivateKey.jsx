import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {SaveToSecureStore} from "@/services/SecureStore";

const ImportPrivateKey = () => {
  const [privateKey, setPrivateKey] = useState("");
  const navigation = useNavigation(); // Récupération de navigation

  const storePrivateKey = async () => {
    if (!privateKey.trim()) {
      Alert.alert("Erreur", "Veuillez entrer une clé privée.");
      return;
    }

    try {
      const key = await SaveToSecureStore("walletInfo",privateKey);
      navigation.navigate("Home");
      console.log("Clé privée",key);
    } catch (e) {
      Alert.alert("Erreur", "Impossible d'enregistrer la clé privée.");
      console.error("Erreur de stockage de la clé privée :", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Importer une clé privée</Text>
      <TextInput 
        placeholder="Clé privée" 
        style={styles.area} 
        secureTextEntry 
        value={privateKey} 
        onChangeText={setPrivateKey} 
      />
      <TouchableOpacity style={styles.button} onPress={storePrivateKey}>
        <Text style={styles.buttonText}>Importer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  area: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ImportPrivateKey;
